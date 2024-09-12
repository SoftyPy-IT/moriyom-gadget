import { FC } from "react";
import Link from "next/link";
import Image from "next/image";
import formatPrice from "@/utils/formatPrice";
import { changeItemQuantity, addToCart } from "@/redux/features/cart";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { truncate } from "lodash";
import GhostButton from "../buttons/GhostButton";

interface itemType {
  id: string;
  name: string;
  price: number;
  discount_price?: number; // Optional discount price
  img1: string;
  img2: string;
  slug: string;
}

type Props = {
  item: itemType;
};

const Card: FC<Props> = ({ item }) => {
  const dispatch = useAppDispatch();
  const cartItems = useAppSelector((state) => state.cart.cartItems);

  const { id, name, slug, price, discount_price, img1 } = item;
  const itemLink = `/products/${encodeURIComponent(slug)}`;

  const addOne = (item: itemType) => {
    const cartItem = {
      productId: item.id,
      name: item.name,
      thumbnail: item.img1,
      price: item.price,
      quantity: 1,
      totalPrice: item.price,
      variants: [],
      taxMethod: "inclusive",
      productTax: null,
    };

    const existingCartItem = cartItems.find(
      (ci) => ci.productId === cartItem.productId
    );

    if (existingCartItem) {
      dispatch(
        changeItemQuantity({
          productId: cartItem.productId,
          quantity: existingCartItem.quantity + 1,
        })
      );
    } else {
      dispatch(addToCart(cartItem as any));
    }
  };

  return (
    <div className="flex flex-col h-full bg-white border border-gray100 shadow-sm rounded-md dark:bg-neutral-900 dark:border-neutral-700 dark:shadow-neutral-700/70">
      <div className="relative w-full h-48 md:h-64 border-b border-gray100">
        <Image
          src={img1}
          alt={name}
          fill
          className="object-cover w-full h-full rounded-t-md p-5"
          sizes="(max-width: 768px) 100vw, 50vw"
        />
      </div>

      <div className="flex flex-col justify-between flex-1 p-4 md:p-5">
        <div className="flex-grow">
          <h3 className="text-sm md:text-md  cursor-pointer hover:underline hover:text-orange">
            <Link href={itemLink}>{truncate(name, { length: 40 })}</Link>
          </h3>

          <div className="flex flex-col md:flex-row items-center justify-between mt-3">
            {discount_price && discount_price > 0 && discount_price < price ? (
              <div className="flex flex-row items-center space-x-2">
                <span className="text-gray400 line-through">
                  {formatPrice(price)}
                </span>
                <span className="text-orange">
                  {formatPrice(discount_price)}
                </span>
              </div>
            ) : (
              <span className="text-orange">{formatPrice(price)}</span>
            )}
          </div>
        </div>

        <div className="mt-8 w-full hidden md:block">
          <GhostButton
            onClick={() => addOne(item)}
            extraClass="w-full"
            aria-label="Add to cart"
            size="sm"
            inverted
          >
            Add to cart
          </GhostButton>
        </div>
      </div>
    </div>
  );
};

export default Card;
