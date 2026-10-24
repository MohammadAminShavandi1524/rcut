"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { X } from "lucide-react";

import {
  MobileSidebarBody,
  MobileSidebarHeader,
  useMobileSidebar,
} from "@/components/ui/mobile-sidebar";

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
  const { closeSidebar } = useMobileSidebar();

  const isActive = (href: string) =>
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

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
            {navigationItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={closeSidebar}
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
            ))}
          </ul>
        </nav>
      </MobileSidebarBody>
    </div>
  );
};

export default MobileMenu;
