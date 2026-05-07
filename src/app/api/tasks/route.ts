import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

// ✅ GET all tasks
export async function GET() {
  try {
    await connectDB();

    const tasks = await Task.find();

    return NextResponse.json(tasks);
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// ✅ CREATE task
export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    console.log("BODY RECEIVED:", body);

    if (!body.title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const newTask = await Task.create({
      title: body.title,
      description: body.description,
      status: body.status || "pending",
    });

    return NextResponse.json(newTask, { status: 201 });
  } catch (error: any) {
    console.log("ERROR:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE all tasks
export async function DELETE() {
  try {
    await connectDB();

    await Task.deleteMany({});

    return NextResponse.json({ message: "All tasks deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}