import { NextResponse, NextRequest } from "next/server";

// Define interfaces for your data structures
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

// Utility function to fetch and cast data from a given URL
async function fetchDataFromURL<T>(url: string): Promise<T> {
  const response = await fetch(url);
  const data = (await response.json()) as T;
  return data;
}

// Function to construct the combined course data
function constructCombinedCourseData(courseDescriptions: CourseDatabase, courseAttributes: CourseDatabase, courseSemesterOffered: CourseDatabase, courseCode: string) {
  const courseDescription = courseDescriptions[courseCode];
  const courseAttribute = courseAttributes[courseCode];
  const courseSemester = courseSemesterOffered[courseCode];

  if (!courseDescription || !courseAttribute) {
    return { error: "Course data not found" };
  }

  return {
    ...courseDescription,
    ...courseAttribute,
    courseSemester,
  };
}

// Main GET function
export async function GET(request: NextRequest) {
  const pathParts = request.nextUrl.pathname.split("/");
  const selectedCourseCode = pathParts[pathParts.length - 1].toUpperCase();

  // Fetch data from external sources
  const courseDescriptions = await fetchDataFromURL<CourseDatabase>("https://raw.githubusercontent.com/quatalog/data/master/catalog.json");
  const courseAttributes = await fetchDataFromURL<CourseDatabase>("https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json");
  const courseSemesterOffered = await fetchDataFromURL<CourseDatabase>("https://raw.githubusercontent.com/quatalog/quatalog/main/src/terms_offered.json");

  // Construct the combined course data
  const combinedCourseData = constructCombinedCourseData(courseDescriptions, courseAttributes, courseSemesterOffered, selectedCourseCode);

  // Return the response
  return new Response(JSON.stringify(combinedCourseData), {
    headers: {
      "Content-Type": "application/json",
    },
  });
}
