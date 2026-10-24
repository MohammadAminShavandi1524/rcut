import Image from "next/image";
import Link from "next/link";

const YAMASA_CATALOG_URL =
  "https://rcut.s3.ir-central1.arvanstorage.ir/yamasa_catalog.pdf?versionId=";

export function YamasaIntro() {
  return (
    <section className="border-border border-b pb-6 sm:pb-7 md:pb-10">
      <div className="3xl:gap-x-20 flex flex-col gap-y-8 lg:flex-row lg:items-center lg:justify-between lg:gap-x-10 xl:gap-x-14 2xl:gap-x-16">
        {/* Content */}
        <div className="3xl:max-w-[950px] min-w-0 flex-1 lg:max-w-[650px] xl:max-w-[750px] 2xl:max-w-[850px]">
          <h1 className="mb-4 text-xl leading-8 font-bold sm:mb-5 sm:text-2xl md:mb-8 md:text-4xl md:leading-tight">
            یاماسا (YAMASA) | تخصص در رولربرنیشینگ صنعتی
          </h1>

          <div className="space-y-4 sm:space-y-5 max-w-[840px]">
            <p className="text-muted-foreground text-justify text-sm leading-7 sm:leading-8  md:text-base">
              شرکت YAMASA ترکیه از تولیدکنندگان تخصصی تجهیزات و ابزارهای
              رولربرنیشینگ است. ما با افتخار به‌عنوان تنها نمایندگی این برند در
              ایران، با ۱۵ سال سابقه همکاری، تأمین‌کننده ابزارها و تجهیزات تخصصی
              یاماسا برای صنایع کشور هستیم.
            </p>

            <p className="text-muted-foreground text-justify text-sm leading-7 sm:leading-8 md:text-base">
              محصولات یاماسا با هدف بهبود کیفیت سطح، افزایش مقاومت قطعات در
              برابر خستگی و دستیابی به دقت بالاتر در فرآیندهای تولید طراحی
              شده‌اند و در صنایع مختلفی از جمله خودروسازی، ماشین‌سازی، نفت و گاز
              و قطعه‌سازی کاربرد دارند.
            </p>

            <p className="text-foreground text-sm leading-7 font-semibold sm:text-base sm:leading-8 md:text-lg">
              ۱۵ سال تجربه، تأمین تخصصی و همراهی با صنعت ایران.
            </p>

            <p className="text-muted-foreground text-justify text-sm leading-7 sm:leading-8 md:text-start md:text-base">
              برای دریافت اطلاعات فنی و مشاوره انتخاب محصولات یاماسا، با ما تماس
              بگیرید.
            </p>

            <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:pt-2">
              {/* Catalog */}
              <a
                href={YAMASA_CATALOG_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-custom-primary text-primary-foreground hover:bg-custom-primary/90 inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors sm:h-11 sm:px-5 md:px-6"
              >
                دانلود کاتالوگ یاماسا
              </a>

              {/* Contact */}
              <Link
                href="/contact-us"
                className="border-border text-foreground hover:border-custom-primary inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors sm:h-11 sm:px-5 md:px-6"
              >
                تماس با ما
              </Link>
            </div>
          </div>
        </div>

        {/* Yamasa Logo */}
        <div className="3xl:w-[450px] me-[5%] flex w-full shrink-0 items-center justify-center lg:w-[280px] xl:w-[340px] 2xl:w-[390px]">
          <div className="aspect-[671/427] w-[230px] sm:w-[280px] md:w-[330px] lg:w-full">
            <Image
              src="/yamasa-logo.webp"
              alt="لوگوی رسمی یاماسا YAMASA"
              width={671}
              height={427}
              priority
              className="size-full object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
