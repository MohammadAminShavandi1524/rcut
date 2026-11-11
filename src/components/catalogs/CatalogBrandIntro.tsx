import Image from "next/image";

import { Download, FileText } from "lucide-react";

import type { CatalogBrand } from "./catalogs.api";

type Props = {
  catalogBrand: CatalogBrand;
};

const CatalogBrandIntro = ({ catalogBrand }: Props) => {
  const { brand, catalogs } = catalogBrand;

  return (
    <section className="catalog-brand-heading border-border mt-6 overflow-hidden rounded-2xl border sm:mt-8">
      <div className="grid min-w-0 gap-6 p-5 sm:p-7 lg:grid-cols-[minmax(0,1fr)_220px] lg:items-center lg:gap-10 lg:p-8 xl:grid-cols-[minmax(0,1fr)_260px] xl:p-10">
        {/* Brand Information */}
        <div className="min-w-0 text-right">
          <h1
            className="text-foreground text-[27px] leading-[1.5] font-bold sm:text-[32px] lg:text-[38px] xl:text-[42px]"
            dir="auto"
          >
            {brand.name}
          </h1>

          {brand.description && (
            <p className="text-muted-foreground mt-4 max-w-4xl text-justify text-[13px] leading-8 sm:text-sm sm:leading-9 lg:text-base">
              {brand.description}
            </p>
          )}

          {/* Download Buttons */}
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
            {catalogs.map((catalog, index) => (
              <a
                key={catalog.id}
                href={catalog.file ?? "#"}
                target="_blank"
                download={`catalog-${catalog.id}.pdf`}
                aria-label={`دانلود ${catalog.title}`}
                className="bg-custom-primary hover:bg-primary inline-flex min-h-11 items-center justify-center gap-2.5 rounded-lg px-5 py-3 text-[13px] font-semibold text-white transition-colors duration-300 sm:text-sm"
              >
                <Download size={17} strokeWidth={1.8} aria-hidden="true" />

                {catalogs.length === 1
                  ? "دانلود کاتالوگ"
                  : `دانلود کاتالوگ ${(index + 1).toLocaleString("fa-IR")}`}
              </a>
            ))}
          </div>
        </div>

        {/* Brand Logo */}
        <div className="border-border bg-secondary-bg/40 relative order-first mx-auto aspect-square w-full max-w-[190px] overflow-hidden rounded-xl border sm:max-w-[220px] lg:order-last lg:max-w-none">
          {brand.image ? (
            <Image
              src={brand.image}
              alt={`لوگوی ${brand.name}`}
              fill
              priority
              sizes="(max-width: 1023px) 220px, 260px"
              className="object-contain p-4 sm:p-5"
            />
          ) : (
            <div className="flex h-full items-center justify-center">
              <FileText
                size={45}
                className="text-muted-foreground"
                strokeWidth={1.2}
              />
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CatalogBrandIntro;
