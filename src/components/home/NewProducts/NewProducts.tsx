import Link from "next/link";

import ProductCard from "../FeaturedProducts/ProductCard";
import { products } from "@/components/products/products.data";

const newProducts = products
  .filter((product) => product.isNew)
  .sort(
    (a, b) => new Date(b.created).getTime() - new Date(a.created).getTime(),
  );

const NewProducts = () => {
  return (
    <section className="py-24">
      <div className="w90 mx-auto" dir="rtl">
        {/* Header */}
        <div className="mb-12 flex flex-wrap items-center justify-between gap-6">
          <div>
            <h2 className="text-foreground text-2xl font-bold sm:text-3xl lg:text-4xl">
              محصولات جدید
            </h2>

            <p className="text-muted-foreground mt-3">
              جدیدترین ابزارهای اضافه شده به مجموعه آرکات
            </p>
          </div>

          <Link
            href="/products?sort=newest"
            className="border-custom-primary text-custom-primary hover:bg-custom-primary inline-flex items-center justify-center rounded-lg border px-7 py-3 text-sm font-semibold transition-colors duration-300 hover:text-white"
          >
            مشاهده همه محصولات
          </Link>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 items-stretch gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-5">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
