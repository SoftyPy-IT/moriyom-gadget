import Container from "@/components/common/Container";
import Brands from "@/components/pages/home/Brands";
import CategoriesSection from "@/components/pages/home/CategoriesSection";
import DealsOffer from "@/components/pages/home/DealsOffer";
import DynamicSection from "@/components/pages/home/DynamicSection";
import FeatureProducts from "@/components/pages/home/FeatureProducts";
import MarqueeComponent from "@/components/pages/home/Marquee";
import RecommendedProducts from "@/components/pages/home/RecommendedProducts";
import Slider from "@/components/pages/home/Slider";

export default function HomePage() {
  return (
    <>
      <Container>
        <Slider />
        <MarqueeComponent />
        <CategoriesSection />
        <FeatureProducts />
        {/* <DealsOffer /> */}
        {/* <DynamicSection /> */}
        {/* <RecommendedProducts /> */}
        <Brands />
      </Container>
    </>
  );
}
