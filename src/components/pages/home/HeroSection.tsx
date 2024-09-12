import CategoriesMenu from "./CategoriesMenu";
import Slider from "./Slider";

const HeroSection = () => {
  return (
    <>
      <div className="grid grid-cols-1 lg:grid-cols-5 gap-4 bg-white border border-gray100 mt-2 mb-10 rounded">
        <div className="md:col-span-1 hidden lg:block">
          <div className="h-full bg-white rounded p-4">
            <h2 className="text-lg font-semibold mb-4">Categories</h2>
            <CategoriesMenu />
          </div>
        </div>
        <div className="md:col-span-4 w-full h-full">
          <div className=" overflow-hidden relative">
            <Slider />
          </div>
        </div>
      </div>
    </>
  );
};

export default HeroSection;
