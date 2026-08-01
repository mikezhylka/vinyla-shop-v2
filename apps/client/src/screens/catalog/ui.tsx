import { Product } from "@/entities/product";
import Filter from "./_components/Filter";
import { Pagination } from "./_components/Pagination";
import { Products } from "./_components/Products";
import { Genre } from "@/entities/genre";

interface Meta {
  total: number;
  page: number;
  pageCount: number;
  pageSize: number;
}

interface Props {
  products: Product[];
  genres: Genre[];
  meta?: Meta;
}

export function CatalogPage({ products, genres, meta }: Props) {
  return (
    <main className="my-20">
      <Filter genres={genres} />
      <Products products={products} />
      {meta && meta.pageCount > 1 && (
        <Pagination page={meta.page} pageCount={meta.pageCount} />
      )}
    </main>
  );
}
