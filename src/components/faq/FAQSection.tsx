"use client";

import { useEffect, useRef, useState } from "react";

import FAQItem from "./FAQItem";
import { faqItems } from "./faq.data";
import { animateFAQPage } from "./faqAnimations";

const FAQSection = () => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const rootRef = useRef<HTMLElement>(null);

  useEffect(() => {
    if (!rootRef.current) return;

    return animateFAQPage(rootRef.current);
  }, []);

  return (
    <section ref={rootRef} dir="rtl" className="bg-background min-h-screen">
      <div className="w90 py-12 sm:py-16 lg:py-20">
        {/* Header */}
        <div className="faq-intro border-border flex items-end justify-between gap-6 border-b pb-7 sm:pb-10">
          <div>
            <span className="text-custom-primary text-xs font-medium sm:text-sm">
              سوالات متداول
            </span>

            <h1 className="text-foreground mt-3 text-3xl leading-tight font-bold sm:mt-4 sm:text-4xl lg:text-5xl">
              پاسخ سوالات شما
            </h1>
          </div>

          <span className="text-muted-foreground hidden text-sm sm:block">
            {faqItems.length} سوال
          </span>
        </div>

        {/* FAQ */}
        <div className="mt-9 grid items-start gap-9 sm:mt-12 sm:gap-12 lg:grid-cols-[0.7fr_1.8fr] lg:gap-20">
          {/* Intro */}
          <div className="faq-aside max-lg:hidden lg:sticky lg:top-28">
            <div className="border-custom-primary border-e-2 pe-4 sm:pe-6">
              <span className="text-muted-foreground text-xs sm:text-sm">
                راهنمای مشتریان
              </span>

              <p className="text-foreground mt-3 text-base leading-8 font-semibold sm:mt-4 sm:text-lg sm:leading-9">
                پاسخ پرسش‌های متداول درباره محصولات، سفارش و خدمات آرکات
              </p>
            </div>
          </div>

          {/* List */}
          <div className="faq-list space-y-3">
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
