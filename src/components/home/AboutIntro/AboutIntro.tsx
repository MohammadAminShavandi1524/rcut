"use client";

import useAboutIntroAnimation from "./useAboutIntroAnimation";

const AboutIntro = () => {
  const sectionRef = useAboutIntroAnimation();

  return (
    <section ref={sectionRef} className="py-24">
      <div className="w90" dir="rtl">
        <div className="text-right">
          <h2 className="about-intro-title text-3xl font-bold text-foreground">
            درباره آرکات
          </h2>

          <div className="about-intro-text mt-8 space-y-6 text-lg leading-10 text-muted-foreground">
            <p>
              آرکات با هدف تامین ابزارهای تخصصی تراشکاری، قالب‌سازی و CNC فعالیت
              خود را آغاز کرده است. ما با تمرکز بر نیازهای واقعی صنعت، تلاش
              می‌کنیم مجموعه‌ای کامل از ابزارهای ماشین‌کاری را از برندهای معتبر
              و شناخته‌شده در اختیار صنعتگران، تولیدکنندگان و کارگاه‌های تخصصی
              قرار دهیم.
            </p>

            <p>
              رویکرد ما تنها ارائه محصول نیست؛ بلکه تلاش می‌کنیم با شناخت دقیق
              کاربردها، شرایط تولید و نیازهای فنی مشتریان، در انتخاب ابزار مناسب
              و بهینه‌سازی فرآیند ماشین‌کاری همراه آن‌ها باشیم.
            </p>

            <p>
              با تکیه بر تجربه، دانش فنی و ارتباط با تولیدکنندگان معتبر، آرکات
              به دنبال ایجاد یک مرجع قابل اعتماد برای تامین ابزارهای صنعتی و
              ارائه راهکارهای تخصصی در حوزه تراشکاری، فرزکاری و ماشین‌کاری CNC
              است.
            </p>
          </div>

          <p className="about-intro-slogan mt-8 text-xl font-semibold text-custom-primary">
            آرکات؛ دقت، کیفیت، اعتماد
          </p>
        </div>
      </div>
    </section>
  );
};

export default AboutIntro;
