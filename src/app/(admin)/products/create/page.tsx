"use client";
import ProductForm from "@/components/ProductForm";
import { NewProductInfo } from "@/types";
import { uploadImage } from "@/utils/helper";
import { newProductInfoSchema } from "@/utils/validationSchema";
import React from "react";
import { toast } from "react-toastify";
import { ValidationError } from "yup";
import { createProduct } from "../action";
import { useRouter } from "next/navigation";

export default function Create() {
  const router = useRouter();

  const handleCreateProduct = async (values: NewProductInfo) => {
    try {
      const { thumbnail, images } = values;
      await newProductInfoSchema.validate(values, { abortEarly: false });
      const thumbnailRes = await uploadImage(thumbnail!);

      let productImages: { url: string; id: string }[] = [];
      if (images) {
        const uploadPromise = images.map(async (imageFile) => {
          const { id, url } = await uploadImage(imageFile);
          return { id, url };
        });

        productImages = await Promise.all(uploadPromise);
      }

      await createProduct({
        ...values,
        price: {
          base: values.mrp,
          discounted: values.salePrice,
        },
        thumbnail: thumbnailRes,
        images: productImages,
      });
      router.refresh();
      router.push("/products");
      toast.success(`${values.title} has been created successfully!`);
    } catch (error) {
      if (error instanceof ValidationError) {
        error.inner.map((err) => {
          toast.error(err.message);
        });
      }
    }
  };

  return (
    <div>
      <ProductForm onSubmit={handleCreateProduct} />
    </div>
  );
}
