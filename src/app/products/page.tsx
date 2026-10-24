import { Suspense } from "react";

import ProductsPage from "@/components/products/ProductsPage";
import { ProductsListSkeleton } from "@/components/products/ProductsSkeleton";

const Page = () => {
  return (
    <Suspense fallback={<ProductsListSkeleton />}>
      <ProductsPage />
    </Suspense>
  );
};

export default Page;