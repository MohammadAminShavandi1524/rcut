"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import type { ApiBrand } from "./products.api";

type Props = {
  brands: ApiBrand[];
  selectedBrandId: number | null;
  onChange: (id: number | null) => void;
};

const ProductsBrandFilter = ({ brands, selectedBrandId, onChange }: Props) => {
  const [brandsOpen, setBrandsOpen] = useState(true);

  const sortedBrands = [...brands].sort(
    (a, b) => a.index - b.index || a.id - b.id,
  );

  return (
    <div className="border-border border-t">
      <button
        type="button"
        onClick={() => setBrandsOpen((value) => !value)}
        aria-expanded={brandsOpen}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 pe-7.75 text-right"
      >
        <span className="text-foreground text-sm font-bold">برند</span>

        <ChevronDown
          size={18}
          strokeWidth={1.7}
          className={`text-muted-foreground transition-transform duration-300 ${
            brandsOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          brandsOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-y-hidden">
          <div className="px-6 pb-6">
            {sortedBrands.length === 0 ? (
              <p className="text-muted-foreground text-xs leading-6">
                هنوز برندی برای نمایش وجود ندارد.
              </p>
            ) : (
              <ScrollArea
                dir="rtl"
                lockWheel
                className="h-auto max-h-[240px] w-full"
                viewportClassName="!h-auto !max-h-[240px]"
                scrollBarClassName="-me-3"
              >
                <div dir="rtl" className="flex flex-col gap-2">
                  {sortedBrands.map((brand) => {
                    const checked = selectedBrandId === brand.id;

                    return (
                      <label
                        key={brand.id}
                        className="group flex min-h-9 min-w-0 cursor-pointer items-center gap-3"
                      >
                        <span
                          className={`flex size-[17px] shrink-0 items-center justify-center rounded-[4px] border transition-all duration-200 ${
                            checked
                              ? "border-custom-primary bg-custom-primary"
                              : "border-border group-hover:border-custom-primary"
                          }`}
                        >
                          {checked && (
                            <Check
                              size={11}
                              strokeWidth={2.5}
                              className="text-white"
                            />
                          )}
                        </span>

                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => onChange(checked ? null : brand.id)}
                          className="sr-only"
                        />

                        <span
                          className={`min-w-0 flex-1 text-sm leading-6 transition-colors duration-200 ${
                            checked
                              ? "text-foreground font-medium"
                              : "text-muted-foreground group-hover:text-foreground"
                          }`}
                        >
                          {brand.name}
                        </span>
                      </label>
                    );
                  })}
                </div>
              </ScrollArea>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsBrandFilter;
