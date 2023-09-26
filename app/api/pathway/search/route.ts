import { NextResponse, NextRequest } from "next/server";
import { IPathwaySchema } from "@/public/data/dataInterface";
import * as fs from "fs";
import cors from "cors";
import path from "path";
import { useAppContext } from "@/app/contexts/appContext/AppProvider";

export async function GET(request: NextRequest) {
  const params = request.nextUrl.searchParams;

  const { catalog_year } = useAppContext();
  const pathways = JSON.parse(
    fs.readFileSync(
      path.join(process.cwd(), "json") + `/${catalog_year}` + "/pathways.json",
      "utf8"
    )
  );

  let blob = pathways;

  const departmentString = params.get("department");
  if (departmentString) {
    const departments = departmentString.split(",");
    blob = blob.filter((c) => departments.includes(c["department"]));
  }
  let flatten = blob.flatMap((dep) => {
    return dep.pathways.map((path) => {
      return {
        name: path.name,
        clusters: path.clusters,
        department: dep.department,
        required: path.required,
      };
    });
  });
  //   blob = blob.map((c) => c["pathways"]).flat();

  for (var [k, c] of Object.entries(flatten)) {
    c["courses"] = c["clusters"]
      .map((b) => b["courses"])
      .flat()
      .concat(c["required"] != null ? c["required"] : []);
  }
  flatten = Object.fromEntries(
    Object.entries(flatten).filter(([k, v]) => k != "clusters")
  );

  const searchString = params.get("searchString");
  if (searchString) {
    flatten = flatten.filter((c) =>
      c["name"].toLowerCase().includes(searchString.toLowerCase())
    );
  }

  // Convert Blob to array
  const output: Array<IPathwaySchema> = Object.entries(flatten).map((v) => {
    const data = v[1];
    return {
      title: data.name,
      courses: data.courses,
      department: data.department,
    };
  });

  return NextResponse.json(output);
}
