"use client";

import Button from "@/components/buttons/Button";
import GhostButton from "@/components/buttons/GhostButton";
import {
  useAddOrRemoveWishlistMutation,
  useGetProfileQuery,
} from "@/redux/features/auth/authApi";
import { setProfile } from "@/redux/features/auth/authSlice";
import { addToCart, changeItemQuantity } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { IProduct, IProductVariant } from "@/types/products.types";
import classNames from "@/utils/classNames";
import formatPrice from "@/utils/formatPrice";
import { RadioGroup } from "@headlessui/react";
import { ShareIcon } from "@heroicons/react/24/outline";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
  Button as NextButton,
} from "@nextui-org/react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import SwiperCore from "swiper/core";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import ProductOverviewSkeleton from "./ProductOverviewSkeleton";
import ProductRating from "./ProductRating";
import ProductShareModal from "./ProductShareModal";
import { HeartIcon } from "@heroicons/react/24/outline";
import { HeartIcon as HeartIconSolid } from "@heroicons/react/20/solid";
interface IProductOverview {
  product: IProduct;
  isLoading: boolean;
}

SwiperCore.use([Navigation, FreeMode, Thumbs]);

const ProductOverview = ({ product, isLoading }: IProductOverview) => {
  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const [selectedVariants, setSelectedVariants] = useState<{
    [key: string]: string;
  }>({});
  const [addOrRemoveWishlist] = useAddOrRemoveWishlistMutation();
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { data: profile, isSuccess } = useGetProfileQuery(undefined);
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  const [mainImg, setMainImg] = useState(product?.images[0]);

  useEffect(() => {
    if (isSuccess && profile.data) {
      dispatch(setProfile(profile.data));
    }
  }, [isSuccess, profile, dispatch]);

  useEffect(() => {
    const initialSelection: { [key: string]: string } = {};
    product?.variants?.forEach((variant: IProductVariant) => {
      const cartItem = cartItems.find(
        (item) =>
          item.productId === product._id &&
          item.variants &&
          item.variants.some((v) => v.name === variant.name)
      );

      if (cartItem) {
        const selectedVariant = cartItem?.variants?.find(
          (v) => v.name === variant.name
        );
        initialSelection[variant.name] = selectedVariant
          ? selectedVariant.value
          : variant.values[0].name;
      } else {
        initialSelection[variant.name] = variant?.values[0]?.name;
      }
    });
    setSelectedVariants(initialSelection);
  }, [product, cartItems]);

  const handleVariantChange = (variantName: string, value: string) => {
    setSelectedVariants((prev) => ({
      ...prev,
      [variantName]: value,
    }));
  };

  const handleAddToCart = () => {
    const cartItem = {
      productId: product._id,
      name: product.name,
      thumbnail: product.thumbnail,
      price: product.discount_price || product.price,
      quantity: 1,
      totalPrice: product.discount_price || product.price,
      variants: Object.entries(selectedVariants).map(([key, value]) => ({
        name: key,
        value,
      })),
      taxMethod: product.taxMethod,
      productTax: product.productTax && {
        type: product.productTax.type,
        rate: product.productTax.rate,
      },
    };

    const existingCartItem = cartItems.find(
      (item) => item.productId === cartItem.productId
    );

    if (existingCartItem) {
      dispatch(
        addToCart({
          productId: cartItem.productId,
          name: cartItem.name,
          thumbnail: cartItem.thumbnail,
          price: cartItem.price,
          quantity: 1,
          totalPrice: cartItem.price,
          variants: cartItem.variants,
          productTax: cartItem.productTax && {
            rate: cartItem.productTax.rate,
            type: cartItem.productTax.type,
          },
          taxMethod: cartItem.taxMethod,
        })
      );

      dispatch(
        changeItemQuantity({
          productId: cartItem.productId,
          quantity: existingCartItem.quantity + 1,
        })
      );
    } else {
      dispatch(addToCart(cartItem));
    }
  };

  const handleBuyNow = () => {
    handleAddToCart();
    router.push("/cart");
  };

  if (isLoading) return <ProductOverviewSkeleton />;

  if (!product) return null;

  const handleAddOrRemoveFromWishList = async () => {
    const toastId = toast.loading("Please wait...");
    try {
      const action = profile?.data?.wishlist?.some(
        (item: any) => item._id === product._id
      )
        ? "remove"
        : "add";

      const data = {
        productId: product._id,
        action,
      };
      await addOrRemoveWishlist(data).unwrap();
      toast.success(
        action === "add" ? "Added to wishlist" : "Removed from wishlist",
        {
          id: toastId,
          duration: 2000,
        }
      );
    } catch (error: any) {
      toast.error(error?.data?.message || "Something went wrong", {
        id: toastId,
        duration: 2000,
      });
    }
  };
  return (
    <>
      <div className="bg-white border-y border-gray100 mt-10">
        <div className="pb-16 pt-6 sm:pb-24">
          <div className="lg:grid lg:auto-rows-min lg:grid-cols-12 lg:gap-x-8 relative">
            <div className="lg:col-span-7 lg:col-start-1 lg:row-span-3 lg:row-start-1 lg:mt-0">
              <div className="sticky top-36">
                <div className="imgSection w-full h-full flex flex-col sm:flex-row">
                  <>
                    {/* Swiper for mobile view */}
                    <div className="block sm:hidden h-[300px] w-full mb-5">
                      <Image
                        className="w-full h-full object-cover rounded-md"
                        src={mainImg || product.images[0]}
                        width={1000}
                        height={1282}
                        alt={product.name}
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                      />
                    </div>
                  </>
                  {/* Thumbnails - visible on all screen sizes */}
                  <div className="w-full sm:w-1/6 sm:h-[600px] flex sm:flex-col overflow-x-auto sm:overflow-y-auto space-x-2 sm:space-x-0 sm:space-y-4 custom-scrollbar mb-5 md:mb-0">
                    {product.images.map((img, index) => (
                      <Image
                        key={index}
                        className={`cursor-pointer w-24 h-24 sm:w-full sm:h-24 object-cover rounded-md transition-all duration-200 ${
                          img === mainImg
                            ? "opacity-100 border-2 border-gray-300"
                            : "opacity-50"
                        }`}
                        onClick={() => setMainImg(img)}
                        src={img}
                        alt={product.name}
                        width={100}
                        height={100}
                      />
                    ))}
                  </div>

                  {/* Main Image/Slider */}
                  <div className="w-full h-full m-0 sm:mx-4">
                    {/* Static Image for larger screens */}
                    <div className="hidden sm:block h-[600px] w-full">
                      <Image
                        className="w-full h-full object-cover rounded-lg"
                        src={mainImg || product.images[0]}
                        width={1000}
                        height={1282}
                        alt={product.name}
                        priority
                        placeholder="blur"
                        blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNkAAIAAAoAAv/lxKUAAAAASUVORK5CYII="
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:col-span-5 lg:col-start-8 lg:sticky lg:top-36">
              <>
                <div>
                  <div className="flex justify-between">
                    <h1 className="text-xl font-medium text-gray-900">
                      {product.name}
                    </h1>

                    <div className="flex items-center space-x-2">
                      {profile?.data && (
                        <NextButton
                          isIconOnly
                          variant="light"
                          size="sm"
                          color="danger"
                          onClick={handleAddOrRemoveFromWishList}
                        >
                          {profile?.data?.wishlist?.some(
                            (item: any) => item._id === product._id
                          ) ? (
                            <HeartIconSolid className="h-7 w-7 flex-shrink-0" />
                          ) : (
                            <HeartIcon className="h-7 w-7 flex-shrink-0" />
                          )}
                        </NextButton>
                      )}
                      <Popover
                        showArrow={true}
                        placement="bottom"
                        radius="sm"
                        size="sm"
                      >
                        <PopoverTrigger>
                          <ShareIcon className="h-5 w-5 text-gray500 cursor-pointer" />
                        </PopoverTrigger>
                        <PopoverContent>
                          <ProductShareModal product={product} />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>

                  <div className="mt-4">
                    <p className="text-sm text-gray-700">
                      {product.short_description}
                    </p>
                  </div>

                  <div className="mt-4">
                    <p className="mt-2 text-gray-500 truncate text-2xl">
                      {product.discount_price > 0 ? (
                        <>
                          <span className="text-orange-500 mr-2">
                            {formatPrice(product.discount_price)}
                          </span>
                          <span className="text-gray-900 line-through font-semibold">
                            {formatPrice(product.price)}
                          </span>
                        </>
                      ) : (
                        <span className="text-gray-900 font-semibold">
                          {formatPrice(product.price)}
                        </span>
                      )}
                    </p>
                  </div>

                  <div className="mt-4 z-0">
                    <h2 className="sr-only">Reviews</h2>
                    <div className="flex items-center">
                      <ProductRating
                        ratingValue={product?.rating}
                        totalRatings={product?.reviews?.length}
                      />
                    </div>
                  </div>

                  <div className="mt-8 lg:col-span-5">
                    <div>
                      {product.variants &&
                        product.variants.map((variant: IProductVariant) => (
                          <div key={variant.name} className="mt-4">
                            <h2 className="text-sm font-medium text-gray-900">
                              {variant.name}
                            </h2>
                            <RadioGroup
                              value={selectedVariants[variant.name]}
                              onChange={(value) =>
                                handleVariantChange(variant.name, value)
                              }
                              className="mt-2"
                            >
                              <RadioGroup.Label className="sr-only">
                                Choose a {variant.name}
                              </RadioGroup.Label>
                              <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
                                {variant.values.map((value: any) => (
                                  <RadioGroup.Option
                                    key={value._id}
                                    value={value.name}
                                    className={({ active, checked }) =>
                                      classNames(
                                        active ? "" : "",
                                        checked
                                          ? "border-blue"
                                          : "border-gray200 text-black hover:bg-gray-50",
                                        "flex cursor-pointer items-center justify-center rounded-md border p-2 text-sm font-medium uppercase sm:flex-1"
                                      )
                                    }
                                  >
                                    {variant.name === "Color" ? (
                                      <span
                                        className="w-6 h-6 rounded-full border border-black"
                                        style={{ backgroundColor: value.value }}
                                      >
                                        <span className="sr-only">
                                          {value.name}
                                        </span>
                                      </span>
                                    ) : (
                                      <RadioGroup.Label as="span">
                                        {value.name}
                                      </RadioGroup.Label>
                                    )}
                                  </RadioGroup.Option>
                                ))}
                              </div>
                            </RadioGroup>
                          </div>
                        ))}

                      {product.stock > 0 ? (
                        <>
                          <div className="flex h-12 space-x-4 w-full mt-10">
                            <Button
                              value="Add to Cart"
                              size="lg"
                              extraClass={`flex-grow text-center whitespace-nowrap`}
                              onClick={() => handleAddToCart()}
                            />
                            <GhostButton onClick={handleBuyNow}>
                              Buy Now
                            </GhostButton>
                          </div>
                        </>
                      ) : (
                        <h2 className="text-red-500 mt-4">Out of Stock</h2>
                      )}
                    </div>
                  </div>
                </div>
              </>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProductOverview;
