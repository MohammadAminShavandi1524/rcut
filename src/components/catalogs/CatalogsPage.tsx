"use client";

import { useEffect, useLayoutEffect, useRef, useState } from "react";

import Image from "next/image";
import Link from "next/link";

import { ArrowLeft, BookOpen, ChevronLeft } from "lucide-react";

import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";

import {
  getCatalogs,
  getCatalogBrands,
  type CatalogBrand,
} from "./catalogs.api";

gsap.registerPlugin(ScrollTrigger);

const CatalogsPage = () => {
  const sectionRef = useRef<HTMLElement | null>(null);

  const [items, setItems] = useState<CatalogBrand[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const controller = new AbortController();

    const loadCatalogs = async () => {
      try {
        const catalogs = await getCatalogs(controller.signal);

        if (controller.signal.aborted) return;

        setItems(getCatalogBrands(catalogs));
        setError(false);
      } catch (err) {
        if (controller.signal.aborted) return;

        console.error("GET CATALOG BRANDS ERROR:", err);
        setError(true);
      } finally {
        if (!controller.signal.aborted) {
          setLoading(false);
        }
      }
    };

    void loadCatalogs();

    return () => controller.abort();
  }, []);

  useLayoutEffect(() => {
    if (loading || error || items.length === 0) return;

    const section = sectionRef.current;

    if (!section) return;

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return;
    }

    const ctx = gsap.context(() => {
      gsap.from(".catalogs-heading", {
        y: 20,
        opacity: 0,
        duration: 0.5,
        ease: "power2.out",
      });

      gsap.from(".catalog-brand-card", {
        y: 25,
        opacity: 0,
        duration: 0.5,
        stagger: 0.1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: ".catalogs-grid",
          start: "top 90%",
          once: true,
        },
      });
    }, section);

    return () => ctx.revert();
  }, [loading, error, items.length]);

  return (
    <main
      ref={sectionRef}
      dir="rtl"
      className="bg-background min-h-screen"
    >
      <section className="w90 3xl:px-10 mx-auto py-6 sm:py-8 lg:px-6 xl:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="مسیر صفحه"
          className="ms-2 flex flex-wrap items-center gap-2 text-sm"
        >
          <Link
            href="/"
            className="text-muted-foreground hover:text-custom-primary transition-colors duration-300"
          >
            آرکات
          </Link>

          <ChevronLeft
            size={15}
            aria-hidden="true"
            className="text-muted-foreground shrink-0"
          />

          <span
            aria-current="page"
            className="text-foreground font-medium"
          >
            کاتالوگ محصولات و برندها
          </span>
        </nav>

        {/* Heading */}
        <div className="catalogs-heading mt-5 max-w-3xl text-right sm:mt-7 lg:mt-9">
          <h1 className="text-foreground xss:text-[27px] text-[25px] leading-[1.6] font-bold sm:text-[32px] lg:text-[38px] xl:text-[42px]">
            کاتالوگ محصولات و برندها
          </h1>

          <p className="text-muted-foreground mt-3 text-justify text-[13px] leading-8 sm:mt-4 sm:text-sm sm:leading-9 lg:text-base lg:leading-9">
            در این بخش می‌توانید با برندهای دارای کاتالوگ در مجموعه آرکات آشنا
            شوید، محصولات تخصصی هر برند را مشاهده کنید و به کاتالوگ‌های فنی و
            اطلاعات محصولات آن‌ها دسترسی داشته باشید.
          </p>
        </div>

        {/* Brand Listing */}
        <div className="mt-7 sm:mt-9 lg:mt-11">
          {loading ? (
            <div
              className="grid min-w-0 grid-cols-1 gap-4 s:grid-cols-[repeat(2,minmax(0,330px))] lg:grid-cols-[repeat(3,minmax(0,330px))] 2xl:grid-cols-[repeat(4,minmax(0,330px))]"
              role="status"
              aria-label="در حال بارگذاری برندها"
            >
              {Array.from({ length: 4 }).map((_, index) => (
                <div
                  key={index}
                  className="border-border w-full animate-pulse overflow-hidden rounded-2xl border s:max-w-[330px]"
                >
                  <div className="bg-secondary-bg flex aspect-square items-center justify-center">
                    <div className="bg-border/50 size-24 rounded-xl" />
                  </div>

                  <div className="space-y-3 p-4 sm:p-5">
                    <div className="bg-border/50 h-5 w-2/3 rounded" />

                    <div className="space-y-2">
                      <div className="bg-border/50 h-3 w-full rounded" />
                      <div className="bg-border/50 h-3 w-11/12 rounded" />
                      <div className="bg-border/50 h-3 w-4/5 rounded" />
                    </div>

                    <div className="bg-border/50 h-10 rounded-lg" />
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            <div className="border-border flex min-h-56 items-center justify-center rounded-2xl border px-5 text-center">
              <p className="text-muted-foreground text-sm">
                دریافت اطلاعات کاتالوگ‌ها ناموفق بود.
              </p>
            </div>
          ) : items.length === 0 ? (
            <div className="border-border flex min-h-56 items-center justify-center rounded-2xl border px-5 text-center">
              <p className="text-muted-foreground text-sm">
                در حال حاضر برندی دارای کاتالوگ برای نمایش نیست.
              </p>
            </div>
          ) : (
            <div className="catalogs-grid grid min-w-0 grid-cols-1 gap-4 sm:grid-cols-[repeat(2,minmax(0,330px))] lg:grid-cols-[repeat(3,minmax(0,330px))] 2xl:grid-cols-[repeat(4,minmax(0,330px))]">
              {items.map(({ brand }) => (
                <article
                  key={brand.id}
                  className="catalog-brand-card group border-border bg-background hover:border-custom-primary flex h-full w-full min-w-0 flex-col overflow-hidden rounded-2xl border transition-[border-color,box-shadow] duration-300 hover:shadow-[0_12px_35px_rgba(0,0,0,0.05)] sm:max-w-[330px]"
                >
                  {/* Square Brand Image */}
                  <Link
                    href={`/catalogs/${brand.id}`}
                    aria-label={`مشاهده محصولات و کاتالوگ‌های ${brand.name}`}
                    className="bg-secondary-bg/50 border-border relative flex aspect-square w-full shrink-0 items-center justify-center overflow-hidden border-b"
                  >
                    {brand.image ? (
                      <Image
                        src={brand.image}
                        alt={`لوگوی ${brand.name}`}
                        fill
                        sizes="(max-width: 479px) 100vw, (max-width: 1023px) 45vw, 330px"
                        className="object-contain p-5 transition-transform duration-500 group-hover:scale-105 sm:p-6"
                      />
                    ) : (
                      <BookOpen
                        size={40}
                        strokeWidth={1.2}
                        className="text-muted-foreground"
                      />
                    )}
                  </Link>

                  {/* Brand Information */}
                  <div className="flex flex-1 flex-col p-4 text-right sm:p-5">
                    <h2 className="text-foreground text-base font-bold sm:text-lg">
                      {brand.name}
                    </h2>

                    <p className="text-muted-foreground mt-2 line-clamp-3 min-h-[72px] text-justify text-[12px] leading-6 sm:text-[13px]">
                      {brand.description}
                    </p>

                    <Link
                      href={`/catalogs/${brand.id}`}
                      className="border-custom-primary text-custom-primary hover:bg-custom-primary mt-auto flex min-h-10 items-center justify-center gap-2 rounded-lg border px-3 py-2.5 text-[12px] font-semibold transition-colors duration-300 hover:text-white sm:mt-5 sm:text-[13px]"
                    >
                      مشاهده محصولات و کاتالوگ‌ها

                      <ArrowLeft
                        size={16}
                        strokeWidth={1.8}
                        aria-hidden="true"
                      />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  );
};

export default CatalogsPage;