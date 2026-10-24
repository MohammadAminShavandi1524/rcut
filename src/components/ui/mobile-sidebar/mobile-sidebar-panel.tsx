"use client";

import { motion } from "framer-motion";

import { cn } from "@/lib/utils";

interface MobileSidebarPanelProps {
  children: React.ReactNode;
  width: number | string;
  className?: string;
}

export function MobileSidebarPanel({
  children,
  width,
  className,
}: MobileSidebarPanelProps) {
  return (
    <motion.aside
      initial={{
        x: "100%",
      }}
      animate={{
        x: 0,
      }}
      exit={{
        x: "100%",
      }}
      transition={{
        type: "spring",
        stiffness: 320,
        damping: 30,
      }}
      style={{
        width: typeof width === "number" ? `${width}px` : width,
      }}
      dir="rtl"
      className={cn(
        "bg-background border-border fixed top-0 right-0 z-[9999] flex h-dvh min-h-0 flex-col overflow-hidden border border-l shadow-2xl",
        className,
      )}
    >
      {children}
    </motion.aside>
  );
}
