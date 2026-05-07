import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Task from "@/models/Task";

// ✅ UPDATE TASK (FIXED FOR NEXT 16)
export async function PUT(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX HERE
    const body = await req.json();

    const updatedTask = await Task.findByIdAndUpdate(
      id,
      body,
      { returnDocument: "after" } // ✅ updated (no warning)
    );

    if (!updatedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(updatedTask);
  } catch (error: any) {
    console.log("UPDATE ERROR:", error);

    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}

// ✅ DELETE TASK
export async function DELETE(
  req: Request,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await connectDB();

    const { id } = await context.params; // ✅ FIX HERE

    const deletedTask = await Task.findByIdAndDelete(id);

    if (!deletedTask) {
      return NextResponse.json(
        { message: "Task not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Task deleted" });
  } catch (error: any) {
    return NextResponse.json(
      { message: error.message },
      { status: 500 }
    );
  }
}