import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";
import MissingPerson from "@/models/MissingPerson";
import Record from "@/models/Record";
import Notification from "@/models/Notification";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const file = formData.get("file") as File;
  if (!file) {
    return NextResponse.json({
      message: "No file found",
      status: 400,
    });
  }
  try {
    const arrayBuffer = await file.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);
    const fileName = new Date().getTime() + ".mp4";
    const filePath = "python/uploads/" + fileName;
    const storedFile = "public/records/" + fileName;
    if (!fs.existsSync("public/records")) {
      fs.mkdirSync("public/records", { recursive: true });
    }
    if (!fs.existsSync("python/uploads")) {
      fs.mkdirSync("python/uploads", { recursive: true });
    }
    fs.writeFileSync(filePath, buffer);
    fs.writeFileSync(storedFile, buffer);
    const { stdout } = await execAsync(`py -3.12 python/cctv.py "${filePath}"`);
    console.log(stdout);
    const missingPerson = await MissingPerson.findOne({
      name: stdout.trim(),
    });
    if (!missingPerson) {
      return NextResponse.json({
        message: "No missing person found",
        status: 404,
      });
    }
    missingPerson.status = "found";
    missingPerson.lastSeenLocation = "CCTV Footage";
    missingPerson.lastSeenDate = new Date().toISOString();
    await missingPerson.save();
    const record = new Record({
      missingPerson: missingPerson._id,
      video: fileName,
    });
    await record.save();
    const newNotification = new Notification({
      title: "Missing Person Found",
      description: `${missingPerson.name} has been found in CCTV footage`,
      userId: missingPerson.reportedBy,
    });
    await newNotification.save();
    return NextResponse.json({
      message: "CCTV footage processed successfully",
      status: 200,
    });
  } catch (error) {
    console.log(error);
    return NextResponse.json({
      message: "Error uploading file",
      status: 500,
    });
  }
}
