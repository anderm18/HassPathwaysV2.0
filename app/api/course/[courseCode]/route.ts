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
  const pathParts = request.nextUrl.pathname.split("/");
  const selectedCourseCode = pathParts[pathParts.length - 1].toUpperCase();

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
    courseCode: selectedCourseCode,
    courseDescription: hassCourseDescription[selectedCourseCode],
    courseAttribute: hassCourseAttribute[selectedCourseCode],
  };

  return NextResponse.json(temp_response);

  // const foundCourseDescription = hassCourseDescription.find((course) => {});
}
