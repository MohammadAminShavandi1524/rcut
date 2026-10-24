import FooterColumn from "./FooterColumn";
import FooterBottom from "./FooterBottom";

const Footer = () => {
  return (
    <footer className="bg-footer-bg text-footer-foreground" dir="rtl">
      <div className="w90 3xl:py-20 py-10 sm:py-12 lg:py-12 xl:py-14 2xl:py-16">
        <div className="3xl:gap-12 grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2 sm:gap-x-8 sm:gap-y-10 lg:grid-cols-4 lg:gap-x-5 xl:gap-x-7 2xl:gap-x-9">
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
                href: "/products?scope=1&categories=1",
              },
              {
                title: "ابزار فرزکاری",
                href: "/products?scope=12&categories=12",
              },
              {
                title: "فرز انگشتی",
                href: "/products?scope=3&categories=3",
              },
              {
                title: "مته و سوراخکاری",
                href: "/products?scope=4&categories=4",
              },
              {
                title: "قلاویز و رزوه‌زنی",
                href: "/products?scope=5&categories=5",
              },
            ]}
          />

          <FooterColumn
            title="محصولات منتخب"
            items={[
              {
                title: "اینسرت تراشکاری کارباید",
                href: "/products/carbide-turning-insert",
              },
              {
                title: "فرز انگشتی کارباید",
                href: "/products/carbide-end-mill",
              },
              {
                title: "مته صنعتی",
                href: "/products/industrial-drill",
              },
              {
                title: "هلدر تراشکاری",
                href: "/products/turning-holder",
              },
              {
                title: "ابزارگیر CNC",
                href: "/products/cnc-tool-holder",
              },
            ]}
          />

          <div className="mt-5 text-right sm:mt-0">
            <h3 className="text-footer-foreground 3xl:text-lg text-base font-bold lg:text-[15px] xl:text-base 2xl:text-[17px]">
              تماس با ما
            </h3>

            <div className="text-footer-muted 3xl:mt-6 mt-4 space-y-3 text-[13px] leading-7 sm:mt-5 sm:text-sm lg:mt-4 lg:text-xs xl:mt-5 xl:text-[13px] 2xl:text-sm">
              <a
                href="tel:02166733833"
                dir="ltr"
                className="hover:text-custom-primary block w-fit transition-colors duration-300"
              >
                021-66733833
              </a>

              <a
                href="tel:09192081368"
                dir="ltr"
                className="hover:text-custom-primary block w-fit transition-colors duration-300"
              >
                09192081368
              </a>

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
