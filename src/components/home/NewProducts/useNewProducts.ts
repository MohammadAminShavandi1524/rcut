"use client";

import { useEffect, useState } from "react";

import { getNewProducts } from "./new-products.api";

import type { FeaturedProduct } from "../FeaturedProducts/featured-products.api";

export function useNewProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const data = await getNewProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("GET NEW PRODUCTS ERROR:", error);
        setProducts([]);
      }
    };

    void fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return products;
}
