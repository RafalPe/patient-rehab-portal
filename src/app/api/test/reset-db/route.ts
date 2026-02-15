import { dbActions } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST() {
  if (process.env.NODE_ENV === "production") {
    return NextResponse.json(
      { error: "Not allowed in production" },
      { status: 403 },
    );
  }

  dbActions.resetDb();
  return NextResponse.json({
    success: true,
    message: "Database reset to initial state",
  });
}
