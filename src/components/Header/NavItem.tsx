"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { cn } from "@/lib/utils";

type NavItemProps = {
  label: string;
  href: string;
};

const NavItem = ({ label, href }: NavItemProps) => {
  const pathname = usePathname();

  const isActive =
    pathname === href || (href !== "/" && pathname.startsWith(`${href}/`));

  return (
    <li className="shrink-0">
      <Link
        href={href}
        className={cn(
          "relative block py-2.5 text-[17px] font-medium whitespace-nowrap transition-colors duration-300",
          "text-foreground/75 hover:text-custom-primary",
          "after:bg-custom-primary after:absolute after:right-0 after:-bottom-[1px] after:h-[2px] after:w-0 after:transition-all after:duration-300",
          "hover:after:w-full",
          isActive && "text-custom-primary after:w-full",
        )}
      >
        {label}
      </Link>
    </li>
  );
};

export default NavItem;
