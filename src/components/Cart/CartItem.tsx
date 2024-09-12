import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useCallback, useEffect, useState } from "react";

import { ShoppingBag as BagIcon } from "lucide-react";

import Item from "./Item";

import { useRouter } from "next/navigation";
import formatPrice from "@/utils/formatPrice";
import LinkButton from "../buttons/LinkButton";
import Button from "../buttons/Button";
import cart, {
  CartItem as CartItemType,
  changeItemQuantity,
  removeFromCart,
} from "@/redux/features/cart";
import { useAppSelector, useAppDispatch } from "@/redux/hooks";
import { selectCoupon } from "@/redux/features/orders/orderSlice";

const CartItem = () => {
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [animate, setAnimate] = useState("");

  const cartItems = useAppSelector((state) => state.cart.cartItems);
  const dispatch = useAppDispatch();
  const coupon = useAppSelector(selectCoupon);

  const subTotal = cartItems?.reduce(
    (acc: number, item) => acc + item.price * item.quantity,
    0
  );

  const [quantityInput, setQuantityInput] = useState(
    cartItems.reduce((acc, item) => {
      acc[item.productId] = item.quantity;
      return acc;
    }, {} as { [key: string]: number })
  );

  const handleQuantityChange = (productId: string, newQuantity: number) => {
    setQuantityInput({ ...quantityInput, [productId]: newQuantity });
    dispatch(
      changeItemQuantity({
        productId,
        quantity: newQuantity,
      })
    );
  };

  const noOfItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  const handleAnimate = useCallback(() => {
    if (noOfItems === 0) return;
    setAnimate("animate__animated animate__headShake");
    // setTimeout(() => {
    //   setAnimate("");
    // }, 0.1);
  }, [noOfItems, setAnimate]);

  // Set animate when no of items changes
  useEffect(() => {
    handleAnimate();
    setTimeout(() => {
      setAnimate("");
    }, 1000);
  }, [handleAnimate]);

  function closeModal() {
    setOpen(false);
  }

  function openModal() {
    setOpen(true);
  }

  const discount = coupon
    ? coupon.discountType === "percentage"
      ? (subTotal * coupon.discount) / 100
      : coupon.discount
    : 0;

  const tax = cartItems?.reduce((acc: number, item) => {
    if (item.taxMethod === "Exclusive") {
      if (item.productTax?.type === "Percentage") {
        return acc + (item.price * item.productTax.rate * item.quantity) / 100;
      } else if (item.productTax?.type === "Fixed") {
        return acc + item.productTax.rate * item.quantity;
      }
    } else if (item.taxMethod === "Inclusive") {
      if (item.productTax?.type === "Percentage") {
        return (
          acc +
          (item.price * item.productTax.rate) / (100 + item.productTax.rate)
        );
      } else if (item.productTax?.type === "Fixed") {
        return acc + item.productTax.rate;
      }
    }
    return acc;
  }, 0);

  return (
    <>
      <div className="relative">
        <button
          type="button"
          onClick={openModal}
          aria-label="Cart"
          className="relative"
        >
          <BagIcon className="w-6 h-6 " />
          {noOfItems > 0 && (
            <span
              className={`${animate} absolute text-xs -top-2.5 sm:-top-3 sm:px-2 px-1.5 bg-gray500 text-gray100 py-0.5 sm:py-1 rounded-full`}
            >
              {noOfItems}
            </span>
          )}
        </button>
      </div>
      <Transition show={open} as={Fragment}>
        <Dialog
          as="div"
          className="fixed inset-0 z-10 overflow-y-auto"
          style={{ zIndex: 99999 }}
          static
          open={open}
          onClose={closeModal}
        >
          <div className="min-h-screen text-right">
            <Transition.Child
              as={Fragment}
              //   enter="ease-out duration-300"
              //   enterFrom="opacity-0"
              //   enterTo="opacity-100"
              //   leave="ease-in duration-200"
              //   leaveFrom="opacity-100"
              //   leaveTo="opacity-0"
            >
              <div className="fixed inset-0 bg-gray500 opacity-80" />
            </Transition.Child>

            {/* This element is to trick the browser into centering the modal contents. */}
            {/* <span
              className="inline-block h-screen align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span> */}
            <Transition.Child
              as={Fragment}
              enter="ease-linear duration-600"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-linear duration-300"
              leaveFrom="translate-x-0"
              leaveTo="translate-x-full"
            >
              <div
                style={{ height: "100vh" }}
                className="relative inline-block dur h-screen w-full max-w-md overflow-hidden overflow-y-auto custom-scrollbar text-left align-middle transition-all transform bg-white shadow-xl"
              >
                <div className="bg-lightgreen flex justify-between items-center p-6">
                  <h3 className="text-xl">cart ({noOfItems})</h3>
                  <button
                    type="button"
                    className="outline-none focus:outline-none text-3xl sm:text-2xl"
                    onClick={closeModal}
                  >
                    &#10005;
                  </button>
                </div>

                <div className="h-full">
                  <div className="itemContainer px-4 h-2/3  w-full flex-grow flex-shrink overflow-y-auto custom-scrollbar">
                    {cartItems.map((item: CartItemType) => {
                      return (
                        <Item
                          key={item.productId}
                          name={item.name}
                          price={item.price * item.quantity!}
                          qty={item.quantity!}
                          img={item.thumbnail as string}
                          onAdd={() =>
                            handleQuantityChange(
                              item.productId as string,
                              item.quantity! + 1
                            )
                          }
                          onRemove={() =>
                            handleQuantityChange(
                              item.productId,
                              item.quantity - 1 < 1 ? 1 : item.quantity - 1
                            )
                          }
                          onDelete={() =>
                            dispatch(removeFromCart(item.productId as string))
                          }
                        />
                      );
                    })}
                  </div>
                  <div className="btnContainer mt-4 px-4 h-1/3 mb-20 w-full flex flex-col ">
                    <div className="flex justify-between">
                      <span>Subtotal</span>
                      <span>{formatPrice(subTotal)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Discount</span>
                      <span>{formatPrice(discount)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Tax</span>
                      <span>{formatPrice(tax)}</span>
                    </div>

                    <div className="flex justify-between">
                      <span>Total</span>
                      <span>
                        {formatPrice(
                          subTotal - discount + tax > 0
                            ? subTotal - discount + tax
                            : 0
                        )}
                      </span>
                    </div>

                    <LinkButton
                      href="/cart"
                      extraClass="my-4 w-full"
                      noBorder={false}
                      inverted={false}
                    >
                      View Cart
                    </LinkButton>
                    <Button
                      value="Checkout"
                      onClick={() => router.push(`/checkout`)}
                      disabled={cart.length < 1 ? true : false}
                      extraClass="text-center"
                      size="lg"
                    />
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};

export default CartItem;
