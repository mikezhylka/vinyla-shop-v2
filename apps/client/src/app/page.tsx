import getPopularProducts from "@/entities/product/api/get-popular-products";
import HomePage from "@/screens/home/ui";

export default async function Home() {
  const popularProducts = await getPopularProducts();

  return <HomePage popularProducts={popularProducts} />;
}
