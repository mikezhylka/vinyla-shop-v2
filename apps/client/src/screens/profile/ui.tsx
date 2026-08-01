"use client";

import { Product } from "@/entities/product";
import ProfileHeader from "./_components/ProfileHeader";
import RecentOrders from "./_components/RecentOrders";
import Wishlist from "./_components/Wishlist";
import { Order } from "@/entities/order";

interface Props {
  wishlistItems: Product[] | undefined;
  orders: Order[] | undefined;
}

export function ProfilePage({ wishlistItems, orders }: Props) {
  return (
    <main className="min-h-screen pt-32 pb-24 bg-body-background text-white selection:bg-white/20">
      <ProfileHeader />
      <RecentOrders orders={orders} />
      <Wishlist wishlistItems={wishlistItems} />
    </main>
  );
}
