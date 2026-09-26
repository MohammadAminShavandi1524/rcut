import Link from "next/link";

import FooterSocials from "./FooterSocials";

const FooterBottom = () => {
  return (
    <div className="border-footer-border border-t">
      <div className="w90 flex items-center justify-between py-5" dir="rtl">
        {/* Copyright */}
        <p className="text-footer-muted min-w-[350px] text-sm">
          کلیه حقوق مادی و معنوی این وب‌سایت متعلق به آرکات است.
        </p>

        {/* Socials */}
        <FooterSocials />

        {/* Developer */}
        <p className="text-footer-muted flex min-w-[350px] items-center justify-end gap-x-1.5 text-sm">
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
