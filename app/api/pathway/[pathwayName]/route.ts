import { IPathwayDescriptionSchema } from "@/public/data/dataInterface";
import { NextRequest, NextResponse } from "next/server";
import * as fs from "fs";
import path from "path";

const pathways = JSON.parse(fs.readFileSync(path.join(process.cwd(), 'json') + '/pathways.json', 'utf8'));

type PathwayRequest = {
  params: {
    pathwayName: string;
  };
};

export async function GET(request: NextRequest, data: PathwayRequest) {
  const { pathwayName } = data.params;
  
  let blob = pathways.flatMap((dep) => dep["pathways"]).filter((pw) => pw.name == pathwayName);
  let res: IPathwayDescriptionSchema = blob.map((path) => {
    return {
      compatibleMinor: path.compatibleMinor,
      courses: path.clusters.length == 1 ? path.clusters[0].courses : path.clusters,
      description: path.description
    };
  });
  
  return NextResponse.json(res);
}
