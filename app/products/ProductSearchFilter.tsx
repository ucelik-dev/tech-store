"use client";

import { TextField } from "@radix-ui/themes";
import React from "react";
import { HiMagnifyingGlass } from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";

const ProductSearchFilter = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  return (
    <TextField.Root>
      <TextField.Slot className="dark:bg-gray-200 dark:text-black dark:rounded-l-full">
        <HiMagnifyingGlass className="dark:bg-gray-200 dark:text-black" height="16" width="16" />
      </TextField.Slot>
      <TextField.Input
        className="dark:bg-gray-200 dark:text-black dark:rounded-r-full dark:placeholder-black"
        placeholder="Search…"
        variant="classic"
        radius="full"
        onChange={(e) => {
            const params = new URLSearchParams();
            if (e) params.append('search', e.target.value.toUpperCase());
            if (searchParams.get('category'))
              params.append('category', searchParams.get('category')!);
            router.push('/products?' + params.toString());
        }}
      />
    </TextField.Root>
  );
};

export default ProductSearchFilter;
