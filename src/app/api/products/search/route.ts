import { NextRequest, NextResponse } from "next/server";

async function searchProducts(body: unknown) {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
    cache: "no-store",
  });

  const data = await res.json();

  return NextResponse.json(data, {
    status: res.status,
  });
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();

    return await searchProducts(body);
  } catch (error) {
    console.error("POST PRODUCT SEARCH ERROR =>", error);

    return NextResponse.json(
      { detail: "Search request failed" },
      { status: 500 },
    );
  }
}

// Temporary GET for testing directly in the browser
export async function GET(req: NextRequest) {
  try {
    const query = req.nextUrl.searchParams.get("q") ?? "";

    return await searchProducts({ query });
  } catch (error) {
    console.error("GET PRODUCT SEARCH ERROR =>", error);

    return NextResponse.json(
      { detail: "Search request failed" },
      { status: 500 },
    );
  }
}
