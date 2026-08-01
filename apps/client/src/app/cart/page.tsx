import { getCart } from "@/entities/cart/api/get-cart";
import { CartPage } from "@/screens/cart/ui";

export default async function Cart() {
  const cartProducts = await getCart();

  return <CartPage cartProducts={cartProducts.data || []} />;
}
