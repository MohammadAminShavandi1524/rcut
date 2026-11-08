"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { ChevronDown, LoaderCircle, X } from "lucide-react";

import {
  MobileSidebarBody,
  MobileSidebarHeader,
  useMobileSidebar,
} from "@/components/ui/mobile-sidebar";

import type { CategoryNode } from "@/components/products/products.categories";
import { cn } from "@/lib/utils";

import Logo from "./Logo";

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

const navigationItems = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "نمایندگی یاماسا", href: "/yamasa" },
  { label: "درباره ما", href: "/about-us" },
  { label: "تماس با ما", href: "/contact-us" },
  { label: "سوالات متداول", href: "/faq" },
];

/*
 * Build the same category tree used by the desktop menu.
 */
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

const MobileMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { closeSidebar } = useMobileSidebar();

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState(false);

  const activeScope = searchParams.get("scope");

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const handleNavigation = () => {
    setCategoriesOpen(false);
    closeSidebar();
  };

  /*
   * Fetch dynamic categories from the existing API.
   */
  useEffect(() => {
    const controller = new AbortController();

    const fetchCategories = async () => {
      setCategoriesLoading(true);
      setCategoriesError(false);

      try {
        const response = await fetch("/api/categories", {
          cache: "no-store",
          signal: controller.signal,
        });

        if (!response.ok) {
          throw new Error("دریافت دسته‌بندی‌ها ناموفق بود.");
        }

        const data: unknown = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات دسته‌بندی‌ها نامعتبر است.");
        }

        if (controller.signal.aborted) return;

        const categoryTree = buildCategoryTree(data as ApiCategory[]);

        setCategories(categoryTree);
        setCategoriesError(false);
      } catch (error) {
        if (controller.signal.aborted) return;

        console.error("MOBILE CATEGORIES ERROR:", error);

        setCategories([]);
        setCategoriesError(true);
      } finally {
        if (!controller.signal.aborted) {
          setCategoriesLoading(false);
        }
      }
    };

    void fetchCategories();

    return () => {
      controller.abort();
    };
  }, []);

  return (
    <div dir="rtl" className="flex min-h-full flex-col">
      <MobileSidebarHeader className="justify-between px-5">
        <Logo variant="sidebar" />

        <button
          type="button"
          onClick={closeSidebar}
          aria-label="بستن منوی سایت"
          className="border-border text-foreground hover:border-custom-primary hover:text-custom-primary flex size-10 cursor-pointer items-center justify-center rounded-md border transition-colors duration-300"
        >
          <X className="size-5.5" strokeWidth={1.7} />
        </button>
      </MobileSidebarHeader>

      <MobileSidebarBody>
        <nav id="mobile-navigation" aria-label="منوی موبایل">
          <ul className="flex flex-col gap-1">
            {navigationItems.map((item) => {
              if (item.href === "/products") {
                return (
                  <li key={item.href}>
                    <div
                      className={cn(
                        "flex items-center rounded-lg transition-colors duration-300",
                        isActive(item.href)
                          ? "bg-secondary-bg"
                          : "hover:bg-secondary-bg",
                      )}
                    >
                      <Link
                        href="/products"
                        onClick={handleNavigation}
                        aria-current={
                          pathname === "/products" && !activeScope
                            ? "page"
                            : undefined
                        }
                        className={cn(
                          "text-foreground/80 hover:text-custom-primary block min-w-0 flex-1 rounded-lg px-3 py-3.5 text-[15px] font-medium transition-colors duration-300",
                          isActive(item.href) && "text-custom-primary",
                        )}
                      >
                        محصولات
                      </Link>

                      <button
                        type="button"
                        onClick={() => setCategoriesOpen((value) => !value)}
                        aria-label={
                          categoriesOpen
                            ? "بستن دسته‌بندی‌های محصولات"
                            : "نمایش دسته‌بندی‌های محصولات"
                        }
                        aria-expanded={categoriesOpen}
                        aria-controls="mobile-product-categories"
                        className="text-muted-foreground hover:text-custom-primary me-1 flex size-11 shrink-0 cursor-pointer items-center justify-center rounded-lg transition-colors duration-300"
                      >
                        <ChevronDown
                          size={19}
                          strokeWidth={1.8}
                          className={cn(
                            "transition-transform duration-300",
                            categoriesOpen && "rotate-180",
                          )}
                        />
                      </button>
                    </div>

                    <div
                      id="mobile-product-categories"
                      className={cn(
                        "grid transition-[grid-template-rows] duration-300",
                        categoriesOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
                      )}
                    >
                      <div
                        className={cn(
                          "min-h-0",
                          categoriesOpen
                            ? "overflow-visible"
                            : "overflow-hidden",
                        )}
                      >
                        <ul className="border-border me-3 mt-1 mb-2 flex flex-col gap-1 border-r ps-1 pe-3">
                          {categoriesLoading && (
                            <li
                              role="status"
                              className="text-muted-foreground flex items-center gap-2 rounded-lg px-3 py-3 text-sm"
                            >
                              <LoaderCircle
                                size={16}
                                className="text-custom-primary animate-spin"
                              />
                              در حال دریافت دسته‌بندی‌ها...
                            </li>
                          )}

                          {!categoriesLoading && categoriesError && (
                            <li className="text-muted-foreground rounded-lg px-3 py-3 text-sm">
                              دریافت دسته‌بندی‌ها ناموفق بود.
                            </li>
                          )}

                          {!categoriesLoading &&
                            !categoriesError &&
                            categories.length === 0 && (
                              <li className="text-muted-foreground rounded-lg px-3 py-3 text-sm">
                                دسته‌بندی‌ای برای نمایش وجود ندارد.
                              </li>
                            )}

                          {!categoriesLoading &&
                            !categoriesError &&
                            categories.map((category) => {
                              const href = getCategoryHref(category);

                              const isCategoryActive =
                                pathname === "/products" &&
                                activeScope === String(category.id);

                              return (
                                <li key={category.id}>
                                  <Link
                                    href={href}
                                    onClick={handleNavigation}
                                    aria-current={
                                      isCategoryActive ? "page" : undefined
                                    }
                                    tabIndex={categoriesOpen ? 0 : -1}
                                    className={cn(
                                      "text-muted-foreground hover:bg-secondary-bg hover:text-custom-primary block rounded-lg px-3 py-3 text-sm transition-colors duration-300",
                                      isCategoryActive &&
                                        "bg-secondary-bg text-custom-primary font-medium",
                                    )}
                                  >
                                    {category.name}
                                  </Link>
                                </li>
                              );
                            })}
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              }

              return (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={handleNavigation}
                    aria-current={isActive(item.href) ? "page" : undefined}
                    className={cn(
                      "text-foreground/80 hover:bg-secondary-bg hover:text-custom-primary block rounded-lg px-3 py-3.5 text-[15px] font-medium transition-colors duration-300",
                      isActive(item.href) &&
                        "bg-secondary-bg text-custom-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </MobileSidebarBody>
    </div>
  );
};

export default MobileMenu;
