// Course Prereq and Semester Listed json file:
// https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json
// semester offered: https://raw.githubusercontent.com/quatalog/quatalog/main/src/terms_offered.json
import { NextResponse, NextRequest } from "next/server";

// Define your data structures
interface CourseData {
  subj: string;
  crse: string;
  name: string;
  description: string;
  source: string;
}

interface CourseDatabase {
  [key: string]: CourseData;
}

export async function GET(request: NextRequest) {
  // Extract the course code from the URL path
  const pathParts = request.nextUrl.pathname.split("/");
  const selectedCourseCode = pathParts[pathParts.length - 1].toUpperCase();

  // Fetch course descriptions and cast the response
  const courseDescriptionsResponse = await fetch(
    "https://raw.githubusercontent.com/quatalog/data/master/catalog.json"
  );
  const courseDescriptions: CourseDatabase =
    (await courseDescriptionsResponse.json()) as CourseDatabase;

  // Fetch course attributes and cast the response
  const courseAttributesResponse = await fetch(
    "https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json"
  );
  const courseAttributes: CourseDatabase =
    (await courseAttributesResponse.json()) as CourseDatabase;

  // Fetch course Semester offfered:
  const courseSemesterOfferedResponse = await fetch(
    "https://raw.githubusercontent.com/quatalog/quatalog/main/src/terms_offered.json"
  );
  const courseSemesterOffered: CourseDatabase =
    (await courseSemesterOfferedResponse.json()) as CourseDatabase;

  // Access the specific course description and attribute
  const courseDescription = courseDescriptions[selectedCourseCode];
  const courseAttribute = courseAttributes[selectedCourseCode];
  const courseSemester = courseSemesterOffered[selectedCourseCode];
  const combinedCourseData = {
    ...courseDescription,
    ...courseAttribute,
    courseSemester,
  };

  // Construct the response
  const response =
    courseDescription && courseAttribute
      ? combinedCourseData
      : { error: "Course data not found" };

  // Return the response
  return new Response(JSON.stringify(response), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
