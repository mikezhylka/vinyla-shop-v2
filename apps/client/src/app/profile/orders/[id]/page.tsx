import { getOrderById } from "@/entities/order/api/get-by-id";
import { OrderDetailsPage } from "@/screens/order-details";
import { Metadata } from "next";
import { notFound } from "next/navigation";

export const metadata: Metadata = {
  title: "Vinyla | Order Details",
};

export default async function OrderPage({
  params,
  searchParams,
}: {
  params: { id: string };
  searchParams: { from?: string };
}) {
  const { id } = await params;
  const { from } = await searchParams;

  const orderResponse = await getOrderById(id);

  if (!orderResponse.success || !orderResponse.data) {
    return notFound();
  }

  return <OrderDetailsPage order={orderResponse.data} from={from} />;
}
