"use client";

import useAboutIntro2Animation from "./useAboutIntro2Animation";

const AboutIntro2 = () => {
  const sectionRef = useAboutIntro2Animation();

  return (
    <section
      ref={sectionRef}
      className="py-14 sm:py-18 md:py-20 lg:py-24 xl:py-28"
    >
      <div className="w90" dir="rtl">
        <div className="grid items-center gap-8 sm:gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:gap-10 xl:gap-14">
          {/* Brand Statement */}
          <div className="min-w-0 text-right">
            <h2 className="about-brand-title text-foreground xss:text-[40px] text-[36px] leading-[1.35] font-bold sm:text-5xl md:text-[54px] lg:text-6xl lg:leading-[1.25] xl:text-7xl">
              <span className="block">دقت و کیفیت</span>

              <span className="text-custom-primary mt-2 block sm:mt-3">
                در هر انتخاب
              </span>
            </h2>

            <div className="about-brand-line bg-custom-primary mt-6 h-[3px] w-24 origin-right sm:mt-7 sm:w-32 lg:mt-8 lg:w-40" />

            <p className="about-brand-description text-muted-foreground mt-5 max-w-sm text-[14px] leading-7 sm:mt-6 sm:text-base sm:leading-8 lg:text-lg lg:leading-9">
              همراه صنعتگران برای تامین ابزارهای دقیق و راهکارهای حرفه‌ای
              ماشین‌کاری
            </p>
          </div>

          {/* Content */}
          <div className="about-content min-w-0 text-right">
            <div className="text-muted-foreground space-y-4 text-[14px] leading-8 sm:space-y-5 sm:text-[15px] sm:leading-9 lg:space-y-7 lg:text-lg lg:leading-10">
              <p className="text-justify">
                آرکات با هدف تامین ابزارهای تخصصی تراشکاری، قالب‌سازی و CNC
                فعالیت خود را آغاز کرده است. ما تلاش می‌کنیم با ارائه محصولات
                باکیفیت از برندهای معتبر، تجربه‌ای مطمئن و حرفه‌ای برای
                صنعتگران، تولیدکنندگان و کارگاه‌های ماشین‌کاری فراهم کنیم.
              </p>

              <p className="text-justify">
                با تکیه بر تجربه، شناخت فنی و توجه به نیاز مشتریان، همواره در
                تلاش هستیم تا علاوه بر عرضه محصولات، در انتخاب ابزار مناسب نیز
                همراه شما باشیم.
              </p>

              <p className="text-justify">
                هدف ما تنها فروش ابزار نیست، بلکه ایجاد یک مرجع قابل اعتماد برای
                تامین ابزارهای صنعتی و ارائه اطلاعات تخصصی در این حوزه است.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro2;
