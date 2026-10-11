const technologies = [
  {
    title: "Roller Burnishing",
    subtitle: "پرداخت غلتکی سطح",
    description:
      "فناوری پرداخت غلتکی برای صاف‌تر و صیقلی‌تر کردن سطوح فلزی. در این فرایند، غلتک‌ها با فشار کنترل‌شده روی سطح قطعه حرکت می‌کنند و ناهمواری‌های سطح را کاهش می‌دهند.",
  },
  {
    title: "Skive-Burnishing",
    subtitle: "ماشین‌کاری و پرداخت دقیق",
    description:
      "ابزارهای تخصصی یاماسا برای فرایند Skive-Burnishing؛ مناسب کاربردهای صنعتی دقیق که کیفیت سطح و دقت نهایی قطعه اهمیت بالایی دارد.",
  },
  {
    title: "Deep Rolling",
    subtitle: "غلتش عمیق",
    description:
      "ابزارهای تخصصی غلتش عمیق برای بهبود ویژگی‌های سطحی قطعات فلزی در فرایندهای مهندسی و تولید صنعتی.",
  },
];

export function YamasaTechnologies() {
  return (
    <section aria-labelledby="yamasa-technologies">
      <div className="mb-7 flex flex-col gap-2 sm:mb-8">
        <h2 id="yamasa-technologies" className="text-2xl font-bold md:text-3xl">
          فناوری‌های تخصصی یاماسا
        </h2>

        <p className="text-muted-foreground max-w-2xl text-sm leading-7 md:text-base">
          یاماسا در زمینه طراحی و تولید ابزارهای تخصصی پرداخت و بهبود سطح قطعات
          فلزی فعالیت می‌کند.
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
        {technologies.map((technology) => (
          <article
            key={technology.title}
            className="group border-border bg-card hover:border-custom-primary flex h-full min-w-0 flex-col rounded-xl border p-5 transition-colors duration-200 md:p-6"
          >
            <div className="mb-3">
              <p className="text-custom-primary mt-2 text-lg font-medium">
                {technology.subtitle}
              </p>
            </div>

            <p className="text-muted-foreground text-sm leading-7 md:text-base md:leading-9">
              {technology.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}