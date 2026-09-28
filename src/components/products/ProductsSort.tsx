"use client";

import { useEffect, useRef, useState } from "react";
import { ChevronDown } from "lucide-react";

type Props = {
  sort: "newest" | "best-selling";
  onChange: (value: "newest" | "best-selling") => void;
};

const ProductsSort = ({ sort, onChange }: Props) => {
  const [sortOpen, setSortOpen] = useState(false);

  const sortRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (sortRef.current && !sortRef.current.contains(event.target as Node)) {
        setSortOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="p-6">
      <div className="flex items-center gap-2">
        <span className="text-muted-foreground text-sm">مرتب‌سازی:</span>

        <div ref={sortRef} className="relative min-w-[180px]">
          <button
            type="button"
            onClick={() => setSortOpen((value) => !value)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            className="border-border bg-background text-foreground hover:border-custom-primary flex h-11 w-full cursor-pointer items-center justify-between gap-3 rounded-lg border ps-4 pe-2 text-sm transition-colors duration-300 outline-none"
          >
            <span>{sort === "best-selling" ? "پرفروش‌ترین" : "جدیدترین"}</span>

            <ChevronDown
              size={18}
              strokeWidth={1.7}
              className={`mt-px text-muted-foreground shrink-0 transition-transform duration-300 ease-out ${
                sortOpen ? "rotate-180" : ""
              }`}
            />
          </button>

          <div
            className={`border-border bg-background absolute start-0 top-[calc(100%+8px)] z-30 w-full origin-top overflow-hidden rounded-xl border p-1.5 shadow-lg transition-all duration-200 ease-out ${
              sortOpen
                ? "visible translate-y-0 scale-100 opacity-100"
                : "pointer-events-none invisible -translate-y-1 scale-[0.98] opacity-0"
            }`}
            role="listbox"
          >
            <button
              type="button"
              role="option"
              aria-selected={sort === "newest"}
              onClick={() => {
                onChange("newest");
                setSortOpen(false);
              }}
              className={`flex h-10 w-full cursor-pointer items-center rounded-lg px-3 text-sm transition-colors duration-200 ${
                sort === "newest"
                  ? "bg-custom-primary/10 text-custom-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary-bg hover:text-foreground"
              }`}
            >
              جدیدترین
            </button>

            <button
              type="button"
              role="option"
              aria-selected={sort === "best-selling"}
              onClick={() => {
                onChange("best-selling");
                setSortOpen(false);
              }}
              className={`flex h-10 w-full cursor-pointer items-center rounded-lg px-3 text-sm transition-colors duration-200 ${
                sort === "best-selling"
                  ? "bg-custom-primary/10 text-custom-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary-bg hover:text-foreground"
              }`}
            >
              پرفروش‌ترین
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsSort;
