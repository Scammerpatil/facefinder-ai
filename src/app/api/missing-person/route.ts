import MissingPerson from "@/models/MissingPerson";
import { NextResponse } from "next/server";

export async function GET() {
  const missingPerson = await MissingPerson.find().populate(
    "reportedBy",
    "name email phone"
  );
  return NextResponse.json({
    message: "Missing person data",
    missingPerson,
  });
}
