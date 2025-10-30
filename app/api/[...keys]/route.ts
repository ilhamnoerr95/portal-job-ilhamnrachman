import { NextRequest, NextResponse } from "next/server";
import supabaseServer from "@/lib/supabaseServer";

export async function GET(req: NextRequest, { params }: { params: Promise<{ keys?: string[] }> }) {
  try {
    const { keys } = (await params) ?? [];
    const table = keys?.[0];

    const { data, error } = await supabaseServer.from(table as string).select("*");

    if (error) {
      return NextResponse.json(
        {
          error: error?.message,
          status: error,
        },
        { status: 500 }
      );
    }
    const response = NextResponse.json(data, { status: 200 });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}

export async function POST(req: NextRequest, { params }: { params: Promise<{ keys?: string[] }> }) {
  try {
    const body = await req.json();
    const { keys } = (await params) ?? [];

    const { data, error } = await supabaseServer.from(keys?.[0] as string).insert({ ...body });

    if (error) {
      return NextResponse.json(
        {
          error: error?.message,
          status: error,
        },
        { status: 500 }
      );
    }
    const response = NextResponse.json(data, { status: 201 });

    return response;
  } catch (error) {
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
  }
}
