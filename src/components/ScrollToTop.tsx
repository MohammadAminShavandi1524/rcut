"use client";

import { useEffect, useState } from "react";

import { ArrowUp } from "lucide-react";

import { cn } from "@/lib/utils";
import { getLenisInstance } from "@/lib/lenis-instance";

const ScrollToTop = () => {
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const showThreshold = window.innerHeight;

      setShowButton(window.scrollY > showThreshold);
    };

    handleScroll();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    const lenis = getLenisInstance();

    if (lenis) {
      lenis.scrollTo(0, {
        immediate: true,
      });

      return;
    }

    window.scrollTo({
      top: 0,
    });
  };

  return (
    <button
      type="button"
      onClick={handleScrollToTop}
      aria-label="بازگشت به بالای صفحه"
      aria-hidden={!showButton}
      tabIndex={showButton ? 0 : -1}
      className={cn(
        "border-border-secondary bg-background text-foreground",

        // Position
        "fixed z-40",
        "end-4 bottom-4",
        "sm:end-5 sm:bottom-5",
        "lg:end-6 lg:bottom-6",

        // Size
        "flex size-10 cursor-pointer items-center justify-center",
        "sm:size-11",
        "lg:size-12",

        // Appearance
        "rounded-lg border",
        "sm:rounded-xl",
        "shadow-[0_6px_20px_rgba(0,0,0,0.07)]",
        "lg:shadow-[0_8px_30px_rgba(0,0,0,0.08)]",

        // Transitions
        "transition-[opacity,transform,background-color,border-color,color] duration-500 ease-out",

        // Hover
        "hover:border-custom-primary hover:bg-custom-primary hover:text-white",

        // Visibility
        showButton
          ? "translate-y-0 opacity-100"
          : "pointer-events-none translate-y-6 opacity-0",
      )}
    >
      <ArrowUp
        className="size-4 sm:size-[17px] lg:size-4.5"
        strokeWidth={1.8}
      />
    </button>
  );
};

export default ScrollToTop;
