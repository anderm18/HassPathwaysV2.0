import { NextResponse } from "next/server";
import faq from "./faq.json";

export async function GET(request) {
  return NextResponse.json(faq);
}
