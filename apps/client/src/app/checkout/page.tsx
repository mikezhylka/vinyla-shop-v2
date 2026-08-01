import { CheckoutPage } from "@/screens/checkout/ui";
import StripeProvider from "../StripeProvider";

export default function Checkout() {
  return (
    <main className="px-5">
      <StripeProvider>
        <CheckoutPage />
      </StripeProvider>
    </main>
  );
}
