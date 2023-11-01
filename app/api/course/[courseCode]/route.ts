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
    ).filter((course) => course[0] === params.get("courseCode"))
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



}
