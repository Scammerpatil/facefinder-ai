import dbConfig from "@/middlewares/db.config";
import MissingPerson from "@/models/MissingPerson";
import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";

dbConfig();

export async function POST(req: NextRequest) {
  const { person } = await req.json();
  const token = req.cookies.get("token")?.value;
  const data = jwt.verify(token, process.env.JWT_SECRET!);
  try {
    const newPerson = new MissingPerson({
      reportedBy: data.id,
      ...person,
    });
    await newPerson.save();
    return NextResponse.json(
      { message: "Missing Person Registered" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error registering missing person:", error);
    return NextResponse.json(
      { message: "Something went wrong!!!" },
      { status: 500 }
    );
  }
}
