import { getProduct } from "@/entities/product/api/get-product";
import { getRecommendations } from "@/entities/product/api/get-recommendations";
import ProductPage from "@/screens/product/ui";
import { Metadata } from "next";

interface Props {
  params: Promise<{ id: string }>;
}

export const metadata: Metadata = {
  title: "Inspect your product",
  description: "Access your private vault of high-fidelity sound.",
};

export default async function Product({ params }: Props) {
  const { id } = await params;

  const product = await getProduct(id);
  const recommendations = await getRecommendations(id);

  return <ProductPage product={product} recommendations={recommendations} />;
}
