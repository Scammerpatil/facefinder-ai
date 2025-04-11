import { NextRequest, NextResponse } from "next/server";
import jwt from "jsonwebtoken";
import Notification from "@/models/Notification";

export async function GET(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  if (!token) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }
  try {
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET as string);
    const userId = (decodedToken as { id: string }).id;
    const notification = await Notification.find({ userId }).sort({
      createdAt: -1,
    });
    return NextResponse.json(notification, { status: 200 });
  } catch (error) {
    console.error("Error fetching notifications:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
