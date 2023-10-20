import { NextResponse, NextRequest } from "next/server";

interface CoursePrerequisites {
  prerequisites: string[];
  // Add other properties if needed
}

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  // Fetching data from prerequisites.json
  const prerequisitesData: Record<string, CoursePrerequisites> = await (
    await fetch(
      "https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json"
    )
  ).json();

  const courseCode = params.get("courseCode");

  if (!courseCode) {
    // If courseCode is not provided, return an error or handle it appropriately.
    return NextResponse.json({ error: "Course code not provided" });
  }

  // Find the data for the given course code
  const courseData = prerequisitesData[courseCode];

  if (!courseData) {
    // If no data is found for the given course code, return an error or handle it appropriately.
    return NextResponse.json({
      error: "No data found for the provided course code",
    });
  }

  // Return the found data
  return NextResponse.json(courseData);
}
