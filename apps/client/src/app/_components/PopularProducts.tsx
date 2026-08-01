import { Product } from "@/entities/product";
import ProductCard from "@/entities/product/ui/product-card";

interface Props {
  products: Product[];
  gridClasses: string[];
}

export default function PopularProducts({ products, gridClasses }: Props) {
  return (
    <>
      {products.map((product, index) => (
        <ProductCard
          key={product.id}
          product={product}
          className={gridClasses[index]}
        />
      ))}
    </>
  );
}
