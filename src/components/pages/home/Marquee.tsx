import Marquee from "react-fast-marquee";

const MarqueeComponent = () => {
  return (
    <div className="bg-white py-2 mt-8  rounded">
      <Marquee speed={50} pauseOnHover={true}>
        <div className="mx-4 text-sm  text-gray-700">
          🚚 New Arrivals - Limited Time Offer - Free Shipping Available - Shop
          Now!
        </div>
        <div className="mx-4 text-sm  text-gray-700">
          🎁 Explore Our Latest Categories - Discounts Up to 50%!
        </div>
        <div className="mx-4 text-sm  text-gray-700">
          💥 Exclusive Deals on Electronics - Don&apos;t Miss Out!
        </div>
      </Marquee>
    </div>
  );
};

export default MarqueeComponent;
