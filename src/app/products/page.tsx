import { Suspense } from "react";

import ProductsPage from "@/components/products/ProductsPage";

const Page = () => {
  return (
    <Suspense fallback={null}>
      <ProductsPage />
    </Suspense>
  );
};

export default Page;
