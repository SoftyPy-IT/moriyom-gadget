"use client";

import { useState, useEffect } from "react";
import { toast } from "sonner";
import AppForm from "../form/AppForm";
import AppInput from "../form/AppInput";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useOrderTrackingQuery } from "@/redux/features/orders/order.api";
import { CheckIcon } from "@heroicons/react/24/solid";
import { Avatar } from "@nextui-org/react";
import { Skeleton } from "@nextui-org/skeleton";
import Button from "../buttons/Button";

const schema = zod.object({
  id: zod.string().nonempty("Order ID is required"),
});

const TrackOrder = () => {
  const [orderID, setOrderID] = useState<string | null>(null);
  const [previousData, setPreviousData] = useState<any>(null);
  const { data, error, isLoading } = useOrderTrackingQuery(orderID, {
    skip: !orderID,
  });

  useEffect(() => {
    if (data) {
      setPreviousData(data);
    } else if (error) {
      setPreviousData(null);
    }
  }, [data, error]);

  const onSubmit = async (formData: any) => {
    const toastId = toast.loading("Tracking your order...");
    try {
      setPreviousData(null);
      setOrderID(formData.id);
      toast.success("Order tracked successfully", { id: toastId });
    } catch (error) {
      toast.error("Failed to track order", { id: toastId });
      setPreviousData(null);
    }
  };

  const getOrderStatus = (status: string) => {
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

    return steps.map((step, stepIdx) => (
      <li key={step.name} className="relative md:flex md:flex-1">
        {step.status === "complete" ? (
          <div className="flex items-center w-full group">
            <span className="flex items-center px-6 py-4 text-sm font-medium">
              <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-green rounded-full group-hover:bg-green">
                <CheckIcon className="w-6 h-6 text-white" aria-hidden="true" />
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
            <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 border border-green rounded-full">
              <span className="text-green">{step.id}</span>
            </span>
            <span className="ml-4 text-sm font-medium ">{step.name}</span>
          </div>
        ) : (
          <div className="flex items-center group">
            <span className="flex items-center px-6 py-4 text-sm font-medium">
              <span className="flex items-center justify-center flex-shrink-0 w-10 h-10 border-2 border-gray300 rounded-full group-hover:border-gray400">
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
        ) : null}
      </li>
    ));
  };

  return (
    <div className="my-10 p-6 bg-[#f9fafb] rounded">
      <h1 className="text-2xl font-bold mb-4 text-center">Track Order</h1>
      <p className="mb-6 text-center">Track your order here</p>
      <AppForm onSubmit={onSubmit} resolver={zodResolver(schema)}>
        <div>
          <AppInput
            label="Order ID"
            name="id"
            type="text"
            placeholder="Enter your order ID"
          />
          <Button
            onClick={onSubmit}
            value={isLoading ? "Updating..." : "Update Profile"}
            type="submit"
            disabled={isLoading}
          />
        </div>
      </AppForm>
      {isLoading && (
        <div className="mt-4 text-center">
          <Skeleton className="h-6 w-3/5 rounded-lg mb-2" />
          <Skeleton className="h-6 w-4/5 rounded-lg mb-2" />
          <Skeleton className="h-6 w-4/5 rounded-lg mb-2" />
          <Skeleton className="h-6 w-1/5 rounded-lg mb-2" />
          <Skeleton className="h-6 w-3/5 rounded-lg mb-2" />
        </div>
      )}
      {error ? (
        <p className="mt-4 text-center text-red">
          Failed to track order. Please try again.
        </p>
      ) : (
        <>
          {(data || previousData) && (
            <div className="mt-6">
              <h2 className="text-xl font-semibold mb-4">
                Order #{(data || previousData)?.data?._id}
              </h2>
              <div className="mb-6">
                <h3 className="text-lg font-medium">Order Status:</h3>
                <p className="text-sm font-medium text-gray-900">
                  {(data || previousData)?.data?.status
                    .charAt(0)
                    .toUpperCase() +
                    (data || previousData)?.data?.status.slice(1)}
                </p>
                <div className="mt-4">
                  <nav aria-label="Progress">
                    <ol
                      role="list"
                      className="border border-gray300 divide-y divide-gray300 rounded-md md:flex md:divide-y-0"
                    >
                      {getOrderStatus((data || previousData)?.data?.status)}
                    </ol>
                  </nav>
                </div>
              </div>
              <div>
                <h3 className="text-lg font-medium mb-2">Order Items:</h3>
                <div className="space-y-4">
                  {(data || previousData)?.data?.orderItems.map(
                    (product: any) => (
                      <div
                        key={product.productId}
                        className="flex items-center space-x-4 border border-gray100 p-4 rounded-lg"
                      >
                        <Avatar
                          src={product.thumbnail}
                          radius="sm"
                          alt={product.name}
                          className="h-16 w-16 object-cover"
                        />
                        <div>
                          <h3 className="text-base font-medium text-gray-900">
                            {product.name}
                          </h3>
                          <p className="text-sm text-gray-500">
                            Quantity: {product.quantity}
                          </p>
                          <p className="text-sm font-medium text-gray-900">
                            {product.price}
                          </p>
                        </div>
                      </div>
                    )
                  )}
                </div>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default TrackOrder;
