import Image from "next/image";
import Link from "next/link";

import type { Product } from "@/components/products/products.data";

type Props = {
  product: Product;
};

const ProductCard = ({ product }: Props) => {
  const productHref = `/products/${product.slug}`;

  return (
    <article
      dir="rtl"
      className="border-border bg-background hover:border-custom-primary flex min-h-[470px] w-full flex-col overflow-hidden rounded-2xl border transition-colors duration-300"
    >
      {/* Image */}
      <Link
        href={productHref}
        draggable={false}
        aria-label={`مشاهده ${product.name}`}
        className="relative block aspect-square shrink-0"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          draggable={false}
          sizes="(max-width: 640px) 90vw, (max-width: 768px) 45vw, (max-width: 1280px) 30vw, (max-width: 1536px) 23vw, 18vw"
          className="object-contain p-6"
        />
      </Link>

      <div className="bg-border h-px shrink-0" />

      {/* Content */}
      <div className="flex flex-1 flex-col p-4 text-right">
        <Link href={productHref} draggable={false} className="block">
          <h3 className="text-foreground min-h-6 text-base font-bold">
            {product.name}
          </h3>

          <p className="text-muted-foreground mt-3 line-clamp-2 min-h-[48px] text-sm leading-6">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto pt-6.5">
          <button
            type="button"
            className="bg-custom-primary w-full cursor-pointer rounded-lg py-2.5 text-[15px] font-semibold text-white transition-colors duration-300"
          >
            استعلام قیمت
          </button>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
