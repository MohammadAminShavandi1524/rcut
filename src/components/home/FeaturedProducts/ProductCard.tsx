import Image from "next/image";
import Link from "next/link";

import type { FeaturedProduct } from "./featured-products.api";

type Props = {
  product: FeaturedProduct;
};

const ProductCard = ({ product }: Props) => {
  const productHref = `/products/${product.id}`;

  return (
    <article
      dir="rtl"
      className="border-border bg-background hover:border-custom-primary flex h-full w-full flex-col overflow-hidden rounded-xl border transition-colors duration-300 sm:rounded-2xl lg:min-h-[430px] xl:min-h-[450px] 2xl:min-h-[470px]"
    >
      {/* Product Image */}
      <Link
        href={productHref}
        draggable={false}
        aria-label={`مشاهده ${product.name}`}
        className="relative block aspect-square w-full shrink-0"
      >
        <Image
          src={product.image}
          alt={product.name}
          fill
          draggable={false}
          sizes="(max-width: 479px) 80vw, (max-width: 639px) 60vw, (max-width: 767px) 45vw, (max-width: 1023px) 30vw, (max-width: 1279px) 30vw, (max-width: 1535px) 23vw, 18vw"
          className="xss:p-4 object-contain p-3.5 sm:p-5 xl:p-6"
        />
      </Link>

      <div className="bg-border h-px shrink-0" />

      {/* Content */}
      <div className="xss:p-4 flex flex-1 flex-col p-3.5 text-right">
        <Link href={productHref} draggable={false} className="block">
          <h3 className="text-foreground min-h-6 text-[14px] leading-6 font-bold sm:text-[15px] lg:text-base">
            {product.name}
          </h3>

          <p className="text-muted-foreground mt-2 line-clamp-2 min-h-[44px] text-[12px] leading-[22px] sm:mt-3 sm:min-h-[48px] sm:text-[13px] sm:leading-6 xl:text-sm">
            {product.description}
          </p>
        </Link>

        <div className="mt-auto pt-5 sm:pt-6 xl:pt-6.5">
          <Link
            href="tel:09192081368"
            className="bg-custom-primary block w-full cursor-pointer rounded-lg py-2.5 text-center text-[13px] font-semibold text-white transition-colors duration-300 sm:text-sm xl:text-[15px]"
          >
            استعلام قیمت
          </Link>
        </div>
      </div>
    </article>
  );
};

export default ProductCard;
