import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Record from "@/models/Record";
import MissingPerson from "@/models/MissingPerson";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    if (!decoded) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    const missingPersons = await MissingPerson.find({ reportedBy: decoded.id });
    const records = [];
    for (const missingPerson of missingPersons) {
      const record = await Record.findOne({
        missingPerson: missingPerson._id,
      }).populate("missingPerson");
      if (record) {
        records.push(record);
      }
    }
    return NextResponse.json(records, { status: 200 });
  } catch (error) {
    console.error("Error fetching records:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
