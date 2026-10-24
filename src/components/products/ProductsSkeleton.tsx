const Pulse = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden="true"
    className={`bg-border/50 animate-pulse rounded-lg ${className}`}
  />
);

const BreadcrumbSkeleton = () => (
  <div className="ms-2 flex items-center gap-3">
    <Pulse className="h-4 w-12" />
    <Pulse className="size-3" />
    <Pulse className="h-4 w-20" />
    <Pulse className="size-3" />
    <Pulse className="h-4 w-24" />
  </div>
);

const ProductCardSkeleton = () => (
  <div className="border-border bg-background flex min-h-[390px] sm:min-h-[430px] lg:min-h-[410px] xl:min-h-[450px] 3xl:min-h-[500px] flex-col overflow-hidden rounded-2xl border">
    <div className="relative aspect-square shrink-0 p-6">
      <Pulse className="size-full rounded-xl" />
    </div>

    <div className="bg-border h-px shrink-0" />

    <div className="flex flex-1 flex-col gap-4 p-4">
      <Pulse className="h-5 w-4/5" />
      <Pulse className="h-3 w-full" />
      <Pulse className="h-3 w-11/12" />
      <Pulse className="h-3 w-2/3" />

      <div className="mt-auto pt-6">
        <Pulse className="h-11 w-full" />
      </div>
    </div>
  </div>
);

export const ProductsListSkeleton = () => (
  <main
    dir="rtl"
    className="bg-background min-h-screen"
    role="status"
    aria-label="در حال بارگذاری محصولات"
    aria-busy="true"
  >
    <section className="w90 mx-auto py-6 sm:py-8 lg:px-6 xl:px-8 3xl:px-10">
      <BreadcrumbSkeleton />

      <div className="mt-6 lg:hidden">
        <Pulse className="h-12 w-full rounded-xl" />
      </div>

      <div className="mt-4 grid min-w-0 items-start gap-4 lg:mt-8 lg:grid-cols-[250px_minmax(0,1fr)] lg:gap-5 xl:grid-cols-[270px_minmax(0,1fr)] 3xl:grid-cols-[300px_minmax(0,1fr)]">
        <div className="border-border bg-background hidden overflow-hidden rounded-2xl border lg:sticky lg:top-28 lg:block">
          <div className="flex items-center gap-3 p-6">
            <Pulse className="h-4 w-16" />
            <Pulse className="h-11 w-[180px]" />
          </div>

          <div className="border-border border-t p-6">
            <Pulse className="mb-6 h-5 w-24" />

            <div className="space-y-5">
              {Array.from({ length: 6 }).map((_, index) => (
                <div key={index} className="flex items-center gap-3">
                  <Pulse className="size-[17px] shrink-0 rounded" />
                  <Pulse
                    className={`h-4 ${
                      index % 2 === 0 ? "w-32" : "w-24"
                    }`}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="border-border flex items-center justify-between border-t p-6">
            <Pulse className="h-4 w-32" />
            <Pulse className="h-6 w-12 rounded-full" />
          </div>
        </div>

        <div className="grid min-w-0 grid-cols-1 gap-x-4 gap-y-4 sm:grid-cols-2 mlg:grid-cols-3 lg:grid-cols-2 xl:grid-cols-3 3xl:grid-cols-4 3xl:gap-x-5">
          {Array.from({ length: 8 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  </main>
);

export const ProductDetailsSkeleton = () => (
  <main
    dir="rtl"
    className="bg-background min-h-screen"
    role="status"
    aria-label="در حال بارگذاری محصول"
    aria-busy="true"
  >
    <section className="w90 mx-auto py-6 sm:py-8 lg:px-6 lg:pb-14 xl:px-8 3xl:px-10 3xl:pb-20">
      <BreadcrumbSkeleton />

      <div className="border-border mt-6 overflow-hidden rounded-2xl border sm:mt-8 3xl:rounded-3xl">
        <div className="grid lg:grid-cols-[minmax(0,1.1fr)_minmax(0,0.9fr)]">
          <div className="order-2 flex min-w-0 flex-col justify-center p-5 sm:p-8 lg:order-1 lg:p-7 xl:p-9 2xl:p-10 3xl:p-12">
            <Pulse className="h-8 w-4/5 sm:h-9" />

            <div className="mt-6 flex items-center gap-3">
              <Pulse className="h-4 w-20" />
              <Pulse className="h-4 w-28" />
            </div>

            <div className="mt-10">
              <Pulse className="h-5 w-36" />

              <div className="mt-5 space-y-5">
                <Pulse className="h-4 w-full" />
                <Pulse className="h-4 w-11/12" />
                <Pulse className="h-4 w-full" />
                <Pulse className="h-4 w-3/4" />
              </div>
            </div>

            <div className="border-border mt-10 border-t pt-6">
              <Pulse className="h-11 w-full" />
            </div>
          </div>

          <div className="border-border bg-secondary-bg/40 order-1 flex min-w-0 items-center justify-center border-b p-3 lg:order-2 lg:border-s lg:border-b-0">
            <div className="aspect-square w-full max-w-[300px] p-5 sm:max-w-[340px] xl:max-w-[360px] 2xl:max-w-[380px] 3xl:max-w-[400px] 3xl:p-6">
              <Pulse className="size-full rounded-2xl" />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-14 sm:mt-18 lg:mt-20 3xl:mt-30">
        <Pulse className="mb-8 h-8 w-40" />

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4 3xl:grid-cols-5">
          {Array.from({ length: 5 }).map((_, index) => (
            <ProductCardSkeleton key={index} />
          ))}
        </div>
      </div>
    </section>
  </main>
);