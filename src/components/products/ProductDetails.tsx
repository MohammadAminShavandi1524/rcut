import Image from "next/image";
import Link from "next/link";
import { ChevronLeft } from "lucide-react";

import RelatedProducts from "./RelatedProducts";

import type { ApiProduct, ApiCategory } from "./products.api";

import {
  buildCategoryTree,
  getLiveCategoryPath,
  getLiveLeafIds,
} from "./products-category-tree";

type Props = {
  product: ApiProduct;
  products: ApiProduct[];
  categories: ApiCategory[];
};

const ProductDetails = ({ product, products, categories }: Props) => {
  const categoryTree = buildCategoryTree(categories);

  const categoryPath = getLiveCategoryPath(product.category.id, categoryTree);

  const leafCategory = categoryPath.at(-1);

  const categoryHref = leafCategory
    ? `/products?scope=${leafCategory.id}&categories=${leafCategory.id}`
    : "/products";

  const categoryName = leafCategory?.name ?? product.category.name;

  const parentCategory =
    categoryPath.length > 1
      ? categoryPath[categoryPath.length - 2]
      : leafCategory;

  const relatedCategoryIds = parentCategory
    ? getLiveLeafIds(parentCategory)
    : [product.category.id];

  const relatedProducts = products
    .filter(
      (item) =>
        item.id !== product.id && relatedCategoryIds.includes(item.category.id),
    )
    .sort((a, b) => {
      const aSame = a.category.id === product.category.id;

      const bSame = b.category.id === product.category.id;

      if (aSame !== bSame) {
        return aSame ? -1 : 1;
      }

      return new Date(b.created).getTime() - new Date(a.created).getTime();
    })
    .slice(0, 10);

  return (
    <main dir="rtl" className="bg-background">
      <section className="w90 3xl:px-10 3xl:pb-20 mx-auto py-6 sm:py-8 lg:px-6 lg:pb-14 xl:px-8">
        {/* Breadcrumb */}
        <nav
          aria-label="مسیر صفحه"
          className="ms-1.5 flex flex-wrap items-center gap-x-2 gap-y-3 text-sm"
        >
          <Link
            href="/"
            className="text-muted-foreground hover:text-custom-primary transition-colors"
          >
            آرکات
          </Link>

          <ChevronLeft
            size={15}
            aria-hidden="true"
            className="text-muted-foreground shrink-0"
          />

          <Link
            href="/products"
            className="text-muted-foreground hover:text-custom-primary transition-colors"
          >
            محصولات
          </Link>

          {categoryPath.map((category) => (
            <div key={category.id} className="flex items-center gap-x-2">
              <ChevronLeft
                size={15}
                aria-hidden="true"
                className="text-muted-foreground shrink-0"
              />

              <Link
                href={`/products?scope=${category.id}&categories=${category.id}`}
                className="text-muted-foreground hover:text-custom-primary transition-colors"
              >
                {category.name}
              </Link>
            </div>
          ))}

          <ChevronLeft
            size={15}
            aria-hidden="true"
            className="text-muted-foreground shrink-0"
          />

          <span aria-current="page" className="text-foreground font-medium">
            {product.name}
          </span>
        </nav>

        {/* Product */}
        <article className="border-border 3xl:rounded-3xl mt-6 overflow-hidden rounded-2xl border sm:mt-8">
          <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
            {/* Information — Right */}
            <div className="3xl:p-12 order-2 flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:order-1 lg:p-7 xl:p-9 2xl:p-10">
              {(product.top_seller || product.new) && (
                <div className="mb-5 flex flex-wrap items-center gap-2">
                  {product.top_seller && (
                    <span className="bg-custom-primary inline-flex min-h-8 items-center rounded-lg px-3 py-1 text-xs font-medium text-white">
                      پرفروش
                    </span>
                  )}

                  {product.new && (
                    <span className="bg-custom-primary/10 text-custom-primary inline-flex min-h-8 items-center rounded-lg px-3 py-1 text-xs font-medium">
                      جدید
                    </span>
                  )}
                </div>
              )}

              <h1 className="text-foreground 3xl:text-3xl text-xl leading-relaxed font-bold sm:text-2xl sm:leading-relaxed xl:text-[28px]">
                {product.name}
              </h1>

              <div className="mt-4 flex flex-wrap items-center gap-2 text-sm">
                <span className="text-muted-foreground">دسته‌بندی:</span>

                <Link
                  href={categoryHref}
                  className="text-custom-primary hover:text-foreground font-medium transition-colors"
                >
                  {categoryName}
                </Link>
              </div>

              <div className="mt-8">
                <h2 className="text-foreground text-sm font-semibold">
                  توضیحات محصول
                </h2>

                <p className="text-muted-foreground mt-3 text-sm leading-8 whitespace-pre-line sm:text-base sm:leading-9">
                  {product.description}
                </p>
              </div>

              <div className="border-border mt-10 border-t pt-6">
                <Link
                  href="tel:09192081368"
                  className="border-custom-primary text-custom-primary hover:bg-custom-primary flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 hover:text-white"
                >
                  استعلام قیمت
                </Link>
              </div>
            </div>

            {/* Image — Left */}
            <div className="border-border bg-secondary-bg/40 order-1 flex min-w-0 items-center justify-center border-b p-3 lg:order-2 lg:border-s lg:border-b-0">
              <div className="3xl:max-w-[400px] relative aspect-square w-full max-w-[300px] sm:max-w-[340px] xl:max-w-[360px] 2xl:max-w-[380px]">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  priority
                  sizes="(max-width: 480px) 85vw, (max-width: 1024px) 340px, (max-width: 1280px) 300px, (max-width: 1696px) 380px, 400px"
                  className="object-contain"
                />
              </div>
            </div>
          </div>
        </article>

        {/* Related Products */}
        <RelatedProducts key={product.id} products={relatedProducts} />
      </section>
    </main>
  );
};

export default ProductDetails;
