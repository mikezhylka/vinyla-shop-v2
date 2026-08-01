import { getOrders } from "@/entities/order/api/get-all";
import { getWishlist } from "@/entities/profile/api/get-wishlist";
import { ProfilePage } from "@/screens/profile/ui";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinyla | My profile",
};

export default async function Profile() {
  const [wishlistItems, orders] = await Promise.all([
    getWishlist(),
    getOrders(),
  ]);

  return (
    <ProfilePage wishlistItems={wishlistItems.data} orders={orders.data} />
  );
}
