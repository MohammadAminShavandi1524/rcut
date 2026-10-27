"use client";

import { useEffect, useState } from "react";

import {
  getFeaturedProducts,
  type FeaturedProduct,
} from "./featured-products.api";

export function useFeaturedProducts() {
  const [products, setProducts] = useState<FeaturedProduct[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const controller = new AbortController();

    const fetchProducts = async () => {
      try {
        const data = await getFeaturedProducts(controller.signal);

        if (!controller.signal.aborted) {
          setProducts(data);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("GET FEATURED PRODUCTS ERROR:", error);
        setProducts([]);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void fetchProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return { products, loading };
}
