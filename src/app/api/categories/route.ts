import { NextResponse } from "next/server";

export async function GET() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shop/category`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("GET CATEGORIES ERROR =>", error);

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
