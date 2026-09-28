"use client";

import { useState } from "react";
import { Check, ChevronDown } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { productCategories } from "./products.data";

type Props = {
  selectedCategories: string[];
  onToggle: (slug: string) => void;
};

const ProductsCategoryFilter = ({ selectedCategories, onToggle }: Props) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  return (
    <div className="border-border border-t">
      <button
        type="button"
        onClick={() => setCategoriesOpen((value) => !value)}
        className="flex w-full cursor-pointer items-center justify-between px-6 pe-7.75 py-5 text-right"
      >
        <span className="text-foreground text-sm font-bold">دسته‌بندی</span>

        <ChevronDown
          size={18}
          strokeWidth={1.7}
          className={`text-muted-foreground transition-transform duration-300 ${
            categoriesOpen ? "rotate-180" : ""
          } `}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          categoriesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        } `}
      >
        <div className="overflow-y-hidden">
          <div className="px-6 pb-6">
            <ScrollArea
              dir="rtl"
              lockWheel
              className="h-auto max-h-[280px] w-full"
              viewportClassName="!h-auto !max-h-[280px]"
              scrollBarClassName="me-1"
            >
              <div dir="rtl" className="flex flex-col gap-3.5">
                {productCategories.map((category) => {
                  const checked = selectedCategories.includes(category.slug);

                  return (
                    <label
                      key={category.slug}
                      className="group flex cursor-pointer items-center gap-3"
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
                        onChange={() => onToggle(category.slug)}
                        className="sr-only"
                      />

                      <span
                        className={`text-sm transition-colors duration-200 ${
                          checked
                            ? "text-foreground font-medium"
                            : "text-muted-foreground group-hover:text-foreground"
                        }`}
                      >
                        {category.title}
                      </span>
                    </label>
                  );
                })}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCategoryFilter;
