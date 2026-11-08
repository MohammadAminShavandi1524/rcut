"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import Logo from "./Logo";
import Nav from "./Nav";
import SearchBar from "./SearchBar";
import MobileHeader from "./MobileHeader";
import MobileBottomNav from "./MobileBottomNav";

const Header = () => {
  const lastScrollY = useRef(0);

  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 80;
    const SCROLL_DELTA = 10;

    const syncInitialPosition = () => {
      const currentScrollY = Math.max(0, window.scrollY);

      lastScrollY.current = currentScrollY;
      setIsScrolled(currentScrollY > 10);
      setShowHeader(true);
    };

    const handleScroll = () => {
      const currentScrollY = Math.max(0, window.scrollY);
      const difference = currentScrollY - lastScrollY.current;

      setIsScrolled(currentScrollY > 10);

      if (currentScrollY <= SCROLL_THRESHOLD) {
        setShowHeader(true);
        lastScrollY.current = currentScrollY;
        return;
      }

      if (Math.abs(difference) < SCROLL_DELTA) return;

      setShowHeader(difference < 0);

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
    <>
      {/* Mobile / Tablet Header - Normal Document Flow */}
      <header
        className={cn(
          "bg-background/95 border-border relative z-[90]",
          "border-b lg:hidden",
        )}
      >
        <MobileHeader />

        <div className="w90 py-3">
          <SearchBar fullWidth />
        </div>
      </header>

      {/* Desktop Header - Fixed, Same Scroll Behavior */}
      <header
        className={cn(
          "bg-background/95 fixed inset-x-0 top-0 z-[100]",
          "hidden border-b backdrop-blur-md lg:block",
          "transition-transform duration-500 ease-out",
          showHeader ? "translate-y-0" : "-translate-y-full",
          isScrolled
            ? "border-border shadow-[0_6px_30px_rgba(0,0,0,0.06)]"
            : "border-border",
        )}
      >
        <div className="w90">
          <div
            className={cn(
              "flex h-[72px] items-center justify-between gap-x-3",
              "xl:h-[80px] xl:gap-x-5",
              "2xl:h-[90px] 2xl:gap-x-7",
              "3xl:h-[100px] 3xl:gap-x-10",
            )}
          >
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
      </header>

      {/* Fixed Bottom Navigation - Mobile / Tablet */}
      <MobileBottomNav />
    </>
  );
};

export default Header;
