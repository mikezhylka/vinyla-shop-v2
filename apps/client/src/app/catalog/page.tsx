import { getGenres } from "@/entities/genre/api/get-genres";
import { Product } from "@/entities/product";
import { searchProducts } from "@/entities/product/api/search-products";
import { CatalogPage } from "@/screens/catalog/ui";
import { SearchParams } from "@/shared/types/search-params";

interface PageProps {
  searchParams: SearchParams;
}

export default async function Page({ searchParams }: PageProps) {
  const { search, genre, sort, page } = await searchParams;

  const params = new URLSearchParams();
  if (search) params.set("search", String(search));
  if (genre) params.set("genre", String(genre));
  if (sort) params.set("sort", String(sort));
  if (page) params.set("page", String(page));

  const { data, meta } = await searchProducts(params.toString());
  const genres = await getGenres();

  return (
    <CatalogPage products={data as Product[]} genres={genres} meta={meta} />
  );
}
