"use client";

import { useRef } from "react";
import { Minus, Plus } from "lucide-react";

import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/ScrollTrigger";

import { cn } from "@/lib/utils";

gsap.registerPlugin(ScrollTrigger, useGSAP);

type FAQItemProps = {
  id: number;
  question: string;
  answer: string;
  isOpen: boolean;
  onToggle: () => void;
};

const FAQItem2 = ({ id, question, answer, isOpen, onToggle }: FAQItemProps) => {
  const rootRef = useRef<HTMLElement>(null);
  const answerRef = useRef<HTMLDivElement>(null);
  const answerInnerRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (!answerRef.current || !answerInnerRef.current) return;

      const reduceMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)",
      ).matches;

      if (reduceMotion) {
        gsap.set(answerRef.current, {
          height: isOpen ? "auto" : 0,
        });

        gsap.set(answerInnerRef.current, {
          opacity: isOpen ? 1 : 0,
        });

        return;
      }

      const timeline = gsap.timeline({
        defaults: {
          overwrite: "auto",
        },
        onComplete: () => {
          ScrollTrigger.refresh();
        },
      });

      if (isOpen) {
        timeline
          .to(answerRef.current, {
            height: "auto",
            duration: 0.45,
            ease: "power3.inOut",
          })
          .fromTo(
            answerInnerRef.current,
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.3,
              ease: "power2.out",
            },
            "-=0.2",
          );
      } else {
        timeline
          .to(answerInnerRef.current, {
            opacity: 0,
            duration: 0.15,
            ease: "power2.in",
          })
          .to(
            answerRef.current,
            {
              height: 0,
              duration: 0.35,
              ease: "power3.inOut",
            },
            "-=0.02",
          );
      }
    },
    {
      scope: rootRef,
      dependencies: [isOpen],
    },
  );

  return (
    <article ref={rootRef} className="border-border border-b">
      {/* Question */}
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="group flex w-full cursor-pointer items-center gap-6 py-6 text-start"
      >
        {/* Number */}
        <span
          className={cn(
            "w-8 shrink-0 text-sm font-medium transition-colors duration-200",
            isOpen ? "text-custom-primary" : "text-muted-foreground",
          )}
        >
          {String(id).padStart(2, "0")}
        </span>

        {/* Question */}
        <span
          className={cn(
            "min-w-0 flex-1 text-base leading-7 font-medium transition-colors duration-200",
            isOpen
              ? "text-custom-primary"
              : "text-foreground group-hover:text-custom-primary",
          )}
        >
          {question}
        </span>

        {/* Icon */}
        <span
          className={cn(
            "flex size-9 shrink-0 items-center justify-center rounded-full border transition-colors duration-200",
            isOpen
              ? "border-custom-primary bg-custom-primary text-white"
              : "border-border text-muted-foreground group-hover:border-custom-primary group-hover:text-custom-primary",
          )}
        >
          {isOpen ? (
            <Minus className="size-4" strokeWidth={1.8} />
          ) : (
            <Plus className="size-4" strokeWidth={1.8} />
          )}
        </span>
      </button>

      {/* Answer */}
      <div
        id={`faq-answer-${id}`}
        ref={answerRef}
        className="h-0 overflow-hidden"
      >
        <div ref={answerInnerRef} className="pb-7 opacity-0">
          <div className="flex gap-6">
            <div className="w-8 shrink-0" />

            <p className="text-muted-foreground max-w-4xl text-justify text-[15px] leading-8">
              {answer}
            </p>

            <div className="size-9 shrink-0" />
          </div>
        </div>
      </div>
    </article>
  );
};

export default FAQItem2;
