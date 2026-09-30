"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { Search, X, ArrowLeft } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FAQItem from "./FAQItem";
import { faqItems } from "./faq.data";
import FAQItem2 from "./FAQItem2";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FAQSection2 = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const [search, setSearch] = useState("");
  const [debouncedSearch, setDebouncedSearch] = useState("");

  const rootRef = useRef<HTMLElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);

    return () => {
      clearTimeout(timeout);
    };
  }, [search]);

  const filteredItems = useMemo(() => {
    const value = debouncedSearch.trim().toLowerCase();

    if (!value) {
      return faqItems;
    }

    return faqItems.filter((item) => {
      return (
        item.question.toLowerCase().includes(value) ||
        item.answer.toLowerCase().includes(value)
      );
    });
  }, [debouncedSearch]);

  useGSAP(
    () => {
      if (!heroRef.current || !listRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        heroRef.current.children,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          stagger: 0.08,
          ease: "power3.out",
        },
      );

      gsap.fromTo(
        listRef.current,
        {
          opacity: 0,
          y: 20,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.7,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 85%",
            once: true,
          },
        },
      );
    },
    {
      scope: rootRef,
    },
  );

  const handleSearchChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setSearch(event.target.value);
    setActiveIndex(null);
  };

  return (
    <section
      ref={rootRef}
      dir="rtl"
      className="bg-background min-h-screen"
    >
      <div className="w90 py-18">
        {/* Hero */}
        <div ref={heroRef}>
          <div className="pb-0">
            <div className="flex items-end justify-between gap-8">
              <div>
                {/* <span className="text-custom-primary text-sm font-medium">
                  سوالات متداول
                </span> */}

                <h1 className="text-foreground text-4xl leading-tight font-bold lg:text-5xl">
                  پاسخ سوالات شما
                </h1>

                <p className="text-muted-foreground mt-5 max-w-2xl text-sm leading-8 lg:text-base">
                  پاسخ پرسش‌های متداول درباره محصولات، سفارش، ارسال و خدمات R
                  CUT
                </p>
              </div>

              <span className="text-muted-foreground hidden text-sm lg:block">
                {faqItems.length} سوال
              </span>
            </div>
          </div>

          {/* Search */}
          <div className="mt-10">
            <div className="border-border bg-background focus-within:border-custom-primary flex h-14 items-center gap-3 rounded-xl border px-5 transition-colors duration-200">
              <Search
                size={20}
                strokeWidth={1.7}
                className="text-muted-foreground shrink-0"
              />

              <input
                type="text"
                value={search}
                onChange={handleSearchChange}
                placeholder="جستجو در سوالات متداول..."
                className="text-foreground placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent text-sm outline-none"
              />

              {search && (
                <button
                  type="button"
                  onClick={() => {
                    setSearch("");
                    setDebouncedSearch("");
                    setActiveIndex(null);
                  }}
                  aria-label="پاک کردن جستجو"
                  className="text-muted-foreground hover:text-foreground flex size-8 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors duration-200"
                >
                  <X size={17} strokeWidth={1.7} />
                </button>
              )}
            </div>
          </div>
        </div>

        {/* FAQ Content */}
        <div className="mt-14 grid items-start gap-10 lg:grid-cols-[0.65fr_1.8fr] lg:gap-16">
          {/* Side Information */}
          <aside className="lg:sticky lg:top-28">
            <div className="border-custom-primary border-e-2 pe-6">
              <span className="text-muted-foreground text-sm">
                راهنمای مشتریان
              </span>

              <h2 className="text-foreground mt-4 text-2xl leading-9 font-semibold">
                سوالات متداول
              </h2>

              <p className="text-muted-foreground mt-4 text-sm leading-8">
                سوالات متداول خود را جستجو کنید یا از میان پرسش‌های زیر پاسخ
                موردنظر خود را پیدا کنید.
              </p>

              <div className="text-muted-foreground mt-6 text-sm">
                {debouncedSearch
                  ? `${filteredItems.length} نتیجه پیدا شد`
                  : `${faqItems.length} سوال و پاسخ`}
              </div>
            </div>
          </aside>

          {/* FAQ List */}
          <div ref={listRef}>
            {filteredItems.length > 0 ? (
              <div className="space-y-3">
                {filteredItems.map((item, index) => (
                  <FAQItem2
                    key={item.id}
                    id={item.id}
                    question={item.question}
                    answer={item.answer}
                    isOpen={activeIndex === index}
                    onToggle={() => {
                      setActiveIndex((current) =>
                        current === index ? null : index,
                      );
                    }}
                  />
                ))}
              </div>
            ) : (
              <div className="border-border flex min-h-[220px] items-center justify-center rounded-xl border">
                <div className="text-center">
                  <p className="text-foreground text-base font-medium">
                    سوالی پیدا نشد
                  </p>

                  <p className="text-muted-foreground mt-2 text-sm">
                    عبارت دیگری را جستجو کنید.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact */}
        <div className="border-border bg-secondary-bg mt-12 flex flex-col items-start justify-between gap-6 rounded-2xl border p-7 sm:flex-row sm:items-center lg:p-8">
          <div>
            <h2 className="text-foreground text-lg font-bold">
              پاسخ سوال خود را پیدا نکردید؟
            </h2>

            <p className="text-muted-foreground mt-2 text-sm leading-7">
              برای راهنمایی بیشتر با ما در ارتباط باشید.
            </p>
          </div>

          <a
            href="/contact-us"
            className="border-custom-primary text-custom-primary hover:bg-custom-primary inline-flex h-11 shrink-0 items-center gap-3 rounded-lg border px-5 text-sm font-semibold transition-colors duration-200 hover:text-white"
          >
            <span>تماس با ما</span>

            <ArrowLeft size={17} strokeWidth={1.7} />
          </a>
        </div>
      </div>
    </section>
  );
};

export default FAQSection2;