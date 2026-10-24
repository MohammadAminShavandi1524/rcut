"use client";

import { Menu } from "lucide-react";

import { useMobileSidebar } from "@/components/ui/mobile-sidebar";

import Logo from "./Logo";

const MobileHeader = () => {
  const { open, openSidebar } = useMobileSidebar();

  return (
    <div className="w90">
      <div className="flex h-[76px] items-center justify-between gap-4">
        {/* Logo - Right */}
        <Logo variant="mobile" />

        {/* Menu - Left */}
        <button
          type="button"
          onClick={openSidebar}
          aria-label="باز کردن منوی سایت"
          aria-expanded={open}
          aria-controls="mobile-navigation"
          className="border-border text-foreground hover:border-custom-primary hover:text-custom-primary flex size-10 shrink-0 cursor-pointer items-center justify-center rounded-lg border transition-[border-color,color] duration-300 sm:size-11"
        >
          <Menu className="size-5 sm:size-[22px]" strokeWidth={1.7} />
        </button>
      </div>
    </div>
  );
};

export default MobileHeader;
