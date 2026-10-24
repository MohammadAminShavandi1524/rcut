"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

import { ChevronDown, X } from "lucide-react";

import {
  MobileSidebarBody,
  MobileSidebarHeader,
  useMobileSidebar,
} from "@/components/ui/mobile-sidebar";

import { categoryTree } from "@/components/products/products.categories";
import { cn } from "@/lib/utils";

import Logo from "./Logo";

const navigationItems = [
  { label: "خانه", href: "/" },
  { label: "محصولات", href: "/products" },
  { label: "نمایندگی یاماسا", href: "/yamasa" },
  { label: "درباره ما", href: "/about-us" },
  { label: "تماس با ما", href: "/contact-us" },
  { label: "سوالات متداول", href: "/faq" },
];

const MobileMenu = () => {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const { closeSidebar } = useMobileSidebar();

  const [categoriesOpen, setCategoriesOpen] = useState(false);

  const activeScope = searchParams.get("scope");

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  const handleNavigation = () => {
    setCategoriesOpen(false);
    closeSidebar();
  };

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
                      <div className="min-h-0 overflow-hidden">
                        <ul className="border-border me-3 mt-1 mb-2 flex flex-col gap-1 border-r ps-1 pe-3">
                          {categoryTree.map((category) => {
                            const href =
                              category.slug === "yamasa"
                                ? "/yamasa"
                                : `/products?scope=${category.id}&categories=${category.id}`;

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
