"use client";

import { Button } from "@radix-ui/themes";
import { Product } from "@prisma/client";
import { useCartStore } from "@/app/utils/store";
import { useState } from "react";
import { BiSolidCartAdd } from "react-icons/bi";

const AddToCartButton = ({ product }: { product: Product }) => {
  const { addToCart } = useCartStore();
  const [total] = useState(product.price);
  const [quantity] = useState(1);

  return (
    <Button
      className="hover:cursor-pointer dark:bg-gray-200 dark:text-black"
      size="2"
      onClick={() => {
        addToCart({
          id: product.id,
          title: product.title,
          imgUrl: product.imgUrl,
          price: total,
          category: product.category,
          quantity: quantity,
        })
      }
      }
    >
      <BiSolidCartAdd size={25}/>
    </Button>
  );
};

export default AddToCartButton;
