import { NextResponse } from "next/server";

type RouteContext = {
  params: Promise<{
    category_id: string;
  }>;
};

export async function GET(_req: Request, { params }: RouteContext) {
  try {
    const { category_id } = await params;

    const categoryId = Number(category_id);

    if (!Number.isSafeInteger(categoryId) || categoryId <= 0) {
      return NextResponse.json(
        {
          detail: "Invalid category ID",
        },
        {
          status: 400,
        },
      );
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL;

    if (!apiUrl) {
      return NextResponse.json(
        {
          detail: "API URL is not configured",
        },
        {
          status: 500,
        },
      );
    }

    const res = await fetch(
      `${apiUrl.replace(/\/$/, "")}/shop/product/get_by_category/${categoryId}`,
      {
        cache: "no-store",
      },
    );

    const text = await res.text();

    let data;

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
    console.error("GET PRODUCTS BY CATEGORY ERROR =>", error);

    return NextResponse.json(
      {
        detail: "Internal Server Error",
      },
      {
        status: 500,
      },
    );
  }
}
