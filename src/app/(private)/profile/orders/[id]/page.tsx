import OrderDetails from "@/components/pages/profile/orders/OrderDetails";
import { URLProps } from "@/types";
import React from "react";

export default function OrderPage({ params }: URLProps) {
  return (
    <div>
      <OrderDetails id={params.id} />
    </div>
  );
}
