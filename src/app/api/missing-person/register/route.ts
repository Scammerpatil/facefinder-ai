import { NextRequest, NextResponse } from "next/server";
import { exec } from "child_process";
import { promisify } from "util";
import fs from "fs";

const execAsync = promisify(exec);

export async function POST(req: NextRequest) {
  const formData = await req.formData();
  const name = formData.get("name") as string;
  const files = formData
    .getAll("files")
    .filter((entry): entry is File => entry instanceof File);
  if (!files || !name) {
    return NextResponse.json(
      { error: "Name and files are required" },
      { status: 400 }
    );
  }
  if (files.length !== 10) {
    return NextResponse.json(
      { error: "You must upload exactly 10 images" },
      { status: 400 }
    );
  }
  try {
    const fileArray = Array.from(files);
    fileArray.forEach(async (file, index) => {
      if (file.size > 5 * 1024 * 1024) {
        return NextResponse.json(
          { error: "File size exceeds 5MB" },
          { status: 400 }
        );
      }
      const fileBuffer = Buffer.from(await file.arrayBuffer());
      const fileName = `${name}_${index + 1}.jpg`;
      const folderName = "python/missingPersonImages";
      if (!fs.existsSync(folderName)) {
        fs.mkdirSync(folderName, { recursive: true });
      }
      const filePath = `${folderName}/${fileName}`;
      fs.writeFile(filePath, fileBuffer, (err) => {
        if (err) {
          console.error("Error writing file:", err);
          return NextResponse.json(
            { error: "Error writing file" },
            { status: 500 }
          );
        }
      });
    });
    const pythonScriptPath = "python/missingPerson.py";
    const { stdout } = await execAsync(
      `py -3.12 ${pythonScriptPath} "${name}"`
    );
    console.log("Building the encoding model...");
    await execAsync(`py -3.12 python/encoding.py`);
    console.log("Encoding model built successfully");
    return NextResponse.json(
      { message: "Missing Person Registered" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error uploading files:", error);
    return NextResponse.json(
      { error: "Error uploading files" },
      { status: 500 }
    );
  }
}
