"use client";

import { selectProfile } from "@/redux/features/auth/authSlice";
import { useAppSelector } from "@/redux/hooks";
import formatPrice from "@/utils/formatPrice";
import { Avatar } from "@nextui-org/react";
import Link from "next/link";
import React from "react";

const AllOrders = () => {
  const profile = useAppSelector(selectProfile);
  const orders = profile?.orders;

  return (
    <div className="">
      <h1 className="text-2xl font-bold mb-4">All Orders</h1>
      {orders && orders.length > 0 ? (
        orders.map((order: any) => (
          <div
            key={order._id}
            className="border border-gray200 rounded-md p-4 mb-4"
          >
            {/* Order details */}
            <div className="sm:flex items-center justify-between mb-2">
              <Link href={`/profile/orders/${order._id}`}>
                <h2 className="sm:text-lg font-semibold">
                  Order ID: {order._id}
                </h2>
              </Link>
              <span className="text-gray-500">Status: {order.status}</span>
            </div>
            <div className="flex items-center space-x-4">
              {/* Thumbnail (if available) */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-gray-200">
                <Avatar
                  src={
                    order?.orderItems?.[0]?.thumbnail ||
                    "/fallback-thumbnail.png"
                  }
                  alt="Order Thumbnail"
                  className="w-full h-full rounded-full object-cover"
                />
              </div>
              {/* Order summary */}
              <div>
                <p className="font-medium">Total: {formatPrice(order.total)}</p>
                <p>Payment Method: {order.paymentMethod}</p>
                {/* Add more details as needed */}
              </div>
            </div>
          </div>
        ))
      ) : (
        <p>No orders found.</p>
      )}
    </div>
  );
};

export default AllOrders;
