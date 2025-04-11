import MissingPerson from "@/models/MissingPerson";
import User from "@/models/User";
import { NextResponse } from "next/server";

export async function GET() {
  const user = await User.countDocuments();
  const activeCases = await MissingPerson.find({
    status: "missing",
  }).countDocuments();
  const missingpeopleCount = await MissingPerson.countDocuments();
  const solvedCases = await MissingPerson.find({
    status: "found",
  }).countDocuments();
  const differencePercentage = Math.round(
    ((activeCases - solvedCases) / activeCases) * 100
  );
  const data = {
    user,
    activeCases,
    missingpeopleCount,
    solvedCases,
    differencePercentage,
  };
  return NextResponse.json({
    status: 200,
    message: "Admin dashboard data",
    data,
  });
}
