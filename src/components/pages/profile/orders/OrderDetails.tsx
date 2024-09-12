"use client";

import React from "react";
import OrderSkeleton from "../../checkout/OrderSkeleton";
import { notFound } from "next/navigation";
import { useGetOrderQuery } from "@/redux/features/orders/order.api";
import { Avatar } from "@nextui-org/react";
import { CheckIcon } from "@heroicons/react/24/solid";
import formatPrice from "@/utils/formatPrice";
import { baseURL } from "@/redux/api/baseApi";

const OrderDetails = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetOrderQuery(id);

  if (isLoading) return <OrderSkeleton />;
  if (!data) return notFound();

  const {
    billingAddress,
    shippingAddress,
    _id,
    orderItems,
    subTotal,
    discount,
    tax,
    total,
    phone,
    status,
  } = data.data;

  const steps = [
    { id: "01", name: "Order placed", status: "complete" },
    {
      id: "02",
      name: "Processing",
      status:
        status === "processing" ||
        status === "shipped" ||
        status === "delivered"
          ? "complete"
          : status === "pending"
          ? "current"
          : "upcoming",
    },
    {
      id: "03",
      name: "Shipped",
      status:
        status === "shipped" || status === "delivered"
          ? "complete"
          : status === "processing"
          ? "current"
          : "upcoming",
    },
    {
      id: "04",
      name: "Delivered",
      status:
        status === "delivered"
          ? "complete"
          : status === "shipped"
          ? "current"
          : "upcoming",
    },
    {
      id: "05",
      name: "Cancelled",
      status:
        status === "cancelled" || status === "returned"
          ? "complete"
          : "upcoming",
    },
    {
      id: "06",
      name: "Returned",
      status: status === "returned" ? "complete" : "upcoming",
    },
  ];

  return (
    <main className="">
      <div className="sm:flex sm:items-center sm:justify-between sm:space-x-4 sm:px-0">
        <h1 className="text-xl font-bold tracking-tight text-gray-900 sm:text-3xl">
          Order #{_id}
        </h1>
        <div className="sm:flex sm:space-x-4">
          <a
            target="_blank"
            download={`${baseURL}/order/invoice/${_id}`}
            href={`${baseURL}/order/invoice/${_id}`}
            className="text-sm font-medium text-blue hover:text-indigo-500"
          >
            Download invoice <span aria-hidden="true"> &rarr;</span>
          </a>
          <p className="text-sm text-gray-600">
            Order placed{" "}
            <time dateTime="2021-03-22" className="font-medium text-gray-900">
              March 22, 2021
            </time>
          </p>
        </div>
      </div>

      {/* Products */}
      <section aria-labelledby="products-heading" className="mt-6">
        <h2 id="products-heading" className="sr-only">
          Products purchased
        </h2>
        <div className="space-y-8">
          <div className=" rounded bg-white border border-gray100">
            <div className="px-4 py-6 sm:px-6 lg:p-8">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {orderItems.map((product: any) => (
                  <div
                    key={product.productId}
                    className="flex items-center space-x-4"
                  >
                    <div className="aspect-h-1 aspect-w-1 w-16 flex-shrink-0 overflow-hidden rounded-lg sm:aspect-none sm:w-40">
                      <Avatar
                        src={product.thumbnail}
                        radius="sm"
                        alt={product.name}
                        className="h-full w-full object-cover object-center sm:h-full sm:w-full"
                      />
                    </div>
                    <div>
                      <h3 className="text-base font-medium text-gray-900">
                        <a href="#">{product.name}</a>
                      </h3>
                      <p className="mt-2 text-sm font-medium text-gray-900">
                        {formatPrice(product.price)}
                      </p>
                      <p className="mt-3 text-sm text-gray-500">
                        Quantity: {product.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Order Status */}
      <section className=" py-6  ">
        <h4 className="sr-only">Status</h4>
        <p className="text-sm font-medium text-gray-900">
          {status.charAt(0).toUpperCase() + status.slice(1)} on{" "}
          <time dateTime="2021-03-22">March 22, 2021</time>
        </p>
        <div className="mt-6">
          <nav aria-label="Progress">
            <ol
              role="list"
              className="border border-gray300 divide-y divide-gray300 rounded-md md:flex md:divide-y-0"
            >
              {steps.map((step, stepIdx) => (
                <li key={step.name} className="relative md:flex md:flex-1">
                  {step.status === "complete" ? (
                    <div className="flex items-center w-full group">
                      <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green rounded-full group-hover:bg-green">
                          <CheckIcon
                            className="w-6 h-6 text-white"
                            aria-hidden="true"
                          />
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-900">
                          {step.name}
                        </span>
                      </span>
                    </div>
                  ) : step.status === "current" ? (
                    <div
                      className="flex items-center px-6 py-4 text-sm font-medium"
                      aria-current="step"
                    >
                      <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-green rounded-full">
                        <span className="text-green">{step.id}</span>
                      </span>
                      <span className="ml-4 text-sm font-medium ">
                        {step.name}
                      </span>
                    </div>
                  ) : (
                    <div className="flex items-center group">
                      <span className="flex items-center px-6 py-4 text-sm font-medium">
                        <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-gray300 rounded-full group-hover:border-gray400">
                          <span className="text-gray-500 group-hover:text-gray-900">
                            {step.id}
                          </span>
                        </span>
                        <span className="ml-4 text-sm font-medium text-gray-500 group-hover:text-gray-900">
                          {step.name}
                        </span>
                      </span>
                    </div>
                  )}

                  {stepIdx !== steps.length - 1 ? (
                    <>
                      {/* Arrow separator for lg screens and up */}
                      <div
                        className="absolute top-0 right-0 hidden w-5 h-full md:block"
                        aria-hidden="true"
                      >
                        <svg
                          className="w-full h-full text-gray300"
                          viewBox="0 0 22 80"
                          fill="none"
                          preserveAspectRatio="none"
                        >
                          <path
                            d="M0 -2L20 40L0 82"
                            vectorEffect="non-scaling-stroke"
                            stroke="currentColor"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </div>
                    </>
                  ) : null}
                </li>
              ))}
            </ol>
          </nav>
        </div>
      </section>

      {/* Billing */}
      <section aria-labelledby="summary-heading" className="mt-16">
        <h2 id="summary-heading" className="sr-only">
          Billing Summary
        </h2>
        <div className="bg-gray-100 px-4 py-6 sm:rounded-lg sm:px-6 lg:grid lg:grid-cols-12 lg:gap-x-8 lg:px-8 lg:py-8">
          <dl className="grid grid-cols-2 gap-6 text-sm sm:grid-cols-2 md:gap-x-8 lg:col-span-7">
            <div>
              <dt className="font-medium text-gray-900">Billing address</dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">{billingAddress.line1}</span>
                <span className="block">
                  {billingAddress.city}, {billingAddress.postalCode}
                </span>
                <span className="block">{billingAddress.country}</span>
              </dd>
            </div>
            <div>
              <dt className="font-medium text-gray-900">Shipping address</dt>
              <dd className="mt-3 text-gray-500">
                <span className="block">{shippingAddress.line1}</span>
                <span className="block">
                  {shippingAddress.city}, {shippingAddress.postalCode}
                </span>
                <span className="block">{shippingAddress.country}</span>
                <span className="block">{phone}</span>
              </dd>
            </div>
          </dl>

          <dl className="mt-8 divide-y divide-gray200 text-sm lg:col-span-5 lg:mt-0">
            <div className="flex items-center justify-between pb-4">
              <dt className="text-gray-600">Subtotal</dt>
              <dd className="font-medium text-gray-900">
                {formatPrice(subTotal)}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Discount</dt>
              <dd className="font-medium text-gray-900">
                {formatPrice(discount)}
              </dd>
            </div>
            <div className="flex items-center justify-between py-4">
              <dt className="text-gray-600">Tax</dt>
              <dd className="font-medium text-gray-900">{formatPrice(tax)}</dd>
            </div>
            <div className="flex items-center justify-between pt-4">
              <dt className="font-medium text-gray-900">Order total</dt>
              <dd className="font-medium text-indigo-600">
                {formatPrice(total)}
              </dd>
            </div>
          </dl>
        </div>
      </section>
    </main>
  );
};

export default OrderDetails;
