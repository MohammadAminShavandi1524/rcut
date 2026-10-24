"use client";

import NavItem from "./NavItem";
import ProductsDropdown from "./ProductsDropdown";

const Nav = () => {
  return (
    <nav aria-label="منوی اصلی">
      <ul className="3xl:gap-x-8 flex items-center gap-x-3 whitespace-nowrap xl:gap-x-5 2xl:gap-x-6.5">
        <NavItem label="خانه" href="/" />

        <ProductsDropdown />

        <NavItem label="نمایندگی یاماسا" href="/yamasa" />

        <NavItem label="درباره ما" href="/about-us" />

        <NavItem label="تماس با ما" href="/contact-us" />

        <NavItem label="سوالات متداول" href="/faq" />
      </ul>
    </nav>
  );
};

export default Nav;
