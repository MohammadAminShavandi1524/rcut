"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Package, Info, PhoneCall } from "lucide-react";

import { cn } from "@/lib/utils";

const navigationItems = [
  {
    label: "خانه",
    href: "/",
    icon: Home,
  },
  {
    label: "محصولات",
    href: "/products",
    icon: Package,
  },
  {
    label: "درباره ما",
    href: "/about-us",
    icon: Info,
  },
  {
    label: "تماس با ما",
    href: "/contact-us",
    icon: PhoneCall,
  },
] as const;

const MobileBottomNav = () => {
  const pathname = usePathname();

  const [pendingHref, setPendingHref] = useState<string | null>(null);

  const activeHref = pendingHref ?? pathname;

  useEffect(() => {
    // Once navigation reaches its destination, use the real pathname.
    if (pendingHref === null) return;

    const hasArrived =
      pathname === pendingHref ||
      (pendingHref !== "/" && pathname.startsWith(`${pendingHref}/`));

    if (hasArrived) {
      setPendingHref(null);
    }
  }, [pathname, pendingHref]);

  const isActive = (href: string) =>
    activeHref === href || (href !== "/" && activeHref.startsWith(`${href}/`));

  return (
    <>
      <nav
        dir="rtl"
        aria-label="ناوبری اصلی موبایل و تبلت"
        className={cn(
          "fixed inset-x-0 bottom-0 z-[100] lg:hidden",
          "border-border border-t",
          "bg-background/95 backdrop-blur-xl",
          "shadow-[0_-6px_30px_rgba(0,0,0,0.06)]",
        )}
      >
        <div className="mx-auto w-full max-w-[760px] px-2 sm:px-5">
          <ul className="grid h-[70px] grid-cols-4 items-stretch">
            {navigationItems.map((item) => {
              const active = isActive(item.href);
              const Icon = item.icon;

              return (
                <li key={item.href} className="min-w-0">
                  <Link
                    href={item.href}
                    onClick={() => setPendingHref(item.href)}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "group relative flex h-full min-w-0 flex-col",
                      "items-center justify-center gap-0.5 sm:gap-1.5",
                      "rounded-lg px-1",
                      "focus-visible:outline-2",
                      "focus-visible:outline-custom-primary",
                      "focus-visible:outline-offset-[-4px]",
                      active
                        ? "text-custom-primary"
                        : "text-muted-foreground hover:text-custom-primary",
                    )}
                  >
                    <span
                      className={cn(
                        "flex size-8 items-center justify-center",
                        "rounded-xl",
                        active
                          ? "bg-custom-primary/10"
                          : "group-hover:bg-secondary-bg",
                      )}
                    >
                      <Icon
                        className="size-[21px] sm:size-[23px]"
                        strokeWidth={active ? 2 : 1.7}
                        aria-hidden="true"
                      />
                    </span>

                    <span
                      className={cn(
                        "font-IRANYekanX text-center",
                        "text-[12px] leading-4",
                        active ? "font-semibold" : "font-medium",
                      )}
                    >
                      {item.label}
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div aria-hidden="true" className="h-[env(safe-area-inset-bottom)]" />
      </nav>

      <style jsx global>{`
        @media (max-width: 1023px) {
          body {
            padding-bottom: calc(70px + env(safe-area-inset-bottom));
          }
        }
      `}</style>
    </>
  );
};

export default MobileBottomNav;
