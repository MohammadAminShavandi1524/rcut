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
              {
                title: "خانه",
                href: "/",
              },
              {
                title: "محصولات",
                href: "/products",
              },
              {
                title: "نمایندگی یاماسا",
                href: "/yamasa",
              },
              {
                title: "درباره ما",
                href: "/about-us",
              },
              {
                title: "تماس با ما",
                href: "/contact-us",
              },
              {
                title: "سوالات متداول",
                href: "/faq",
              },
            ]}
          />

          <FooterColumn
            title="دسته‌بندی‌ها"
            items={[
              {
                title: "ابزار تراشکاری",
                href: "/products",
              },
              {
                title: "ابزار فرزکاری",
                href: "/products",
              },
              {
                title: "فرز انگشتی",
                href: "/products/end-mills",
              },
              {
                title: "مته و سوراخکاری",
                href: "/products/drills",
              },
              {
                title: "قلاویز و رزوه‌زنی",
                href: "/products/taps",
              },
            ]}
          />

          <FooterColumn
            title="محصولات منتخب"
            items={[
              {
                title: "اینسرت تراشکاری کارباید",
                href: "/products?product=carbide-turning-insert",
              },
              {
                title: "فرز انگشتی کارباید",
                href: "/products?product=carbide-end-mill",
              },
              {
                title: "مته صنعتی",
                href: "/products?product=industrial-drill",
              },
              {
                title: "هلدر تراشکاری",
                href: "/products?product=turning-holder",
              },
              {
                title: "ابزارگیر CNC",
                href: "/products?product=cnc-tool-holder",
              },
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
