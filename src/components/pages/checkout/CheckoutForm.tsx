"use client";

import Button from "@/components/buttons/Button";
import ErrorMessage from "@/components/common/ErrorMessage";
import SuccessMessage from "@/components/common/SuccessMessage";
import AppForm from "@/components/form/AppForm";
import AppInput from "@/components/form/AppInput";
import AppPhoneInput from "@/components/form/AppPhoneInput";
import AppSelectCountry from "@/components/form/AppSelectCountry";
import { removeAllFromCart } from "@/redux/features/cart";
import { useCreateOrderMutation } from "@/redux/features/orders/order.api";
import {
  clearOrderData,
  selectCoupon,
  selectIsCouponApplied,
  selectOrderSummary,
} from "@/redux/features/orders/orderSlice";
import { useAppSelector } from "@/redux/hooks";
import { RootState } from "@/redux/store";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import * as zod from "zod";

const checkoutSchema = zod.object({
  name: zod.string().min(1, "Name is required"),
  email: zod.string().email("Invalid email address"),
  phone: zod.string().min(1, "Phone number is required"),
  billingAddress: zod.object({
    line1: zod.string().min(1, "Address line 1 is required"),
    line2: zod.string().optional(),
    city: zod.string().min(1, "City is required"),
    postalCode: zod.string().min(1, "Postal code is required"),
    state: zod.string().optional(),
    country: zod.string().min(1, "Country is required"),
  }),
  shippingAddress: zod.object({
    line1: zod.string().min(1, "Address line 1 is required"),
    line2: zod.string().optional(),
    city: zod.string().min(1, "City is required"),
    postalCode: zod.string().min(1, "Postal code is required"),
    state: zod.string().optional(),
    country: zod.string().min(1, "Country is required"),
    phone: zod.string().min(1, "Phone number is required"),
  }),
});

const CheckoutForm = () => {
  const dispatch = useDispatch();
  const orderSummary = useSelector(selectOrderSummary);
  const cartItems = useSelector((state: RootState) => state.cart.cartItems);
  const [createOrder, { isLoading, isSuccess, isError }] =
    useCreateOrderMutation();
  const hasCoupon = useAppSelector(selectIsCouponApplied);
  const coupon = useAppSelector(selectCoupon);
  const [error, setError] = React.useState<any>(null);
  const router = useRouter();
  const onSubmit = async (data: any) => {
    const toastId = toast.loading("Submitting order...");
    try {
      const orderData = {
        orderItems: cartItems,
        orderTotal: orderSummary.total,
        ...orderSummary,
        ...data,
        paymentMethod: "Cash On Delivery",
        hasCoupon: hasCoupon,
        couponCode: coupon?.code,
      };

      const res = await createOrder(orderData).unwrap();

      if (res.success) {
        toast.success("Order submitted successfully", {
          id: toastId,
          duration: 2000,
        });
        router.push(`/checkout/success/${res.data._id}`);
        dispatch(removeAllFromCart());
        dispatch(clearOrderData());
      }

      toast.success("Order submitted successfully", {
        id: toastId,
        duration: 2000,
      });
    } catch (error: any) {
      toast.error(error.message || "Failed to submit order", {
        id: toastId,
        duration: 2000,
      });
      setError(error.data.message || "Failed to submit order");
    } finally {
      toast.dismiss(toastId);
    }
  };

  return (
    <div className=" p-4  rounded-lg border border-gray100">
      <div className="my-5">
        <h1 className="text-2xl font-semibold">Checkout</h1>
        <p className="text-sm text-gray-500">
          Fill the form below to complete your order process and proceed to
          payment securely.
        </p>
        {isError && <ErrorMessage errorMessage={error} />}
        {isSuccess && (
          <SuccessMessage successMessage="Order submitted successfully" />
        )}
      </div>
      <AppForm onSubmit={onSubmit} resolver={zodResolver(checkoutSchema)}>
        <div className="space-y-8">
          <div>
            <h3 className="text-xl font-semibold mb-4">Personal Information</h3>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppInput
                  type="text"
                  name="name"
                  label="Name"
                  placeholder="Enter your name"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <AppInput
                  type="email"
                  name="email"
                  label="Email"
                  placeholder="Enter your email"
                  required
                  variant="bordered"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppPhoneInput
                  name="phone"
                  label="Phone"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Billing Address</h3>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppInput
                  type="text"
                  name="billingAddress.line1"
                  label="Address Line 1"
                  placeholder="Enter your billing address"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <AppInput
                  type="text"
                  name="billingAddress.line2"
                  label="Address Line 2"
                  placeholder="Enter your billing address"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppInput
                  type="text"
                  name="billingAddress.city"
                  label="City"
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <AppInput
                  type="text"
                  name="billingAddress.postalCode"
                  label="Postal Code"
                  placeholder="Enter your postal code"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppInput
                  type="text"
                  name="billingAddress.state"
                  label="State"
                  placeholder="Enter your state"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <AppSelectCountry
                  name="billingAddress.country"
                  label="Country"
                />
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-xl font-semibold mb-4">Shipping Address</h3>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppInput
                  type="text"
                  name="shippingAddress.line1"
                  label="Address Line 1"
                  placeholder="Enter your shipping address"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <AppInput
                  type="text"
                  name="shippingAddress.line2"
                  label="Address Line 2"
                  placeholder="Enter your shipping address"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppInput
                  type="text"
                  name="shippingAddress.city"
                  label="City"
                  placeholder="Enter your city"
                  required
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <AppInput
                  type="text"
                  name="shippingAddress.postalCode"
                  label="Postal Code"
                  placeholder="Enter your postal code"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppInput
                  type="text"
                  name="shippingAddress.state"
                  label="State"
                  placeholder="Enter your state"
                />
              </div>
              <div className="w-full md:w-1/2 px-3">
                <AppSelectCountry
                  name="shippingAddress.country"
                  label="Country"
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                <AppPhoneInput
                  name="shippingAddress.phone"
                  label="Phone"
                  placeholder="Enter your phone number"
                />
              </div>
            </div>
          </div>
        </div>
        <div className="mt-8 flex ">
          <Button
            onClick={() => {}}
            value={isLoading ? "Submitting..." : "Submit Order"}
            extraClass=""
            type="submit"
            disabled={isLoading}
          />
        </div>
      </AppForm>
    </div>
  );
};

export default CheckoutForm;
