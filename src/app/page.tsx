import AboutIntro from "@/components/home/AboutIntro/AboutIntro";
import AboutIntro2 from "@/components/home/AboutIntro2/AboutIntro2";
import FeaturedProducts from "@/components/home/FeaturedProducts/FeaturedProducts";
import HeroCarousel from "@/components/home/Hero/HeroCarousel";
import NewProducts from "@/components/home/NewProducts/NewProducts";
import ShippingMethods from "@/components/home/ShippingMethods/ShippingMethods";

const page = () => {
  return (
    <>
      <HeroCarousel />
      {/* <AboutIntro /> */}
      <AboutIntro2 />
      <FeaturedProducts />
      <NewProducts />
      <ShippingMethods />
    </>
  );
};

export default page;
