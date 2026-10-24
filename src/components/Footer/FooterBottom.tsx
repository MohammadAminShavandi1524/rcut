import Link from "next/link";

import FooterSocials from "./FooterSocials";

const FooterBottom = () => {
  return (
    <div className="border-footer-border border-t">
      <div
        className="w90 3xl:gap-x-0 flex flex-col items-center justify-center gap-y-5 py-6 sm:gap-y-6 sm:py-7 lg:flex-row lg:justify-between lg:gap-x-4 lg:gap-y-0 lg:py-5"
        dir="rtl"
      >
        {/* Copyright */}
        <p className="text-footer-muted 3xl:min-w-[350px] 3xl:flex-none order-2 min-w-0 text-center text-xs leading-6 sm:text-sm lg:order-1 lg:flex-1 lg:text-right">
          کلیه حقوق مادی و معنوی این وب‌سایت متعلق به آرکات است.
        </p>

        {/* Socials */}
        <div className="order-1 lg:order-2 lg:shrink-0">
          <FooterSocials />
        </div>

        {/* Developer */}
        <p className="text-footer-muted 3xl:min-w-[350px] 3xl:flex-none order-3 flex min-w-0 flex-wrap items-center justify-center gap-x-1.5 text-center text-xs leading-6 sm:text-sm lg:flex-1 lg:justify-end lg:text-left">
          <span>طراحی و توسعه توسط</span>

          <Link
            href="https://atihooshbonyan.com"
            target="_blank"
            rel="noopener noreferrer"
            dir="ltr"
            className="text-footer-foreground hover:text-custom-primary transition-colors duration-300"
          >
            آتی هوش بنیان
          </Link>
        </p>
      </div>
    </div>
  );
};

export default FooterBottom;
