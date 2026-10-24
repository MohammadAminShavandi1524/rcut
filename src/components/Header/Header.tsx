"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import Logo from "./Logo";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import MobileHeader from "./MobileHeader";

type MobileHeaderMode = "full" | "compact" | "hidden";

const Header = () => {
  const lastScrollY = useRef(0);

  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  const [mobileMode, setMobileMode] = useState<MobileHeaderMode>("full");

  useEffect(() => {
    const SCROLL_THRESHOLD = 80;
    const SCROLL_DELTA = 10;

    const syncInitialPosition = () => {
      const currentScrollY = window.scrollY;

      lastScrollY.current = currentScrollY;

      setIsScrolled(currentScrollY > 10);
      setShowHeader(true);

      setMobileMode(currentScrollY <= SCROLL_THRESHOLD ? "full" : "compact");
    };

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const difference = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 10);

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setShowHeader(true);
        setMobileMode("full");
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(difference) < SCROLL_DELTA) return;

      const scrollingUp = difference < 0;

      setShowHeader(scrollingUp);
      setMobileMode(scrollingUp ? "compact" : "hidden");

      lastScrollY.current = currentScrollY;
    };

    syncInitialPosition();

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    window.addEventListener("resize", syncInitialPosition);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", syncInitialPosition);
    };
  }, []);

  return (
    <header
      className={cn(
        "bg-background/95 fixed inset-x-0 top-0 z-[100] border-b backdrop-blur-md",
        "transition-transform duration-500 ease-out",
        mobileMode === "hidden" ? "-translate-y-full" : "translate-y-0",
        showHeader ? "lg:translate-y-0" : "lg:-translate-y-full",
        isScrolled
          ? "border-border shadow-[0_6px_30px_rgba(0,0,0,0.06)]"
          : "border-border",
      )}
    >
      {/* Mobile / Tablet */}
      <div className="lg:hidden">
        <MobileHeader />

        {/* Search Row */}
        <div
          aria-hidden={mobileMode !== "full"}
          className={cn(
            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
            mobileMode === "full"
              ? "grid-rows-[1fr] overflow-visible opacity-100"
              : "pointer-events-none grid-rows-[0fr] opacity-0",
          )}
        >
          <div
            className={cn(
              "min-h-0",
              mobileMode === "full" ? "overflow-visible" : "overflow-hidden",
            )}
            inert={mobileMode !== "full"}
          >
            <div className="w90 py-3">
              <SearchBar fullWidth />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop */}
      <div className="hidden lg:block">
        <div className="w90">
          <div className="3xl:h-[100px] 3xl:gap-x-10 flex h-[72px] items-center justify-between gap-x-3 xl:h-[80px] xl:gap-x-5 2xl:h-[90px] 2xl:gap-x-7">
            <div className="shrink-0">
              <Logo variant="desktop" />
            </div>

            <div className="flex min-w-0 flex-1 justify-center">
              <Nav />
            </div>

            <div className="shrink-0">
              <SearchBar />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
