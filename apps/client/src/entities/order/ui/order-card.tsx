import Link from "next/link";
import { Order } from "../model/types";

interface Props {
  order: Order;
  isOrdersPage: boolean;
}

export function OrderCard({ order, isOrdersPage }: Props) {
  const maxImages = 3;

  const { items } = order;

  const formattedDate = new Date(order.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
  });

  return (
    <div
      key={order.id}
      className="bg-cart-background rounded-xl border border-white/5 overflow-hidden hover:border-white/10 transition-colors"
    >
      <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8 items-center md:items-start">
        <div className="w-full md:w-36 aspect-square relative flex items-center justify-center shrink-0">
          {items.slice(0, maxImages).map((item, index) => (
            <div
              key={item.id}
              className="absolute rounded-lg overflow-hidden border-2 border-cart-background shadow-2xl transition-transform"
              style={{
                width: "85%",
                height: "85%",
                zIndex: 10 - index,
                transform: `translate(${index * 12}px, ${
                  index * 12
                }px) scale(${1 - index * 0.05})`,
                opacity: 1 - index * 0.15,
              }}
            >
              <img
                className="w-full h-full object-cover"
                alt={item.product.name || "Vinyl cover"}
                src={item.product.photo}
              />
            </div>
          ))}
          {items.length > maxImages && (
            <div
              className="absolute z-20 rounded-full bg-black/80 backdrop-blur-md border border-white/10 text-white font-bold text-xs w-9 h-9 flex items-center justify-center shadow-lg"
              style={{ bottom: "5%", right: "5%" }}
            >
              +{items.length - maxImages}
            </div>
          )}
        </div>

        <div className="flex-1 space-y-4 text-center md:text-left md:mt-2">
          <div className="flex flex-wrap justify-center md:justify-start gap-4 small-text uppercase tracking-widest text-neutral-gray">
            <span>Order #{order.id}</span>
            <span>Placed {formattedDate}</span>
          </div>

          <div className="space-y-1.5">
            {items.slice(0, 2).map((item) => (
              <h3 key={item.id} className="h4 text-white line-clamp-1 group">
                {item.product.name}{" "}
                {item.quantity > 1 && (
                  <span className="text-neutral-gray text-sm font-normal ml-1">
                    x{item.quantity}
                  </span>
                )}
              </h3>
            ))}
            {items.length > 2 && (
              <p className="text-neutral-gray text-sm italic mt-2">
                and {items.length - 2} more item
                {items.length - 2 > 1 ? "s" : ""}...
              </p>
            )}
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-body-background border border-white/5 text-xs font-medium text-white shadow-inner">
            <span
              className={`w-2 h-2 rounded-full ${
                order.status === 2 || String(order.status) === "SHIPPING"
                  ? "bg-yellow-500 animate-pulse"
                  : order.status === 1 || String(order.status) === "PAID"
                    ? "bg-green-500"
                    : "bg-red-500"
              }`}
            ></span>
            <span className="capitalize">
              {String(order.status).toLowerCase()}
            </span>
          </div>
        </div>

        <div className="flex flex-col self-center gap-3 w-full md:w-auto md:mt-4 hover:cursor-pointer">
          <Link
            href={`/profile/orders/${order.id}${isOrdersPage ? "?from=orders" : ""}`}
          >
            <button className="bg-white text-black px-8 py-3 rounded-full text-[15px] font-bold hover:bg-neutral-200 transition-colors shadow-lg hover:cursor-pointer">
              Order Details
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}
