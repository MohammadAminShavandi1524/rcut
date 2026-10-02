import { notFound } from "next/navigation";

import ProductDetails from "@/components/products/ProductDetails";
import { products } from "@/components/products/products.data";

type Props = {
  params: Promise<{
    product: string;
  }>;
};

export function generateStaticParams() {
  return products.map((product) => ({
    product: product.slug,
  }));
}

const Page = async ({ params }: Props) => {
  const { product: productSlug } = await params;

  const product = products.find((item) => item.slug === productSlug);

  if (!product) {
    notFound();
  }

  return <ProductDetails product={product} />;
};

export default Page;
