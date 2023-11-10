// Course Prereq and Semester Listed json file:
// https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json

import { NextResponse, NextRequest } from "next/server";

const hass_prefixes = [
  "ARTS",
  "COGS",
  "COMM",
  "ECON",
  "GSAS",
  "INQR",
  "ITWS",
  "LANG",
  "LITR",
  "PHIL",
  "PSYC",
  "STSO",
  "WRIT",
];

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const hassCourseDescription = Object.fromEntries(
    Object.entries(
      await (
        await fetch(
          "https://raw.githubusercontent.com/quatalog/data/master/catalog.json"
        )
      ).json()
    ).filter((course) => hass_prefixes.includes(course[0].substring(0, 4)))
  );

  const hassCourseAttribute = Object.fromEntries(
    Object.entries(
      await (
        await fetch(
          "https://raw.githubusercontent.com/quatalog/data/master/prerequisites.json"
        )
      ).json()
    ).filter((course) => hass_prefixes.includes(course[0].substring(0, 4)))
  );

  // Here we return the response:
  // Combine the data into one response object
  const temp_response = {
    courseDescription: hassCourseDescription,
    courseAttribute: hassCourseAttribute,
  };

  interface Response {
    courseCode: string;
    courseName: string | null;
    courseDescription: string | null;
    coursePrerequisites: string | null;
    courseSemesterOffered: string | null;
  }

  const courseCode = params.get("searchString")?.toLowerCase();
  
  const foundCourseDescription = hassCourseDescription.find((course) => {});
}
