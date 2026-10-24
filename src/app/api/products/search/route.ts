import { NextRequest, NextResponse } from "next/server";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

async function searchProducts(body: unknown) {
  if (!API_URL) {
    return NextResponse.json(
      { detail: "API URL is not configured" },
      { status: 500 },
    );
  }

  const res = await fetch(`${API_URL.replace(/\/$/, "")}/shop/search`, {
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
