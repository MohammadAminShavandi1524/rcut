"use client";

import { useEffect, useState } from "react";

import FooterColumn from "./FooterColumn";
import FooterBottom from "./FooterBottom";

interface Category {
  id: number;
  name: string;
  index: number;
  parent: {
    id: number;
    name: string;
  } | null;
}

interface Product {
  id: number;
  name: string;
  top_seller: boolean;
}

interface FooterItem {
  title: string;
  href: string;
}

const MAX_ITEMS = 6;

const Footer = () => {
  const [categories, setCategories] = useState<FooterItem[]>([]);
  const [featuredProducts, setFeaturedProducts] = useState<FooterItem[]>([]);

  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("دریافت دسته بندی‌ها ناموفق بود.");
        }

        const data: Category[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار دسته بندی‌ها نامعتبر است.");
        }

        const items = data
          .filter((category) => category.parent === null)
          .sort((a, b) => a.index - b.index)
          .slice(0, MAX_ITEMS)
          .map((category) => ({
            title: category.name,
            href:
              category.name === "برند یاماسا"
                ? "/yamasa"
                : `/products?scope=${category.id}&categories=${category.id}`,
          }));

        if (!controller.signal.aborted) {
          setCategories(items);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("GET FOOTER CATEGORIES ERROR:", error);
      }
    };

    const fetchFeaturedProducts = async () => {
      try {
        const response = await fetch("/api/products", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("دریافت محصولات منتخب ناموفق بود.");
        }

        const data: Product[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار محصولات نامعتبر است.");
        }

        const items = data
          .filter((product) => product.top_seller === true)
          .slice(0, MAX_ITEMS)
          .map((product) => ({
            title: product.name,
            href: `/products/${product.id}`,
          }));

        if (!controller.signal.aborted) {
          setFeaturedProducts(items);
        }
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("GET FOOTER PRODUCTS ERROR:", error);
      }
    };

    void fetchCategories();
    void fetchFeaturedProducts();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <footer className="bg-footer-bg text-footer-foreground" dir="rtl">
      <div className="w90 3xl:py-20 py-10 sm:py-12 lg:py-12 xl:py-14 2xl:py-16">
        <div className="3xl:gap-12 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-9">
          <FooterColumn
            title="دسترسی سریع"
            items={[
              {
                title: "خانه",
                href: "/",
              },
              {
                title: "محصولات",
                href: "/products",
              },
              {
                title: "نمایندگی یاماسا",
                href: "/yamasa",
              },
              {
                title: "درباره ما",
                href: "/about-us",
              },
              {
                title: "تماس با ما",
                href: "/contact-us",
              },
              {
                title: "سوالات متداول",
                href: "/faq",
              },
            ]}
          />

          <FooterColumn title="دسته‌بندی‌ها" items={categories} />

          <FooterColumn title="محصولات منتخب" items={featuredProducts} />

          <div className="mt-5 text-right sm:mt-0">
            <h3 className="text-footer-foreground 3xl:text-lg text-base font-bold lg:text-[15px] xl:text-base 2xl:text-[17px]">
              تماس با ما
            </h3>

            <div className="text-footer-muted 3xl:mt-6 mt-4 space-y-3 text-[13px] leading-7 sm:mt-5 sm:text-sm lg:mt-4 lg:text-xs xl:mt-5 xl:text-[13px] 2xl:text-sm">
              <a
                href="tel:02166733833"
                dir="ltr"
                className="hover:text-custom-primary block w-fit transition-colors duration-300"
              >
                021-66733833
              </a>

              <a
                href="tel:09192081368"
                dir="ltr"
                className="hover:text-custom-primary block w-fit transition-colors duration-300"
              >
                09192081368
              </a>

              <p>
                تهران، خیابان امام خمینی،
                <br />
                روبه‌روی بیمارستان سینا،
                <br />
                پاساژ نظام،
                <br />
                طبقه ۲، واحد ۳۰۷
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
