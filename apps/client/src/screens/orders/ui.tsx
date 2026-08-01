"use client";

import { Order } from "@/entities/order";
import Link from "next/link";
import { BackSvg } from "@/shared/ui/back-svg/ui";
import { OrderList } from "@/shared/ui/order-list/ui";

interface Props {
  orders: Order[] | undefined;
}

export function OrdersPage({ orders }: Props) {
  if (!orders?.length) {
    return (
      <main className="min-h-screen pt-32 pb-24 bg-body-background text-white selection:bg-white/20">
        <div className="max-w-7xl mx-auto px-8">
          <Link
            href="/profile"
            className="inline-flex items-center gap-2 text-neutral-gray hover:text-white transition-colors mb-6 text-sm uppercase tracking-widest font-bold"
          >
            <BackSvg />
            Back to Profile
          </Link>
          <h1 className="h1 text-white mb-8">All Orders</h1>
          <div className="bg-cart-background rounded-2xl border border-white/5 p-12 text-center flex flex-col items-center justify-center">
            <div className="w-24 h-24 bg-body-background rounded-full flex items-center justify-center mb-6 border border-white/10">
              <svg
                className="w-10 h-10 text-neutral-gray"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={1.5}
                  d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4"
                />
              </svg>
            </div>
            <h3 className="h3 text-white mb-3">No orders yet</h3>
            <p className="text-neutral-gray mb-8 max-w-md">
              Looks like you haven't made any purchases yet. Explore our huge
              collection of vinyls and find your new favorite record!
            </p>
            <Link href="/catalog">
              <button className="bg-white text-black px-8 py-3 rounded-full text-[16px] font-bold hover:bg-neutral-200 transition-colors hover:cursor-pointer">
                Start Shopping
              </button>
            </Link>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen pt-32 pb-24 bg-body-background text-white selection:bg-white/20">
      <div className="max-w-7xl mx-auto px-8">
        <Link
          href="/profile"
          className="inline-flex items-center gap-2 text-neutral-gray hover:text-white transition-colors mb-6 text-sm uppercase tracking-widest font-bold"
        >
          <BackSvg />
          Back to Profile
        </Link>
        <h1 className="h1 text-white mb-8">All Orders ({orders.length})</h1>

        <div className="space-y-4">
          <OrderList orders={orders} />
        </div>
      </div>
    </main>
  );
}
