"use client";

import { useEffect, useRef, useState } from "react";

import { cn } from "@/lib/utils";

import Logo from "./Logo";
import Nav from "./Nav";
import SearchBar from "./SearchBar";

const Header = () => {
  const lastScrollY = useRef(0);

  const [showHeader, setShowHeader] = useState(true);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const SCROLL_THRESHOLD = 80;
    const SCROLL_DELTA = 10;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
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

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <header
      className={cn(
        "bg-background/95 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md",
        "transition-transform duration-500 ease-out",
        showHeader ? "translate-y-0" : "-translate-y-full",
        isScrolled
          ? "border-border shadow-[0_6px_30px_rgba(0,0,0,0.06)]"
          : "border-border",
      )}
    >
      <div className="w90">
        <div className="flex h-[100px] items-center justify-between gap-x-10">
          <div className="shrink-0">
            <Logo />
          </div>

          <div className="flex flex-1 justify-center">
            <Nav />
          </div>

          <div className="shrink-0">
            <SearchBar />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
