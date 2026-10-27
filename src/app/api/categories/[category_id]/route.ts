import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    category_id: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { category_id } = await params;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shop/category/${category_id}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("GET CATEGORY ERROR =>", error);

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
