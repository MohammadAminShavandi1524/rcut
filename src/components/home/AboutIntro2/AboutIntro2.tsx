"use client";

import useAboutIntro2Animation from "./useAboutIntro2Animation";

const AboutIntro2 = () => {
  const sectionRef = useAboutIntro2Animation();

  return (
    <section ref={sectionRef} className="py-28">
      <div className="w90" dir="rtl">
        <div className="grid items-center gap-10 lg:grid-cols-[0.95fr_1.05fr]">
          {/* Brand Statement */}
          <div className="text-right">
            <h2 className="about-brand-title text-6xl leading-[1.25] font-bold xl:text-7xl">
              <span className="block text-foreground">دقت و کیفیت</span>

              <span className="mt-3 block text-custom-primary">
                در هر انتخاب
              </span>
            </h2>

            <div className="about-brand-line bg-custom-primary mt-8 h-[3px] w-40" />

            <p className="about-brand-description mt-6 max-w-sm text-lg leading-9 text-muted-foreground">
              همراه صنعتگران برای تامین ابزارهای دقیق و راهکارهای حرفه‌ای
              ماشین‌کاری
            </p>
          </div>

          {/* Content */}
          <div className="about-content text-right">
            <div className="space-y-7 text-lg leading-10 text-muted-foreground">
              <p>
                آرکات با هدف تامین ابزارهای تخصصی تراشکاری، قالب‌سازی و CNC
                فعالیت خود را آغاز کرده است. ما تلاش می‌کنیم با ارائه محصولات
                باکیفیت از برندهای معتبر، تجربه‌ای مطمئن و حرفه‌ای برای
                صنعتگران، تولیدکنندگان و کارگاه‌های ماشین‌کاری فراهم کنیم.
              </p>

              <p>
                با تکیه بر تجربه، شناخت فنی و توجه به نیاز مشتریان، همواره در
                تلاش هستیم تا علاوه بر عرضه محصولات، در انتخاب ابزار مناسب نیز
                همراه شما باشیم.
              </p>

              <p>
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
