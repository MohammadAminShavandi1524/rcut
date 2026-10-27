"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";
import type { CategoryNode } from "@/components/products/products.categories";

interface ApiCategory {
  id: number;
  name: string;
  index: number;
  child_count: number;
  parent: {
    id: number;
    name: string;
  } | null;
  created: string;
}

type CategoryMenuProps = {
  items: CategoryNode[];
  isVisible?: boolean;
};

function buildCategoryTree(categories: ApiCategory[]): CategoryNode[] {
  const nodes = new Map<number, CategoryNode>();

  const sortedCategories = [...categories].sort((a, b) => a.index - b.index);

  for (const category of sortedCategories) {
    nodes.set(category.id, {
      id: category.id,
      name: category.name,
      slug: category.name === "برند یاماسا" ? "yamasa" : undefined,
      children: [],
    });
  }

  const roots: CategoryNode[] = [];

  for (const category of sortedCategories) {
    const node = nodes.get(category.id)!;

    const parent = category.parent ? nodes.get(category.parent.id) : undefined;

    if (parent) {
      parent.children!.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

function getCategoryHref(category: CategoryNode) {
  if (category.slug === "yamasa") {
    return "/yamasa";
  }

  return `/products?scope=${category.id}&categories=${category.id}`;
}

function CategoryMenu({ items, isVisible = true }: CategoryMenuProps) {
  const [openItem, setOpenItem] = useState<number | null>(null);
  const [submenuSide, setSubmenuSide] = useState<"left" | "right">("left");
  const [submenuTop, setSubmenuTop] = useState(0);

  const activeItemRef = useRef<HTMLDivElement | null>(null);
  const submenuRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!isVisible) {
      setOpenItem(null);
      setSubmenuTop(0);
      activeItemRef.current = null;
      return;
    }

    if (openItem === null || !activeItemRef.current || !submenuRef.current) {
      return;
    }

    const anchorRect = activeItemRef.current.getBoundingClientRect();
    const submenuRect = submenuRef.current.getBoundingClientRect();

    const minTop = 8;
    const maxTop = Math.max(
      minTop,
      window.innerHeight - submenuRect.height - 8,
    );

    const targetTop = Math.min(Math.max(anchorRect.top, minTop), maxTop);

    setSubmenuTop(targetTop - anchorRect.top);
  }, [openItem, isVisible]);

  const handleItemEnter = (category: CategoryNode, element: HTMLDivElement) => {
    if (!category.children?.length) {
      setOpenItem(null);
      setSubmenuTop(0);
      activeItemRef.current = null;
      return;
    }

    const rect = element.getBoundingClientRect();
    const leftSpace = rect.left;
    const rightSpace = window.innerWidth - rect.right;
    const submenuWidth = 226;

    setSubmenuSide(
      leftSpace >= submenuWidth || leftSpace >= rightSpace ? "left" : "right",
    );

    activeItemRef.current = element;
    setSubmenuTop(0);
    setOpenItem(category.id);
  };

  const closeSubmenu = () => {
    setOpenItem(null);
    setSubmenuTop(0);
    activeItemRef.current = null;
  };

  return (
    <div className="w-full space-y-0.5">
      {items.map((category) => {
        const href = getCategoryHref(category);
        const hasChildren = Boolean(category.children?.length);
        const isOpen = openItem === category.id;

        return (
          <div
            key={category.id}
            className="relative w-full"
            onMouseEnter={(event) =>
              handleItemEnter(category, event.currentTarget)
            }
            onMouseLeave={closeSubmenu}
          >
            <Link
              href={href}
              aria-haspopup={hasChildren ? true : undefined}
              aria-expanded={hasChildren ? isOpen : undefined}
              onFocus={(event) => {
                const parent = event.currentTarget.parentElement;

                if (parent instanceof HTMLDivElement) {
                  handleItemEnter(category, parent);
                }
              }}
              className={cn(
                "group/item text-foreground/80 relative flex h-[42px] w-full",
                "items-center justify-start gap-2 rounded-md px-3.5",
                "text-right text-[14px] transition-colors duration-200",
                "hover:bg-secondary hover:text-custom-primary",
                "focus-visible:bg-secondary focus-visible:text-custom-primary",
                isOpen && "bg-secondary text-custom-primary",
              )}
            >
              <span
                className={cn(
                  "bg-custom-primary absolute right-0 h-0 w-[2px]",
                  "rounded-full transition-all duration-200",
                  "group-hover/item:h-5 group-focus-visible/item:h-5",
                  isOpen && "h-5",
                )}
              />

              <span className="min-w-0 flex-1 text-right">{category.name}</span>

              {hasChildren &&
                (isOpen && submenuSide === "right" ? (
                  <ChevronRight className="text-custom-primary size-4 shrink-0" />
                ) : (
                  <ChevronLeft
                    className={cn(
                      "size-4 shrink-0 transition-transform duration-200",
                      isOpen && "text-custom-primary -translate-x-0.5",
                    )}
                  />
                ))}
            </Link>

            {hasChildren && (
              <div
                ref={isOpen ? submenuRef : null}
                style={{
                  top: isOpen ? `${submenuTop}px` : 0,
                }}
                className={cn(
                  "absolute z-[60] w-[210px]",
                  "transition-all duration-200",
                  submenuSide === "left"
                    ? "right-[calc(100%_+_8px)]"
                    : "left-[calc(100%_+_8px)]",
                  isOpen
                    ? "pointer-events-auto visible opacity-100"
                    : "pointer-events-none invisible opacity-0",
                )}
              >
                {/* ناحیه عبور موس بین دو منو */}
                <div
                  aria-hidden="true"
                  className={cn(
                    "absolute top-0 h-full w-2",
                    submenuSide === "left" ? "-right-2" : "-left-2",
                  )}
                />

                <div className="bg-background border-border relative w-[210px] rounded-lg border p-2 shadow-[0_10px_30px_rgba(0,0,0,0.09)]">
                  <CategoryMenu items={category.children!} isVisible={isOpen} />
                </div>
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}

const ProductsDropdown = () => {
  const pathname = usePathname();
  const isActive = pathname.startsWith("/products");

  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("دریافت دسته بندی‌ها ناموفق بود.");
        }

        const data: ApiCategory[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات دسته بندی‌ها نامعتبر است.");
        }

        if (active) {
          setCategories(buildCategoryTree(data));
          setLoadError(false);
        }
      } catch (error) {
        console.error("GET CATEGORIES ERROR:", error);

        if (active) {
          setLoadError(true);
          setCategories([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchCategories();

    return () => {
      active = false;
    };
  }, []);

  const categoriesReady = !loading && !loadError && categories.length > 0;

  return (
    <li className="group relative shrink-0">
      <Link
        href="/products"
        className={cn(
          "3xl:text-[17px] flex items-center gap-1.5 py-2.5 text-[13px] font-medium transition-colors xl:text-[14px] 2xl:text-[15px]",
          "text-foreground/80 hover:text-custom-primary",
          isActive && "text-custom-primary",
        )}
      >
        محصولات
        <ChevronDown className="size-4.5 transition-transform duration-300 group-hover:rotate-180" />
      </Link>

      {categoriesReady && (
        <div
          className={cn(
            "invisible absolute top-full -right-5 z-50 pt-2",
            "translate-y-2 opacity-0 transition-all duration-300",
            "group-hover:visible group-hover:translate-y-0 group-hover:opacity-100",
            "group-focus-within:visible group-focus-within:translate-y-0 group-focus-within:opacity-100",
          )}
        >
          <div className="bg-background border-border w-[210px] rounded-lg border p-2 shadow-[0_10px_30px_rgba(0,0,0,0.09)]">
            <CategoryMenu items={categories} />
          </div>
        </div>
      )}
    </li>
  );
};

export default ProductsDropdown;
