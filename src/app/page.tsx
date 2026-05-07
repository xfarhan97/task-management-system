import Link from "next/link";
import "@/app/globals.css";

const features = [
  {
    icon: "⚡",
    title: "Lightning Fast",
    desc: "Create, update, and delete tasks instantly with a snappy real-time interface.",
  },
  {
    icon: "🗂️",
    title: "Smart Filtering",
    desc: "Filter tasks by status — view all, pending, or completed with a single click.",
  },
  {
    icon: "🔐",
    title: "Secure by Default",
    desc: "JWT-based authentication keeps your workspace private and protected.",
  },
  {
    icon: "📊",
    title: "Live Stats",
    desc: "Track your progress at a glance with live task counts on your dashboard.",
  },
];

export default function HomePage() {
  return (
    <div className="land-page">
      {/* ── Navbar ── */}
      <nav className="land-nav">
        <div className="land-nav-brand">
          Task Management System
        </div>
        <div className="land-nav-links">
          <Link href="/login" className="land-nav-link ghost">
            Sign In
          </Link>
          <Link href="/register" className="land-nav-link solid">
            Get Started
          </Link>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="land-hero">
        <div className="land-hero-content">
          <div className="land-hero-eyebrow">
            🚀 Task Management Reimagined
          </div>
          <h1 className="land-hero-title">
            Organize your work,{" "}
            <span className="gradient-text">amplify your focus</span>
          </h1>
          <p className="land-hero-sub">
            Task Management System helps you capture every task, track progress in real time,
            and get more done — all in a clean, distraction-free workspace.
          </p>
          <div className="land-hero-cta">
            <Link href="/register" className="cta-btn primary">
              Start for free →
            </Link>
            <Link href="/login" className="cta-btn secondary">
              Sign in
            </Link>
          </div>
        </div>

        {/* Animated orbit visual */}
        <div className="land-hero-visual">
          <div className="orbit-wrapper">

            {/* Core center icon */}
            <div className="orbit-core">✅</div>

            {/* Ring 1 — innermost — ⏳ */}
            <div className="orbit-ring-1">
              <div className="orbit-icon icon-1">⏳</div>
            </div>

            {/* Ring 2 — middle — 📋 */}
            <div className="orbit-ring-2">
              <div className="orbit-icon icon-2">📋</div>
            </div>

            {/* Ring 3 — outermost — 🎯 */}
            <div className="orbit-ring-3">
              <div className="orbit-icon icon-3">🎯</div>
            </div>

          </div>
        </div>
      </section>

      {/* ── Features ── */}
      <section className="land-features">
        <p className="land-section-label">Why Task Management System</p>
        <h2 className="land-section-title">
          Everything you need to stay productive
        </h2>
        <div className="features-grid">
          {features.map((f) => (
            <div className="feature-card" key={f.title}>
              <div className="feature-icon">{f.icon}</div>
              <h3>{f.title}</h3>
              <p>{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="land-cta-banner">
        <div className="land-cta-inner">
          <h2>Ready to take control of your tasks?</h2>
          <p>Join Task Management System today — it&apos;s free to get started.</p>
          <Link href="/register" className="cta-btn primary">
            Create your account →
          </Link>
        </div>
      </section>

      {/* ── Footer ── */}
      <footer className="land-footer">
        <div className="land-footer-brand">
          Task Management System
        </div>
        <p>© {new Date().getFullYear()} Task Management System. All rights reserved.</p>
      </footer>
    </div>
  );
}
