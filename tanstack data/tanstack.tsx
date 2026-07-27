import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import React from "react";

export interface productitself {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  tags: string[];
  brand?: string;
  sku: string;
  weight: number;
  dimensions: {
    width: number;
    height: number;
    depth: number;
  };
  warrantyInformation: string;
  shippingInformation: string;
  availabilityStatus: string;
  reviews: {
    rating: number;
    comment: string;
    date: string;
    reviewerName: string;
    reviewerEmail: string;
  };
  returnPolicy: string;
  minimumOrderQuantity: number;
  meta: {
    createdAt: string;
    updatedAt: string;
    barcode: string;
    qrCode: string;
  };
  images: string[];
  thumbnail: string;
}

export interface productshape {
  products: productitself[];
  total: number;
  skip: number;
  limit: number;
}
export interface catagorytype {
  slug: string;
  name: string;
  url: string;
}
const useTanstack = () => {
  const { data: catagorybringing} = useQuery<catagorytype[]>({
    queryKey: ["catagory"],
    queryFn: () =>
      axios
        .get(`https://dummyjson.com/products/categories`)
        .then((res) => res.data),
  });
  return {
    catagorybringing,
  };
};

export default useTanstack;
