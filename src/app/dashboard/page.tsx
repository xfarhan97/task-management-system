"use client";

import { useEffect, useState } from "react";
import "@/app/globals.css";

interface Task {
  _id: string;
  title: string;
  description: string;
  status: "pending" | "completed";
}

export default function DashboardPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState("all");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [adding, setAdding] = useState(false);

  const fetchTasks = async () => {
    try {
      const res = await fetch("/api/tasks");
      const data = await res.json();
      setTasks(data);
    } catch {
      console.error("Error fetching tasks");
    }
  };

  useEffect(() => { fetchTasks(); }, []);

  const filteredTasks =
    filter === "all" ? tasks : tasks.filter((t) => t.status === filter);

  const stats = {
    all: tasks.length,
    pending: tasks.filter((t) => t.status === "pending").length,
    completed: tasks.filter((t) => t.status === "completed").length,
  };

  const createTask = async (e: React.FormEvent) => {
    e.preventDefault();
    setAdding(true);
    try {
      await fetch("/api/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, description, status: "pending" }),
      });
      setTitle("");
      setDescription("");
      await fetchTasks();
    } catch {
      console.error("Error creating task");
    } finally {
      setAdding(false);
    }
  };

  const completeTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status: "completed" }),
      });
      await fetchTasks();
    } catch {
      console.error("Error updating task");
    }
  };

  const deleteTask = async (id: string) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: "DELETE" });
      await fetchTasks();
    } catch {
      console.error("Error deleting task");
    }
  };

  const handleLogout = async () => {
    await fetch("/api/auth/logout", { method: "POST" });
    window.location.href = "/login";
  };

  return (
    <div className="dash-page">
      {/* ── Navbar ── */}
      <nav className="dash-nav">
        <div className="dash-nav-brand">
          <span>✅</span> Task Management System
        </div>
        <div className="dash-nav-right">
          <div className="dash-avatar">U</div>
          <button className="dash-logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <main className="dash-main">
        {/* ── Header ── */}
        <div className="dash-header">
          <h1>My Workspace</h1>
          <p>Manage and track all your tasks in one place</p>
        </div>

        {/* ── Stats ── */}
        <div className="dash-stats">
          <div className="stat-card">
            <div className="stat-icon all">📋</div>
            <div className="stat-info">
              <p>Total Tasks</p>
              <h3>{stats.all}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon pending">⏳</div>
            <div className="stat-info">
              <p>Pending</p>
              <h3>{stats.pending}</h3>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon done">✅</div>
            <div className="stat-info">
              <p>Completed</p>
              <h3>{stats.completed}</h3>
            </div>
          </div>
        </div>

        {/* ── Body ── */}
        <div className="dash-body">
          {/* Add Task Panel */}
          <aside className="dash-panel">
            <h2>➕ New Task</h2>
            <form className="dash-form" onSubmit={createTask}>
              <input
                className="dash-input"
                type="text"
                placeholder="Task title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
              <textarea
                className="dash-textarea"
                placeholder="Task description (optional)"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
              <button className="dash-add-btn" type="submit" disabled={adding}>
                {adding ? (
                  <>
                    <span className="btn-spinner" />
                    Adding...
                  </>
                ) : (
                  "Add Task"
                )}
              </button>
            </form>
          </aside>

          {/* Tasks Section */}
          <section className="dash-tasks-section">
            {/* Filter tabs */}
            <div className="dash-filters">
              {(["all", "pending", "completed"] as const).map((f) => (
                <button
                  key={f}
                  className={`filter-btn ${filter === f ? "active" : ""}`}
                  onClick={() => setFilter(f)}
                >
                  {f === "all" && "All"}
                  {f === "pending" && "⏳ Pending"}
                  {f === "completed" && "✅ Completed"}
                  <span style={{ marginLeft: 6, opacity: 0.7 }}>
                    {f === "all" && stats.all}
                    {f === "pending" && stats.pending}
                    {f === "completed" && stats.completed}
                  </span>
                </button>
              ))}
            </div>

            {/* Task grid */}
            <div className="task-grid">
              {filteredTasks.length === 0 ? (
                <div className="dash-empty">
                  <span>🗂️</span>
                  <p>No tasks here yet. Add one to get started!</p>
                </div>
              ) : (
                filteredTasks.map((task, i) => (
                  <div
                    key={task._id}
                    className={`task-card ${task.status === "completed" ? "completed" : ""}`}
                    style={{ animationDelay: `${i * 0.05}s` }}
                  >
                    <div className="task-card-top">
                      <p className="task-title">{task.title}</p>
                      <span className={`task-badge ${task.status}`}>
                        {task.status}
                      </span>
                    </div>

                    {task.description && (
                      <p className="task-desc">{task.description}</p>
                    )}

                    <div className="task-card-footer">
                      <button
                        className="task-btn complete"
                        onClick={() => completeTask(task._id)}
                        disabled={task.status === "completed"}
                      >
                        ✓ Complete
                      </button>
                      <button
                        className="task-btn delete"
                        onClick={() => deleteTask(task._id)}
                      >
                        🗑 Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
