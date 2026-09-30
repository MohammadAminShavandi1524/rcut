"use client";

import { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import FAQItem from "./FAQItem";
import { faqItems } from "./faq.data";

gsap.registerPlugin(ScrollTrigger, useGSAP);

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLElement>(null);
  const introRef = useRef<HTMLDivElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!introRef.current || !listRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) return;

      gsap.fromTo(
        introRef.current.children,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.1,
          ease: "power3.out",
        },
      );

      const items = listRef.current.querySelectorAll(".faq-list-item");

      gsap.fromTo(
        items,
        {
          opacity: 0,
          y: 24,
        },
        {
          opacity: 1,
          y: 0,
          duration: 0.65,
          stagger: 0.08,
          ease: "power3.out",
          scrollTrigger: {
            trigger: listRef.current,
            start: "top 82%",
            once: true,
          },
        },
      );
    },
    {
      scope: rootRef,
    },
  );

  return (
    <section ref={rootRef} dir="rtl" className="bg-background min-h-screen">
      <div className="w90 py-16 lg:py-20">
        {/* Header */}
        <div
          ref={introRef}
          className="border-border flex items-end justify-between gap-10 border-b pb-10"
        >
          <div>
            <span className="text-custom-primary text-sm font-medium">
              سوالات متداول
            </span>

            <h1 className="text-foreground mt-4 text-4xl leading-tight font-bold lg:text-5xl">
              پاسخ سوالات شما
            </h1>
          </div>

          <span className="text-muted-foreground hidden text-sm lg:block">
            ۱۰ سوال
          </span>
        </div>

        {/* FAQ */}
        <div className="mt-14 grid items-start gap-12 lg:grid-cols-[0.7fr_1.8fr] lg:gap-20">
          {/* Intro */}
          <div className="lg:sticky lg:top-28">
            <div className="border-custom-primary border-e-2 pe-6">
              <span className="text-muted-foreground text-sm">
                راهنمای مشتریان
              </span>

              <p className="text-foreground mt-4 text-lg leading-9 font-semibold">
                پاسخ پرسش‌های متداول درباره محصولات، سفارش و خدمات آرکات
              </p>
            </div>
          </div>

          {/* List */}
          <div ref={listRef} className="space-y-3">
            {faqItems.map((item, index) => (
              <div key={item.id} className="faq-list-item">
                <FAQItem
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
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
