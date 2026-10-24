"use client";

import { useEffect, useId, useRef, useState, type KeyboardEvent } from "react";

import Image from "next/image";
import Link from "next/link";

import { LoaderCircle, PackageSearch, Search, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { getLenisInstance } from "@/lib/lenis-instance";

import { products, type Product } from "@/components/products/products.data";

import { getCategoryPath } from "@/components/products/products.categories";

type Props = {
  fullWidth?: boolean;
};

const MAX_RESULTS = 20;
const SEARCH_DEBOUNCE = 400;

const normalizeText = (value: string) =>
  value
    .trim()
    .toLocaleLowerCase("fa")
    .replace(/ي/g, "ی")
    .replace(/ك/g, "ک")
    .replace(/\u200c/g, " ")
    .replace(/\s+/g, " ");

const searchStaticProducts = (query: string): Product[] => {
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) return [];

  const queryWords = normalizedQuery.split(" ");

  return products
    .map((product) => {
      const categoryPath = getCategoryPath(product.categoryId);

      const categoryNames = categoryPath
        .map((category) => category.name)
        .join(" ");

      const normalizedName = normalizeText(product.name);

      const searchableText = normalizeText(
        [
          product.name,
          product.description,
          product.category,
          categoryNames,
        ].join(" "),
      );

      if (!queryWords.every((word) => searchableText.includes(word))) {
        return null;
      }

      const score = normalizedName.includes(normalizedQuery)
        ? normalizedName.startsWith(normalizedQuery)
          ? 3
          : 2
        : 1;

      return { product, score };
    })
    .filter(
      (
        item,
      ): item is {
        product: Product;
        score: number;
      } => item !== null,
    )
    .sort((a, b) => {
      if (a.score !== b.score) return b.score - a.score;

      return (
        new Date(b.product.created).getTime() -
        new Date(a.product.created).getTime()
      );
    })
    .slice(0, MAX_RESULTS)
    .map((item) => item.product);
};

const SearchBar = ({ fullWidth = false }: Props) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const resultsId = useId();

  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);

  const [isFocused, setIsFocused] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  const showPanel =
    Boolean(query.trim()) && isFocused && isOpen && (isLoading || hasSearched);

  /*
   * Live Search - 400ms Debounce
   */
  useEffect(() => {
    const normalizedQuery = query.trim();

    if (!normalizedQuery) {
      setResults([]);
      setIsLoading(false);
      setHasSearched(false);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    setHasSearched(false);

    const timeout = window.setTimeout(() => {
      setResults(searchStaticProducts(normalizedQuery));
      setIsLoading(false);
      setHasSearched(true);
      setIsOpen(true);
    }, SEARCH_DEBOUNCE);

    return () => window.clearTimeout(timeout);
  }, [query]);

  /*
   * Lock page scrolling only while search is focused.
   */
  useEffect(() => {
    if (!isFocused) return;

    const html = document.documentElement;
    const body = document.body;
    const lenis = getLenisInstance();

    const previousHtmlOverflow = html.style.overflow;
    const previousBodyOverflow = body.style.overflow;

    html.style.overflow = "hidden";
    body.style.overflow = "hidden";
    lenis?.stop();

    return () => {
      html.style.overflow = previousHtmlOverflow;
      body.style.overflow = previousBodyOverflow;
      lenis?.start();
    };
  }, [isFocused]);

  /*
   * Close results on outside click.
   */
  useEffect(() => {
    const handlePointerDown = (event: PointerEvent) => {
      if (rootRef.current && !rootRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setIsOpen(false);
        inputRef.current?.blur();
      }
    };

    document.addEventListener("pointerdown", handlePointerDown);

    return () => document.removeEventListener("pointerdown", handlePointerDown);
  }, []);

  const handleKeyDown = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Escape") {
      setIsFocused(false);
      setIsOpen(false);
      inputRef.current?.blur();
    }

    if (event.key === "Enter") {
      event.preventDefault();
    }
  };

  const handleClear = () => {
    setQuery("");
    setResults([]);
    setIsLoading(false);
    setHasSearched(false);
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleResultClick = () => {
    setIsOpen(false);
    setIsFocused(false);
    inputRef.current?.blur();
  };

  return (
    <div
      ref={rootRef}
      dir="rtl"
      className={cn(
        "relative z-[110]",
        fullWidth
          ? "w-full min-w-0"
          : "3xl:w-[290px] w-[185px] xl:w-[230px] 2xl:w-[260px]",
      )}
    >
      {/* Search Input */}
      <div
        className={cn(
          "group border-border bg-secondary-bg relative flex w-full items-center rounded-lg border transition-[border-color,background-color,box-shadow] duration-300",
          "hover:border-border-secondary focus-within:border-custom-primary/60 focus-within:bg-background focus-within:shadow-[0_4px_24px_rgba(199,140,22,0.08)]",
          fullWidth
            ? "h-10 gap-2 px-3"
            : "3xl:h-[42px] h-[36px] gap-1.5 px-2.5 xl:h-[38px] xl:gap-2 xl:px-3 2xl:h-[40px]",
        )}
      >
        <Search
          strokeWidth={1.7}
          className={cn(
            "text-muted-foreground group-focus-within:text-custom-primary shrink-0 transition-colors duration-300",
            fullWidth ? "size-[18px]" : "size-3.5 xl:size-4",
          )}
        />

        <input
          ref={inputRef}
          type="search"
          value={query}
          placeholder="جستجوی محصول..."
          aria-label="جستجوی محصول"
          aria-expanded={showPanel}
          aria-controls={resultsId}
          aria-autocomplete="list"
          role="combobox"
          autoComplete="off"
          spellCheck={false}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => {
            setIsFocused(true);
            if (query.trim()) setIsOpen(true);
          }}
          onKeyDown={handleKeyDown}
          className={cn(
            "font-IRANYekanX text-foreground placeholder:text-muted-foreground h-full min-w-0 flex-1 bg-transparent outline-none",
            "[&::-webkit-search-cancel-button]:hidden",
            fullWidth
              ? "text-[13px] sm:text-sm"
              : "3xl:text-sm text-[11px] xl:text-[12px] 2xl:text-[13px]",
          )}
        />

        {isLoading && query.trim() && (
          <LoaderCircle
            strokeWidth={1.7}
            className={cn(
              "text-custom-primary shrink-0 animate-spin",
              fullWidth ? "size-[18px]" : "size-4",
            )}
          />
        )}

        {!isLoading && query && (
          <button
            type="button"
            onClick={handleClear}
            aria-label="پاک کردن جستجو"
            className="text-muted-foreground hover:text-custom-primary flex size-6 shrink-0 cursor-pointer items-center justify-center rounded-md transition-colors duration-200"
          >
            <X size={15} strokeWidth={1.8} />
          </button>
        )}

        <span className="bg-custom-primary pointer-events-none absolute bottom-0 left-1/2 h-[2px] w-0 -translate-x-1/2 rounded-full transition-all duration-300 group-focus-within:w-1/3" />
      </div>

      {/* Search Results Panel */}
      <div
        id={resultsId}
        className={cn(
          "border-border bg-background absolute top-full z-[110] mt-2 overflow-hidden rounded-xl border shadow-[0_18px_50px_rgba(0,0,0,0.12)]",
          "origin-top transition-[opacity,transform,visibility] duration-200 ease-out",
          fullWidth
            ? "inset-x-0 w-full"
            : "3xl:w-[410px] left-0 w-[min(90vw,310px)] xl:w-[345px] 2xl:w-[375px]",
          showPanel
            ? "visible translate-y-0 opacity-100"
            : "pointer-events-none invisible -translate-y-1.5 opacity-0",
        )}
      >
        {/* Loading */}
        {isLoading && (
          <div
            role="status"
            className={cn(
              "flex items-center justify-center gap-2.5",
              fullWidth ? "min-h-24 px-4 py-5" : "min-h-28 px-5 py-6",
            )}
          >
            <LoaderCircle
              className="text-custom-primary size-5 animate-spin"
              strokeWidth={1.7}
            />

            <span className="text-muted-foreground text-sm">
              در حال جستجوی محصولات...
            </span>
          </div>
        )}

        {/* Results */}
        {!isLoading && hasSearched && results.length > 0 && (
          <>
            <div className="border-border bg-card-secondary flex items-center justify-between border-b px-4 py-3">
              <span className="text-custom-primary text-xs font-semibold">
                محصولات
              </span>

              <span
                dir="ltr"
                className="text-muted-foreground text-xs tabular-nums"
              >
                {results.length.toLocaleString("fa-IR")}
              </span>
            </div>

            <div
              role="listbox"
              aria-label="نتایج جستجوی محصولات"
              data-lenis-prevent
              data-lenis-prevent-wheel
              className={cn(
                "touch-pan-y overflow-y-auto overscroll-y-contain",
                fullWidth
                  ? "max-h-[min(55dvh,440px)]"
                  : "3xl:max-h-[500px] max-h-[min(60dvh,460px)]",
              )}
            >
              {results.map((product) => {
                const categoryPath = getCategoryPath(product.categoryId);

                const categoryName =
                  categoryPath.at(-1)?.name ?? product.category;

                return (
                  <Link
                    key={product.id}
                    href={`/products/${product.slug}`}
                    onClick={handleResultClick}
                    role="option"
                    aria-selected={false}
                    className={cn(
                      "group/result border-border flex min-w-0 items-center border-b last:border-b-0",
                      "hover:bg-custom-primary/[0.045] focus-visible:bg-custom-primary/[0.045] transition-colors duration-200",
                      fullWidth
                        ? "min-h-[82px] gap-3 px-3 py-2.5"
                        : "3xl:gap-3.5 3xl:px-3.5 min-h-[88px] gap-3 px-3 py-3",
                    )}
                  >
                    {/* Square Product Image */}
                    <div
                      className={cn(
                        "bg-card-secondary relative aspect-square shrink-0 overflow-hidden rounded-lg",
                        fullWidth
                          ? "size-[68px] sm:size-[72px]"
                          : "3xl:size-[76px] size-[68px]",
                      )}
                    >
                      {product.image ? (
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          sizes={
                            fullWidth
                              ? "(min-width: 640px) 72px, 68px"
                              : "(min-width: 1696px) 76px, 68px"
                          }
                          className="object-contain"
                        />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <PackageSearch
                            size={25}
                            strokeWidth={1.5}
                            className="text-muted-foreground/60"
                          />
                        </div>
                      )}
                    </div>

                    {/* Product Information */}
                    <div className="min-w-0 flex-1">
                      <span
                        className={cn(
                          "text-foreground group-hover/result:text-custom-primary block truncate font-medium transition-colors duration-200",
                          fullWidth
                            ? "text-[13px] sm:text-sm"
                            : "3xl:text-[15px] text-[12px] xl:text-[13px] 2xl:text-sm",
                        )}
                      >
                        {product.name}
                      </span>

                      <span
                        className={cn(
                          "text-muted-foreground mt-1.5 block truncate",
                          fullWidth
                            ? "text-[11px] sm:text-xs"
                            : "text-[11px] 2xl:text-xs",
                        )}
                      >
                        دسته‌بندی: {categoryName}
                      </span>
                    </div>
                  </Link>
                );
              })}
            </div>
          </>
        )}

        {/* No Results */}
        {!isLoading && hasSearched && results.length === 0 && (
          <div
            className={cn(
              "flex flex-col items-center justify-center text-center",
              fullWidth ? "min-h-[150px] px-5 py-6" : "min-h-[170px] px-6 py-7",
            )}
          >
            <div className="bg-card-secondary flex size-11 items-center justify-center rounded-xl">
              <PackageSearch
                size={23}
                strokeWidth={1.5}
                className="text-muted-foreground"
              />
            </div>

            <span className="text-foreground mt-3 text-sm font-semibold">
              محصولی پیدا نشد
            </span>

            <span className="text-muted-foreground mt-1.5 text-xs leading-6">
              عبارت دیگری رو برای جستجو امتحان کنید.
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
