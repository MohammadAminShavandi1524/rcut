import type { ApiCatalog } from "./catalogs.api";

type Props = {
  brandName: string;
  catalogs: ApiCatalog[];
};

const CatalogBrandDetails = ({ brandName, catalogs }: Props) => {
  return (
    <section
      className="mt-14 space-y-14 sm:mt-18 sm:space-y-18 lg:mt-24 lg:space-y-24"
      aria-label={`کاتالوگ‌های ${brandName}`}
    >
      {catalogs.map((catalog) => (
        <article key={catalog.id} className="catalog-detail-section min-w-0">
          {/* Catalog Title And Description */}
          <div className="mb-6 w-full text-right sm:mb-8">
            <h2 className="text-foreground text-[23px] leading-[1.6] font-bold sm:text-[27px] lg:text-[32px]">
              {catalog.title}
            </h2>

            {catalog.description && (
              <p className="text-muted-foreground mt-4 w-full text-justify text-[13px] leading-8 whitespace-pre-line sm:text-sm sm:leading-9 lg:text-base">
                {catalog.description}
              </p>
            )}
          </div>

          {/* Catalog Banner - No Border */}
          {catalog.image && (
            <div className="flex w-full items-center justify-center">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={catalog.image}
                alt={`بنر ${catalog.title}`}
                loading="lazy"
                decoding="async"
                className="block h-auto max-h-[850px] w-auto max-w-full object-contain"
              />
            </div>
          )}
        </article>
      ))}
    </section>
  );
};

export default CatalogBrandDetails;
