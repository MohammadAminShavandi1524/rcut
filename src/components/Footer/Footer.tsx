import FooterColumn from "./FooterColumn";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-footer-foreground" dir="rtl">
      <div className="w90 py-20">
        <div className="grid gap-12 md:grid-cols-2 lg:grid-cols-4">
          <FooterColumn
            title="دسترسی سریع"
            items={[
              "خانه",
              "محصولات",
              "درباره ما",
              "تماس با ما",
              "سوالات متداول",
            ]}
          />

          <FooterColumn
            title="دسته‌بندی‌ها"
            items={[
              "ابزار تراشکاری",
              "ابزار فرزکاری",
              "فرز انگشتی",
              "مته و سوراخکاری",
              "قلاویز و رزوه‌زنی",
            ]}
          />

          <FooterColumn
            title="محصولات منتخب"
            items={[
              "اینسرت تراشکاری کارباید",
              "فرز انگشتی کارباید",
              "مته صنعتی",
              "هلدر تراشکاری",
              "ابزارگیر CNC",
            ]}
          />

          <div className="text-right">
            <h3 className="text-footer-foreground text-lg font-bold">
              تماس با ما
            </h3>

            <div className="text-footer-muted mt-6 space-y-3 text-sm leading-7">
              <p dir="ltr">021-66733833</p>

              <p dir="ltr">09192081368</p>

              <p>
                تهران، خیابان امام خمینی،
                <br />
                روبه‌روی بیمارستان سینا،
                <br />
                پاساژ نظام،
                <br />
                طبقه ۲، واحد ۳۰۷
              </p>
            </div>
          </div>
        </div>
      </div>

      <FooterBottom />
    </footer>
  );
};

export default Footer;
