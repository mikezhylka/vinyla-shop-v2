import { Order } from "@/entities/order";
import { OrderList } from "@/shared/ui/order-list/ui";
import Link from "next/link";

interface Props {
  orders: Order[] | undefined;
}

export default function RecentOrders({ orders }: Props) {
  if (!orders?.length) {
    return (
      <section className="px-8 mb-24 max-w-7xl mx-auto">
        <div className="flex justify-between items-end mb-8">
          <h2 className="h2 text-white">Recent Orders</h2>
        </div>
        <div className="flex flex-col items-center justify-center py-24 border border-white/10 rounded-3xl bg-white/2">
          <h3 className="font-headline text-3xl lg:text-4xl font-extrabold uppercase tracking-tighter text-white mb-8 text-center max-w-lg">
            No orders yet
          </h3>
          <Link
            className="whitespace-nowrap rounded-full bg-primary px-8 py-4 text-center text-[12px] font-bold uppercase tracking-widest text-on-primary transition-colors duration-200 hover:bg-primary/80 active:scale-95"
            href="/catalog"
          >
            Start Shopping
          </Link>
        </div>
      </section>
    );
  }

  const sortedOrders = [...orders].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
  );

  const displayOrders = sortedOrders.slice(0, 3);
  const hasMoreOrders = orders.length > 3;

  return (
    <section className="px-8 mb-24 max-w-7xl mx-auto">
      <div className="flex justify-between items-end mb-8">
        <h2 className="h2 text-white">Recent Orders</h2>
        {hasMoreOrders && (
          <Link
            className="text-white text-xs tracking-widest uppercase hover:underline font-bold"
            href="/profile/orders"
          >
            View Full History
          </Link>
        )}
      </div>

      <div className="space-y-4">
        <OrderList orders={displayOrders} />

        {hasMoreOrders && (
          <div className="pt-6 relative">
            <div className="relative flex justify-center">
              <Link href="/profile/orders">
                <button className="bg-body-background px-6 py-2 text-white/70 hover:text-white hover:bg-white/5 border border-white/10 transition-colors text-sm font-bold tracking-widest uppercase rounded-full flex items-center gap-2">
                  Show all {orders.length} orders
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
