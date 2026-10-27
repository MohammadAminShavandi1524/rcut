import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    product_id: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { product_id } = await params;

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/shop/product/${product_id}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("GET PRODUCT ERROR =>", error);

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
