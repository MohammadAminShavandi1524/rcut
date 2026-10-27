import { NextResponse } from "next/server";

export async function GET() {
  try {
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

    const res = await fetch(`${apiUrl.replace(/\/$/, "")}/shop/product`, {
      cache: "no-store",
    });

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
    console.error("GET PRODUCTS ERROR =>", error);

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
