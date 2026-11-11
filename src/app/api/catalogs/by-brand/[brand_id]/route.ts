import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    brand_id: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { brand_id } = await params;
    const brandId = Number(brand_id);

    if (!Number.isSafeInteger(brandId) || brandId <= 0) {
      return NextResponse.json({ detail: "Invalid brand ID" }, { status: 400 });
    }

    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/catalog/get_by_brand/${brandId}`,
      {
        cache: "no-store",
      },
    );

    const data = await res.json();

    return NextResponse.json(data, {
      status: res.status,
    });
  } catch (error) {
    console.error("GET CATALOGS BY BRAND ERROR =>", error);

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
