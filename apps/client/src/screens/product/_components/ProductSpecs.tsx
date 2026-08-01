"use client";

import { Product } from "@/entities/product";

interface Props {
  product: Product;
}

export function ProductSpecs({ product }: Props) {
  const { barcode, label } = product;

  function createSpec(title: string, value: string | number) {
    return {
      title,
      value,
    };
  }

  const specs = [createSpec("LABEL", label), createSpec("BARCODE", barcode)];

  return (
    <div className="border-t border-outline-variant/30 pt-2 space-y-4">
      <div className="flex justify-between flex-col gap-2 items-center py-2 border-b border-outline-variant/20">
        {specs.map((s) => (
          <div
            key={s.title}
            className="w-full flex justify-between items-center"
          >
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">
              {s.title}
            </span>
            <span className="text-base text-white flex items-center gap-1">
              {s.value}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
