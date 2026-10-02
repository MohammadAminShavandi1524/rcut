import Image from "next/image";
import Link from "next/link";

import type { Product } from "./products.data";

type Props = {
  product: Product;
  showCategory?: boolean;
};

const ProductCard = ({ product, showCategory = true }: Props) => {
  return (
    <article
      dir="rtl"
      className="group border-border bg-background hover:border-custom-primary flex h-full min-h-[500px] flex-col overflow-hidden rounded-2xl border transition-colors duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square shrink-0 overflow-hidden">
        <Link
          href={`/products/${product.slug}`}
          className="absolute inset-0 z-0"
          aria-label={`مشاهده ${product.name}`}
        >
          <Image
            src={product.image}
            alt={product.name}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
            className="object-contain p-6 transition-transform duration-500 group-hover:scale-[1.03]"
          />

          {/* Tags */}
          {(product.isBestSeller || product.isNew) && (
            <div className="pointer-events-none absolute start-4 top-4">
              {product.isBestSeller ? (
                <span className="bg-custom-primary rounded-md px-3 py-1.5 text-xs font-medium text-white">
                  پرفروش
                </span>
              ) : (
                <span className="border-custom-primary bg-background text-custom-primary rounded-md border px-3 py-1.5 text-xs font-medium">
                  جدید
                </span>
              )}
            </div>
          )}
        </Link>
      </div>

      <div className="bg-border h-px shrink-0" />

      {/* Content */}
      <div className="grid flex-1 grid-rows-[1fr_auto] gap-5 p-4">
        {/* Product Info */}
        <Link href={`/products/${product.slug}`} className="block min-h-0">
          {/* {showCategory && (
            <span className="text-muted-foreground text-xs">
              {product.category}
            </span>
          )} */}

          <h3
            className={`text-foreground text-base font-bold ${
              showCategory ? "mt-2" : ""
            }`}
          >
            {product.name}
          </h3>

          <p className="text-muted-foreground mt-3 pe-2 text-justify text-sm leading-7">
            {product.description}
          </p>
        </Link>

        {/* Price Inquiry */}
        <button
          type="button"
          className="border-custom-primary text-custom-primary hover:bg-custom-primary flex min-h-11 w-full cursor-pointer items-center justify-center rounded-lg border px-4 py-2.5 text-sm font-semibold transition-colors duration-300 hover:text-white"
        >
          استعلام قیمت
        </button>
      </div>
    </article>
  );
};

export default ProductCard;
