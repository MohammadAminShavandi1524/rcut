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

const FAQItem = ({ id, question, answer, isOpen, onToggle }: FAQItemProps) => {
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
          y: 0,
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
            duration: 0.5,
            ease: "power3.inOut",
          })
          .fromTo(
            answerInnerRef.current,
            {
              opacity: 0,
              y: 12,
            },
            {
              opacity: 1,
              y: 0,
              duration: 0.35,
              ease: "power3.out",
            },
            "-=0.25",
          );
      } else {
        timeline
          .to(answerInnerRef.current, {
            opacity: 0,
            y: 8,
            duration: 0.2,
            ease: "power2.in",
          })
          .to(
            answerRef.current,
            {
              height: 0,
              duration: 0.4,
              ease: "power3.inOut",
            },
            "-=0.05",
          );
      }
    },
    {
      scope: rootRef,
      dependencies: [isOpen],
    },
  );

  return (
    <article
      ref={rootRef}
      className={cn(
        "border-border bg-background overflow-hidden rounded-xl border transition-all duration-300",
        isOpen &&
          "border-custom-primary/40 shadow-[0_8px_30px_rgba(20,88,150,0.08)]",
      )}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`faq-answer-${id}`}
        className="group flex w-full cursor-pointer items-center justify-between gap-6 px-6 py-5 text-start"
      >
        <div className="flex min-w-0 items-center gap-4">
          <span
            className={cn(
              "text-xs font-medium transition-colors duration-300",
              isOpen ? "text-custom-primary" : "text-muted-foreground",
            )}
          >
            {String(id).padStart(2, "0")}
          </span>

          <h3
            className={cn(
              "text-foreground text-[16px] leading-7 font-medium transition-colors duration-300",
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
            "flex size-10 shrink-0 items-center justify-center rounded-lg border transition-all duration-300",
            isOpen
              ? "border-custom-primary bg-custom-primary text-white"
              : "border-border bg-secondary-bg text-foreground group-hover:border-custom-primary/50 group-hover:text-custom-primary",
          )}
        >
          {isOpen ? (
            <Minus className="size-[18px]" strokeWidth={1.8} />
          ) : (
            <Plus className="size-[18px]" strokeWidth={1.8} />
          )}
        </span>
      </button>

      <div
        id={`faq-answer-${id}`}
        ref={answerRef}
        className="h-0 overflow-hidden"
      >
        <div ref={answerInnerRef} className="px-6 pb-6 opacity-0">
          <div className="border-border border-t pe-10 pt-5">
            <p className="text-muted-foreground text-justify text-[15px] leading-8">
              {answer}
            </p>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FAQItem;
