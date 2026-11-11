import type { Metadata } from "next";

import CatalogsPage from "@/components/catalogs/CatalogsPage";

export const metadata: Metadata = {
  title: "کاتالوگ محصولات و برندها",
  description:
    "مشاهده برندهای صنعتی آرکات، آشنایی با محصولات تخصصی و دسترسی به کاتالوگ‌های فنی و اطلاعات محصولات هر برند.",
};

const Page = () => {
  return <CatalogsPage />;
};

export default Page;
