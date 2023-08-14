import { IPathwayDescriptionSchema } from "@/public/data/dataInterface";
import { NextRequest, NextResponse } from "next/server";

type PathwayRequest = {
  params: {
    pathwayName: string;
  };
};

export async function GET(request: NextRequest, data: PathwayRequest) {
  const { pathwayName } = data.params;
  console.log(pathwayName);
  // TODO: use pathwayName to find pathway description

  const res: IPathwayDescriptionSchema = {
    compatibleMinor: [],
    courses: [],
    description: "",
  };

  return NextResponse.json(res);
}
