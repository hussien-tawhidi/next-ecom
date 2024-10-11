import FeaturedProductForm from "@/components/FeaturedProductForm";
import FeaturedProductTable from "@/components/FeaturedProductTable";
import startDb from "@/lib/db";
import FeaturedProductModel from "@/models/featuredProduct";
import React from "react";

const fetchFeaturedProducts = async () => {
  await startDb();
  const products = await FeaturedProductModel.find();
  return products.map((product) => {
    return {
      // @ts-ignore

      id: product._id.toString(),
      title: product.title,
      link: product.link,
      linkTitle: product.linkTitle,
      banner: product.banner.url,
    };
  });
};

export default async function AddFeaturedProduct() {
  const featuredProducts = await fetchFeaturedProducts();
  return (
    <div>
      <FeaturedProductForm />
      <FeaturedProductTable products={featuredProducts} />
    </div>
  );
}
