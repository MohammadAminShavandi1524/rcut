import Link from "next/link";

export function YamasaIntro() {
  return (
    <section className="border-border border-b pb-6 sm:pb-7 md:pb-10">
      <h1 className="mb-4 text-xl leading-8 font-bold sm:mb-5 sm:text-2xl md:mb-8 md:text-4xl md:leading-tight">
        یاماسا (YAMASA) | تخصص در رولربرنیشینگ صنعتی
      </h1>

      <div className="space-y-4 sm:space-y-5">
        <p className="text-muted-foreground text-justify text-sm leading-7 sm:leading-8 md:text-start md:text-base">
          شرکت YAMASA ترکیه از تولیدکنندگان تخصصی تجهیزات و ابزارهای
          رولربرنیشینگ است. ما با افتخار به‌عنوان تنها نمایندگی این برند در
          ایران، با ۱۵ سال سابقه همکاری، تأمین‌کننده ابزارها و تجهیزات تخصصی
          یاماسا برای صنایع کشور هستیم.
        </p>

        <p className="text-muted-foreground text-justify text-sm leading-7 sm:leading-8 md:text-start md:text-base">
          محصولات یاماسا با هدف بهبود کیفیت سطح، افزایش مقاومت قطعات در برابر
          خستگی و دستیابی به دقت بالاتر در فرآیندهای تولید طراحی شده‌اند و در
          صنایع مختلفی از جمله خودروسازی، ماشین‌سازی، نفت و گاز و قطعه‌سازی
          کاربرد دارند.
        </p>

        <p className="text-foreground text-sm leading-7 font-semibold sm:text-base sm:leading-8 md:text-lg">
          ۱۵ سال تجربه، تأمین تخصصی و همراهی با صنعت ایران.
        </p>

        <p className="text-muted-foreground text-justify text-sm leading-7 sm:leading-8 md:text-start md:text-base">
          برای دریافت اطلاعات فنی و مشاوره انتخاب محصولات یاماسا، با ما تماس
          بگیرید.
        </p>

        <div className="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center sm:pt-2">
          <button
            type="button"
            className="bg-custom-primary text-primary-foreground hover:bg-custom-primary/90 inline-flex h-10 cursor-pointer items-center justify-center rounded-lg px-4 text-sm font-medium transition-colors sm:h-11 sm:px-5 md:px-6"
          >
            دانلود کاتالوگ یاماسا
          </button>

          <Link
            href="/contact-us"
            className="border-border text-foreground hover:border-custom-primary inline-flex h-10 items-center justify-center rounded-lg border px-4 text-sm font-medium transition-colors sm:h-11 sm:px-5 md:px-6"
          >
            تماس با ما
          </Link>
        </div>
      </div>
    </section>
  );
}
