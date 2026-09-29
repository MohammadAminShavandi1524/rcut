import ProductCard from "../FeaturedProducts/ProductCard";

import { newProducts } from "./new-products.data";

const NewProducts = () => {
  return (
    <section className="py-24">
      <div className="w90" dir="rtl">
        {/* Header */}
        <div className="mb-12 flex items-center justify-between">
          <div>
            <h2 className="text-foreground text-4xl font-bold">محصولات جدید</h2>

            <p className="text-muted-foreground mt-3">
              جدیدترین ابزارهای اضافه شده به مجموعه آرکات
            </p>
          </div>

          <button
            type="button"
            className="border-custom-primary text-custom-primary hover:bg-custom-primary cursor-pointer rounded-lg border px-7 py-3 text-sm font-semibold transition-colors duration-300 hover:text-white"
          >
            مشاهده همه محصولات
          </button>
        </div>

        {/* Products Grid */}
        <div className="grid gap-6 grid-cols-5">
          {newProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default NewProducts;
