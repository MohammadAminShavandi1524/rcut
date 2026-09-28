"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

const categories = [
  {
    title: "الماس",
    href: "/products?categories=diamond",
  },
  {
    title: "فرز انگشتی",
    href: "/products?categories=end-mills",
  },
  {
    title: "مته",
    href: "/products?categories=drills",
  },
  {
    title: "قلاویز",
    href: "/products?categories=taps",
  },
  {
    title: "اندازه‌گیری",
    href: "/products?categories=measuring",
  },
  {
    title: "هولدر",
    href: "/products?categories=holders",
  },
];

const ProductsDropdown = () => {
  const pathname = usePathname();

  const isActive = pathname.startsWith("/products");

  return (
    <li className="group relative shrink-0">
      <Link
        href="/products"
        className={cn(
          "flex items-center gap-1.5 py-2.5 text-[17px] font-medium transition-colors",
          "text-foreground/80 hover:text-custom-primary",
          isActive && "text-custom-primary",
        )}
      >
        محصولات
        <ChevronDown className="size-4.5 transition-transform duration-300 group-hover:rotate-180" />
      </Link>

      <div className="invisible absolute top-full -right-5 z-50 translate-y-2 pt-2 opacity-0 transition-all duration-300 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
        <div className="bg-background border-border w-[190px] rounded-md border p-2 shadow-[0_10px_30px_rgba(0,0,0,0.08)]">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="group/item text-foreground/80 hover:bg-secondary hover:text-custom-primary relative flex h-[42px] items-center justify-start rounded-sm px-4 text-right text-[14px] transition-colors"
            >
              <span className="bg-custom-primary absolute right-0 h-0 w-[2px] transition-all duration-300 group-hover/item:h-5" />

              {category.title}
            </Link>
          ))}
        </div>
      </div>
    </li>
  );
};

export default ProductsDropdown;
