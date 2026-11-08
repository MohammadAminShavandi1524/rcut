"use client";

import { useCallback, useEffect, useId, useRef, useState } from "react";

import { createPortal } from "react-dom";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";

import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";

import type { CategoryNode } from "@/components/products/products.categories";

interface ApiCategory {
  id: number;
  name: string;
  index: number;
  child_count: number;
  parent: {
    id: number;
    name: string;
  } | null;
  created: string;
}

type MenuPanel = {
  id: number;
  items: CategoryNode[];
  left: number;
  top: number;
  width: number;
  maxHeight: number;
  side: "left" | "right";
};

const MENU_GAP = 6;
const VIEWPORT_GAP = 8;
const MAX_MENU_HEIGHT = 560;
const ITEM_HEIGHT = 44;
const MENU_PADDING = 16;
const CLOSE_DELAY = 180;

function buildCategoryTree(categories: ApiCategory[]): CategoryNode[] {
  const nodes = new Map<number, CategoryNode>();

  const sortedCategories = [...categories].sort((a, b) => a.index - b.index);

  for (const category of sortedCategories) {
    nodes.set(category.id, {
      id: category.id,
      name: category.name,
      slug: category.name === "برند یاماسا" ? "yamasa" : undefined,
      children: [],
    });
  }

  const roots: CategoryNode[] = [];

  for (const category of sortedCategories) {
    const node = nodes.get(category.id)!;

    const parent = category.parent ? nodes.get(category.parent.id) : undefined;

    if (parent) {
      parent.children!.push(node);
    } else {
      roots.push(node);
    }
  }

  return roots;
}

function getCategoryHref(category: CategoryNode) {
  if (category.slug === "yamasa") {
    return "/yamasa";
  }

  return `/products?scope=${category.id}&categories=${category.id}`;
}

function getPanelHeight(itemCount: number, maxHeight: number) {
  return Math.min(itemCount * ITEM_HEIGHT + MENU_PADDING, maxHeight);
}

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(value, max));
}

/*
 * Calculate each panel's width based on its own longest label.
 */
function getPanelWidth(items: CategoryNode[], referenceElement: HTMLElement) {
  const styles = window.getComputedStyle(referenceElement);

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  if (!context) {
    return Math.min(220, window.innerWidth - VIEWPORT_GAP * 2);
  }

  context.font = [
    styles.fontStyle,
    styles.fontWeight,
    styles.fontSize,
    styles.fontFamily,
  ].join(" ");

  let longestTextWidth = 0;

  for (const item of items) {
    longestTextWidth = Math.max(
      longestTextWidth,
      context.measureText(item.name).width,
    );
  }

  const hasChildren = items.some((item) => Boolean(item.children?.length));

  // Right item padding: 8px
  // Left item padding: 12px
  // Panel padding: 8px each side
  // Scrollbar allowance: 12px
  const horizontalSpacing = 8 + 12 + 16 + 12 + 2;

  const chevronSpacing = hasChildren ? 16 + 8 : 0;

  const naturalWidth = Math.ceil(
    longestTextWidth + horizontalSpacing + chevronSpacing + 8,
  );

  return clamp(naturalWidth, 120, window.innerWidth - VIEWPORT_GAP * 2);
}

const ProductsDropdown = () => {
  const pathname = usePathname();
  const menuId = useId();

  const triggerRef = useRef<HTMLLIElement>(null);

  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const [categories, setCategories] = useState<CategoryNode[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState(false);

  const [rootPanel, setRootPanel] = useState<MenuPanel | null>(null);

  const [childPanels, setChildPanels] = useState<MenuPanel[]>([]);

  const isActive = pathname.startsWith("/products");

  const categoriesReady = !loading && !loadError && categories.length > 0;

  const clearCloseTimer = useCallback(() => {
    if (closeTimerRef.current !== null) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
  }, []);

  const closeMenu = useCallback(() => {
    clearCloseTimer();

    setIsOpen(false);
    setRootPanel(null);
    setChildPanels([]);
  }, [clearCloseTimer]);

  const scheduleClose = useCallback(() => {
    clearCloseTimer();

    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setRootPanel(null);
      setChildPanels([]);
      closeTimerRef.current = null;
    }, CLOSE_DELAY);
  }, [clearCloseTimer]);

  useEffect(() => {
    setMounted(true);

    return () => {
      clearCloseTimer();
    };
  }, [clearCloseTimer]);

  /*
   * Fetch categories from the existing API.
   */
  useEffect(() => {
    let active = true;

    const fetchCategories = async () => {
      try {
        const response = await fetch("/api/categories", {
          cache: "no-store",
        });

        if (!response.ok) {
          throw new Error("دریافت دسته بندی‌ها ناموفق بود.");
        }

        const data: ApiCategory[] = await response.json();

        if (!Array.isArray(data)) {
          throw new Error("ساختار اطلاعات دسته بندی‌ها نامعتبر است.");
        }

        if (active) {
          setCategories(buildCategoryTree(data));
          setLoadError(false);
        }
      } catch (error) {
        console.error("GET CATEGORIES ERROR:", error);

        if (active) {
          setLoadError(true);
          setCategories([]);
        }
      } finally {
        if (active) {
          setLoading(false);
        }
      }
    };

    void fetchCategories();

    return () => {
      active = false;
    };
  }, []);

  /*
   * Root menu:
   * Width determined by the longest root category.
   */
  const openRootMenu = useCallback(() => {
    if (!categoriesReady || !triggerRef.current) {
      return;
    }

    clearCloseTimer();

    const rect = triggerRef.current.getBoundingClientRect();

    const width = getPanelWidth(categories, triggerRef.current);

    const left = clamp(
      rect.right - width,
      VIEWPORT_GAP,
      window.innerWidth - width - VIEWPORT_GAP,
    );

    const preferredTop = rect.bottom + MENU_GAP;

    const top = clamp(
      preferredTop,
      VIEWPORT_GAP,
      window.innerHeight - VIEWPORT_GAP - 60,
    );

    const maxHeight = Math.max(
      44,
      Math.min(MAX_MENU_HEIGHT, window.innerHeight - top - VIEWPORT_GAP),
    );

    setRootPanel({
      id: 0,
      items: categories,
      left,
      top,
      width,
      maxHeight,
      side: "left",
    });

    setChildPanels([]);
    setIsOpen(true);
  }, [categories, categoriesReady, clearCloseTimer]);

  /*
   * Child menu:
   * Each level calculates its own width.
   */
  const openChildMenu = useCallback(
    (category: CategoryNode, level: number, element: HTMLAnchorElement) => {
      clearCloseTimer();

      if (!category.children?.length) {
        setChildPanels((previous) =>
          previous.length > level ? previous.slice(0, level) : previous,
        );

        return;
      }

      const rect = element.getBoundingClientRect();

      const width = getPanelWidth(category.children, element);

      const leftSpace = rect.left - VIEWPORT_GAP;

      const rightSpace = window.innerWidth - rect.right - VIEWPORT_GAP;

      const side: "left" | "right" =
        leftSpace >= width + MENU_GAP || leftSpace >= rightSpace
          ? "left"
          : "right";

      const preferredLeft =
        side === "left" ? rect.left - width - MENU_GAP : rect.right + MENU_GAP;

      const left = clamp(
        preferredLeft,
        VIEWPORT_GAP,
        window.innerWidth - width - VIEWPORT_GAP,
      );

      const maxHeight = Math.max(
        44,
        Math.min(MAX_MENU_HEIGHT, window.innerHeight - VIEWPORT_GAP * 2),
      );

      const panelHeight = getPanelHeight(category.children.length, maxHeight);

      const top = clamp(
        rect.top,
        VIEWPORT_GAP,
        window.innerHeight - panelHeight - VIEWPORT_GAP,
      );

      const nextPanel: MenuPanel = {
        id: category.id,
        items: category.children,
        left,
        top,
        width,
        maxHeight,
        side,
      };

      setChildPanels((previous) => {
        const current = previous[level];

        if (
          current?.id === nextPanel.id &&
          current.left === nextPanel.left &&
          current.top === nextPanel.top &&
          current.width === nextPanel.width &&
          current.maxHeight === nextPanel.maxHeight
        ) {
          return previous;
        }

        return [...previous.slice(0, level), nextPanel];
      });
    },
    [clearCloseTimer],
  );

  /*
   * Close menu when pathname changes.
   */
  useEffect(() => {
    closeMenu();
  }, [pathname, closeMenu]);

  /*
   * Keyboard, outside click, resize and scroll behavior.
   */
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeMenu();

        triggerRef.current?.querySelector("a")?.focus();
      }
    };

    const handlePointerDown = (event: PointerEvent) => {
      const target = event.target;

      if (!(target instanceof Element)) {
        closeMenu();
        return;
      }

      if (
        triggerRef.current?.contains(target) ||
        target.closest("[data-products-menu-panel]")
      ) {
        return;
      }

      closeMenu();
    };

    const handleResize = () => {
      closeMenu();
    };

    const handleWindowScroll = () => {
      closeMenu();
    };

    document.addEventListener("keydown", handleKeyDown);

    document.addEventListener("pointerdown", handlePointerDown);

    window.addEventListener("resize", handleResize);

    window.addEventListener("scroll", handleWindowScroll, { passive: true });

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      document.removeEventListener("pointerdown", handlePointerDown);

      window.removeEventListener("resize", handleResize);

      window.removeEventListener("scroll", handleWindowScroll);
    };
  }, [isOpen, closeMenu]);

  /*
   * Render one independently scrollable panel.
   */
  const renderPanel = (panel: MenuPanel, level: number) => {
    const height = getPanelHeight(panel.items.length, panel.maxHeight);

    return (
      <div
        key={`${level}-${panel.id}`}
        data-products-menu-panel
        dir="rtl"
        onMouseEnter={clearCloseTimer}
        onMouseLeave={scheduleClose}
        style={{
          position: "fixed",
          left: panel.left,
          top: panel.top,
          width: panel.width,
          height,
          zIndex: 200 + level,
        }}
        className={cn(
          "bg-background border-border",
          "rounded-xl border",
          "shadow-[0_12px_36px_rgba(0,0,0,0.12)]",
        )}
      >
        <ScrollArea
          type="auto"
          lockWheel
          data-lenis-prevent
          data-lenis-prevent-wheel
          className="h-full w-full overflow-hidden rounded-xl"
          viewportClassName="h-full w-full"
          scrollBarClassName="w-2"
          onScrollCapture={() => {
            setChildPanels((previous) =>
              previous.length > level ? previous.slice(0, level) : previous,
            );
          }}
        >
          <div className="space-y-0.5 p-2">
            {panel.items.map((category) => {
              const hasChildren = Boolean(category.children?.length);

              const openedChild = childPanels[level];

              const isSelected = hasChildren && openedChild?.id === category.id;

              const href = getCategoryHref(category);

              return (
                <Link
                  key={category.id}
                  href={href}
                 
                  aria-haspopup={hasChildren ? "menu" : undefined}
                  aria-expanded={hasChildren ? isSelected : undefined}
                  onMouseEnter={(event) =>
                    openChildMenu(category, level, event.currentTarget)
                  }
                  onFocus={(event) =>
                    openChildMenu(category, level, event.currentTarget)
                  }
                  onClick={closeMenu}
                  className={cn(
                    "group/item relative flex h-[42px]",
                    "w-full min-w-0 items-center gap-2",
                    "rounded-lg pr-2 pl-3",
                    "text-right text-[13px]",
                    "transition-colors duration-150",
                    "text-foreground/80",
                    "hover:bg-secondary",
                    "hover:text-custom-primary",
                    "focus-visible:bg-secondary",
                    "focus-visible:text-custom-primary",
                    "focus-visible:outline-none",
                    isSelected && "bg-secondary text-custom-primary",
                  )}
                >
                  <span
                    className={cn(
                      "bg-custom-primary absolute right-0",
                      "h-0 w-[2px] rounded-full",
                      "transition-all duration-150",
                      "group-hover/item:h-5",
                      "group-focus-visible/item:h-5",
                      isSelected && "h-5",
                    )}
                  />

                  <span className="min-w-0 flex-1 truncate text-right">
                    {category.name}
                  </span>

                  {hasChildren &&
                    (isSelected && openedChild?.side === "right" ? (
                      <ChevronRight
                        className="text-custom-primary size-4 shrink-0"
                        strokeWidth={1.8}
                      />
                    ) : (
                      <ChevronLeft
                        className={cn(
                          "size-4 shrink-0",
                          isSelected && "text-custom-primary",
                        )}
                        strokeWidth={1.8}
                      />
                    ))}
                </Link>
              );
            })}
          </div>
        </ScrollArea>
      </div>
    );
  };

  return (
    <li
      ref={triggerRef}
      className="relative shrink-0"
      onMouseEnter={openRootMenu}
      onMouseLeave={scheduleClose}
      onFocusCapture={openRootMenu}
    >
      <Link
        href="/products"
        aria-expanded={categoriesReady ? isOpen : undefined}
        aria-controls={categoriesReady ? menuId : undefined}
        onClick={closeMenu}
        className={cn(
          "3xl:text-[17px] flex items-center gap-1.5",
          "py-2.5 text-[13px] font-medium",
          "transition-colors xl:text-[14px]",
          "2xl:text-[15px]",
          "text-foreground/80",
          "hover:text-custom-primary",
          isActive && "text-custom-primary",
        )}
      >
        محصولات
        <ChevronDown
          className={cn(
            "size-4.5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </Link>

      {mounted &&
        isOpen &&
        rootPanel &&
        createPortal(
          <div id={menuId}>
            {renderPanel(rootPanel, 0)}

            {childPanels.map((panel, index) => renderPanel(panel, index + 1))}
          </div>,
          document.body,
        )}
    </li>
  );
};

export default ProductsDropdown;
