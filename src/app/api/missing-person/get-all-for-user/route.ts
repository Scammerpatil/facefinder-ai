import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import MissingPerson from "@/models/MissingPerson";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const decoded: any = jwt.verify(token, process.env.JWT_SECRET as string);
    const missingpersons = await MissingPerson.find({
      reportedBy: decoded.id,
    });
    return NextResponse.json(missingpersons, { status: 200 });
  } catch (error) {
    console.error("Error fetching missing people:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
