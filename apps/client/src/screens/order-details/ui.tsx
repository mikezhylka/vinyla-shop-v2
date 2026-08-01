import { Order } from "@/entities/order";
import Link from "next/link";
import { BackSvg } from "@/shared/ui/back-svg/ui";

interface Props {
  order: Order;
  from?: string;
}

export function OrderDetailsPage({ order, from }: Props) {
  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  const getStatusColor = (status: any) => {
    if (status === 2 || String(status) === "SHIPPING")
      return "bg-yellow-500 animate-pulse";
    if (status === 1 || String(status) === "PAID") return "bg-green-500";
    return "bg-red-500";
  };

  const getShippingMethod = (method: any) => {
    if (method === 0 || String(method) === "FREE_SHIPPING")
      return "Free Shipping";
    if (method === 1 || String(method) === "EXPRESS_SHIPPING")
      return "Express Shipping";
    if (method === 2 || String(method) === "PICK_UP") return "Pick Up";
    return String(method);
  };

  const calculateSubtotal = () => {
    return order.items.reduce(
      (acc, item) => acc + item.priceAtPurchase * item.quantity,
      0,
    );
  };

  const subtotal = calculateSubtotal();
  const shippingCost =
    order.shipping === 1 || String(order.shipping) === "EXPRESS_SHIPPING"
      ? 15
      : 0;
  const total = subtotal + shippingCost;

  return (
    <main className="min-h-screen pt-32 pb-24 bg-body-background text-white selection:bg-white/20">
      <div className="max-w-7xl mx-auto px-8">
        {/* Header & Back button */}
        <div className="mb-12">
          <Link
            href={from === "orders" ? "/profile/orders" : "/profile"}
            className="inline-flex items-center gap-2 text-neutral-gray hover:text-white transition-colors mb-6 text-sm uppercase tracking-widest font-bold"
          >
            <BackSvg />
            {from === "orders" ? "Back to Orders" : "Back to Profile"}
          </Link>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <h1 className="h1 text-white mb-2">Order #{order.id}</h1>
              <p className="text-neutral-gray text-lg">
                Placed on {formattedDate}
              </p>
            </div>
            <div className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-cart-background border border-white/10 text-sm font-bold text-white shadow-lg">
              <span
                className={`w-3 h-3 rounded-full ${getStatusColor(order.status)}`}
              ></span>
              <span className="capitalize tracking-wider">
                {String(order.status).toLowerCase()}
              </span>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Main Column - Items */}
          <div className="flex-1 space-y-6">
            <h2 className="h3 text-white mb-6">Items</h2>
            <div className="space-y-4">
              {order.items.map((item) => (
                <div
                  key={item.id}
                  className="bg-cart-background rounded-2xl border border-white/5 p-6 flex flex-col sm:flex-row gap-6 items-center sm:items-start"
                >
                  <div className="w-full sm:w-28 aspect-square rounded-xl overflow-hidden shrink-0 border border-white/10">
                    <img
                      src={item.product.photo}
                      alt={item.product.name || item.product.name || "Product"}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div className="flex-1 text-center sm:text-left space-y-2">
                    <h3 className="h4 text-white">
                      {item.product.name || item.product.name}
                    </h3>
                    {item.product.genres && (
                      <p className="text-sm text-neutral-gray uppercase tracking-wider">
                        {item.product.genres
                          .map((g: any) => g.name)
                          .join(" • ")}
                      </p>
                    )}
                    <div className="flex items-center justify-center sm:justify-start gap-4 mt-4 text-sm">
                      <span className="text-white/60">
                        Quantity:{" "}
                        <span className="text-white font-bold">
                          {item.quantity}
                        </span>
                      </span>
                      <span className="text-white/20">|</span>
                      <span className="text-white/60">
                        Price:{" "}
                        <span className="text-white font-bold">
                          ${item.priceAtPurchase.toFixed(2)}
                        </span>
                      </span>
                    </div>
                  </div>
                  <div className="sm:text-right mt-4 sm:mt-0">
                    <p className="h3 text-white">
                      ${(item.priceAtPurchase * item.quantity).toFixed(2)}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Sidebar - Details & Summary */}
          <div className="w-full lg:w-96 space-y-6">
            <div className="bg-cart-background rounded-2xl border border-white/5 p-8 space-y-8">
              {/* Shipping Address */}
              {order.address && (
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-neutral-gray mb-4 font-bold">
                    Shipping Address
                  </h3>
                  <div className="text-white space-y-1">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.zip}
                    </p>
                    <p>{order.address.country}</p>
                  </div>
                </div>
              )}

              {/* Contact Info */}
              {order.contact && (
                <div>
                  <h3 className="text-sm uppercase tracking-widest text-neutral-gray mb-4 font-bold">
                    Contact Information
                  </h3>
                  <div className="text-white space-y-1">
                    <p>
                      {order.contact.firstName} {order.contact.lastName}
                    </p>
                    <p className="text-white/70">{order.contact.email}</p>
                    <p className="text-white/70">{order.contact.phone}</p>
                  </div>
                </div>
              )}

              {/* Shipping Method */}
              <div>
                <h3 className="text-sm uppercase tracking-widest text-neutral-gray mb-4 font-bold">
                  Shipping Method
                </h3>
                <p className="text-white">
                  {getShippingMethod(order.shipping)}
                </p>
              </div>

              <div className="border-t border-white/10 pt-8 space-y-4">
                <div className="flex justify-between text-neutral-gray">
                  <span>Subtotal</span>
                  <span className="text-white">${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-neutral-gray">
                  <span>Shipping</span>
                  <span className="text-white">
                    {shippingCost === 0
                      ? "Free"
                      : `$${shippingCost.toFixed(2)}`}
                  </span>
                </div>
                <div className="border-t border-white/10 mt-4 pt-4 flex justify-between items-center">
                  <span className="text-lg font-bold text-white">Total</span>
                  <span className="text-2xl font-bold text-white">
                    ${total.toFixed(2)}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
