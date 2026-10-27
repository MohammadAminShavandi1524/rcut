import { notFound } from "next/navigation";

import ProductDetails from "@/components/products/ProductDetails";

import type {
  ApiProduct,
  ApiCategory,
} from "@/components/products/products.api";

type Props = {
  params: Promise<{
    product: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { product: productIdParam } = await params;

  const productId = Number(productIdParam);

  if (!Number.isSafeInteger(productId) || productId <= 0) {
    notFound();
  }

  const [productResponse, productsResponse, categoriesResponse] =
    await Promise.all([
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/product/${productId}`, {
        cache: "no-store",
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/product`, {
        cache: "no-store",
      }),
      fetch(`${process.env.NEXT_PUBLIC_API_URL}/shop/category`, {
        cache: "no-store",
      }),
    ]);

  if (productResponse.status === 404) {
    notFound();
  }

  if (!productResponse.ok || !productsResponse.ok || !categoriesResponse.ok) {
    throw new Error("دریافت اطلاعات محصول ناموفق بود.");
  }

  const [product, products, categories] = (await Promise.all([
    productResponse.json(),
    productsResponse.json(),
    categoriesResponse.json(),
  ])) as [ApiProduct, ApiProduct[], ApiCategory[]];

  return (
    <ProductDetails
      product={product}
      products={products}
      categories={categories}
    />
  );
};

export default Page;
