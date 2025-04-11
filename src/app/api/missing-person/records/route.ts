import Record from "@/models/Record";
import { NextResponse } from "next/server";

export async function GET() {
  const records = await Record.find().populate("missingPerson");
  return NextResponse.json(records);
}
