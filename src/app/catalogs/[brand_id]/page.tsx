import { notFound } from "next/navigation";

import CatalogBrandPage from "@/components/catalogs/CatalogBrandPage";

type Props = {
  params: Promise<{
    brand_id: string;
  }>;
};

const Page = async ({ params }: Props) => {
  const { brand_id } = await params;

  const brandId = Number(brand_id);

  if (!Number.isSafeInteger(brandId) || brandId <= 0) {
    notFound();
  }

  return <CatalogBrandPage brandId={brandId} />;
};

export default Page;
