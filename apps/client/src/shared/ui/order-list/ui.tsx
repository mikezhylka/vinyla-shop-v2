"use client";

import { Order } from "@/entities/order";
import React from "react";
import { usePathname } from "next/navigation";
import { OrderCard } from "@/entities/order/ui/order-card";

interface Props {
  orders: Order[];
}

export function OrderList({ orders }: Props) {
  const pathname = usePathname();
  const isOrdersPage = pathname === "/profile/orders";

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  return (
    <React.Fragment>
      {sortedOrders.map((order) => (
        <OrderCard order={order} isOrdersPage={isOrdersPage} key={order.id} />
      ))}
    </React.Fragment>
  );
}
