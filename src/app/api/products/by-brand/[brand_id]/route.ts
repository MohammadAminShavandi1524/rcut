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

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        { detail: "API URL is not configured" },
        { status: 500 },
      );
    }

    const res = await fetch(
      `${apiUrl.replace(/\/$/, "")}/shop/product/get_by_brand/${brandId}`,
      { cache: "no-store" },
    );

    const text = await res.text();

    let data: unknown;

    try {
      data = JSON.parse(text);
    } catch {
      data = {
        detail: text || "Invalid server response",
      };
    }

    if (!res.ok) {
      return NextResponse.json(data, {
        status: res.status,
      });
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error("GET PRODUCTS BY BRAND ERROR =>", error);

    return NextResponse.json(
      { detail: "Internal Server Error" },
      { status: 500 },
    );
  }
}
