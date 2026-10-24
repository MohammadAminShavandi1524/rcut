"use client";

import { useState } from "react";
import { Check, ChevronDown, ChevronLeft } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";

import {
  categoryTree,
  findCategoryById,
  type CategoryNode,
} from "./products.categories";

type Props = {
  selectedCategories: number[];
  onToggle: (id: number) => void;
  scopeCategoryId?: number;
};

type CategoryRowProps = {
  category: CategoryNode;
  level: number;
  selectedCategories: number[];
  onToggle: (id: number) => void;
};

const CategoryRow = ({
  category,
  level,
  selectedCategories,
  onToggle,
}: CategoryRowProps) => {
  const hasChildren = Boolean(category.children?.length);
  const checked = selectedCategories.includes(category.id);

  const [expanded, setExpanded] = useState(level === 0);

  return (
    <div className="min-w-0">
      <div className="group flex min-h-9 items-center gap-2">
        <label
          className="flex min-w-0 flex-1 cursor-pointer items-center gap-3"
          style={{ paddingRight: `${level * 14}px` }}
        >
          <span
            className={`flex size-[17px] shrink-0 items-center justify-center rounded-[4px] border transition-all duration-200 ${
              checked
                ? "border-custom-primary bg-custom-primary"
                : "border-border group-hover:border-custom-primary"
            }`}
          >
            {checked && (
              <Check size={11} strokeWidth={2.5} className="text-white" />
            )}
          </span>

          <input
            type="checkbox"
            checked={checked}
            onChange={() => onToggle(category.id)}
            className="sr-only"
          />

          <span
            className={`min-w-0 flex-1 text-sm leading-6 transition-colors duration-200 ${
              checked
                ? "text-foreground font-medium"
                : "text-muted-foreground group-hover:text-foreground"
            }`}
          >
            {category.name}
          </span>
        </label>

        {hasChildren && (
          <button
            type="button"
            onClick={() => setExpanded((value) => !value)}
            aria-label={
              expanded
                ? `بستن زیرشاخه‌های ${category.name}`
                : `نمایش زیرشاخه‌های ${category.name}`
            }
            aria-expanded={expanded}
            className="text-muted-foreground hover:text-custom-primary flex size-7 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors duration-200"
          >
            <ChevronLeft
              size={16}
              strokeWidth={1.7}
              className={`transition-transform duration-200 ${
                expanded ? "-rotate-90" : ""
              }`}
            />
          </button>
        )}
      </div>

      {hasChildren && expanded && (
        <div className="mt-1 flex flex-col gap-1.5">
          {category.children!.map((child) => (
            <CategoryRow
              key={child.id}
              category={child}
              level={level + 1}
              selectedCategories={selectedCategories}
              onToggle={onToggle}
            />
          ))}
        </div>
      )}
    </div>
  );
};

const ProductsCategoryFilter = ({
  selectedCategories,
  onToggle,
  scopeCategoryId,
}: Props) => {
  const [categoriesOpen, setCategoriesOpen] = useState(true);

  const scopedCategory =
    scopeCategoryId !== undefined
      ? findCategoryById(scopeCategoryId)
      : undefined;

  const visibleCategories = scopedCategory ? [scopedCategory] : categoryTree;

  return (
    <div className="border-border border-t">
      <button
        type="button"
        onClick={() => setCategoriesOpen((value) => !value)}
        aria-expanded={categoriesOpen}
        className="flex w-full cursor-pointer items-center justify-between px-6 py-5 pe-7.75 text-right"
      >
        <span className="text-foreground text-sm font-bold">دسته‌بندی</span>

        <ChevronDown
          size={18}
          strokeWidth={1.7}
          className={`text-muted-foreground transition-transform duration-300 ${
            categoriesOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-300 ${
          categoriesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-y-hidden">
          <div className="px-6 pb-6">
            <ScrollArea
              dir="rtl"
              lockWheel
              className="h-auto max-h-[280px] w-full"
              viewportClassName="!h-auto !max-h-[280px]"
              scrollBarClassName="-me-3"
            >
              <div dir="rtl" className="flex flex-col gap-2">
                {visibleCategories.map((category) => (
                  <CategoryRow
                    key={category.id}
                    category={category}
                    level={0}
                    selectedCategories={selectedCategories}
                    onToggle={onToggle}
                  />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductsCategoryFilter;
