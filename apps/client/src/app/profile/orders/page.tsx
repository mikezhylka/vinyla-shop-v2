import { getOrders } from "@/entities/order/api/get-all";
import { OrdersPage } from "@/screens/orders";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinyla | My orders",
};

export default async function Orders() {
  const orders = await getOrders();

  return <OrdersPage orders={orders.data} />;
}
