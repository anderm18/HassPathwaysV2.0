import { NextResponse } from "next/server";
import faq from "./faq.json";
import { IFAQ } from "@/public/data/dataInterface";

export async function GET() {
  return NextResponse.json(faq);
}
