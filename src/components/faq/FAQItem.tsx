"use client";

import { useEffect, useRef } from "react";
import { Minus, Plus } from "lucide-react";

import { cn } from "@/lib/utils";

import { animateFAQAnswer } from "./faqAnimations";

type FAQItemProps = {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FAQItem = ({ id, question, answer, isOpen, onToggle }: FAQItemProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const answerInnerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!rootRef.current || !answerRef.current || !answerInnerRef.current) {
      return;
    }

    return animateFAQAnswer(
      rootRef.current,
      answerRef.current,
      answerInnerRef.current,
      isOpen,
    );
  }, [isOpen]);

  return (
    <article
      ref={rootRef}
      className={cn(
        "border-border bg-background overflow-hidden rounded-xl border transition-colors duration-300",
        isOpen &&
          "border-custom-primary/40 shadow-[0_8px_30px_rgba(20,88,150,0.08)]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="group flex w-full cursor-pointer items-center justify-between gap-3 px-4 py-4 text-start sm:gap-6 sm:px-6 sm:py-5"
      >
        <div className="flex min-w-0 items-start gap-3 sm:items-center sm:gap-4">
          <span
            className={cn(
              "mt-1 shrink-0 text-[11px] font-medium transition-colors duration-300 sm:mt-0 sm:text-xs max-sm:hidden",
              isOpen ? "text-custom-primary" : "text-muted-foreground",
            )}
          >
            {String(id).padStart(2, "0")}
          </span>

          <h3
            className={cn(
              "text-foreground text-sm leading-7 font-medium transition-colors duration-300 sm:text-[16px]",
              isOpen
                ? "text-custom-primary"
                : "group-hover:text-custom-primary",
            )}
          >
            {question}
          </h3>
        </div>

        <span
          className={cn(
            "flex size-8 shrink-0 items-center justify-center rounded-lg border transition-all duration-300 sm:size-10",
            isOpen
              ? "border-custom-primary bg-custom-primary text-white"
              : "border-border bg-secondary-bg text-foreground group-hover:border-custom-primary/50 group-hover:text-custom-primary",
          )}
        >
          {isOpen ? (
            <Minus className="size-4 sm:size-[18px]" strokeWidth={1.8} />
          ) : (
            <Plus className="size-4 sm:size-[18px]" strokeWidth={1.8} />
          )}
        </span>
      </button>

      <div
        id={`faq-answer-${id}`}
        ref={answerRef}
        className="h-0 overflow-hidden"
      >
        <div
          ref={answerInnerRef}
          className="px-4 pb-5 opacity-0 sm:px-6 sm:pb-6"
        >
          <div className="border-border border-t pe-0 pt-4 sm:pe-10 sm:pt-5">
            <p className="text-muted-foreground text-justify text-[13px] leading-7 sm:text-[15px] sm:leading-8">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FAQItem;
