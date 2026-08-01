import { getWishlist } from "@/entities/profile/api/get-wishlist";
import { WishlistPage } from "@/screens/wishlist";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Vinyla | My wishlist",
};

export default async function Wishlist() {
  const wishlist = await getWishlist();

  return <WishlistPage wishlistItems={wishlist.data} />;
}
