"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Product } from "@prisma/client";
import { Button, TextField } from "@radix-ui/themes";
import "easymde/dist/easymde.min.css";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import SimpleMDE from "react-simplemde-editor";
import SpinnerButton from "../components/SpinnerButton";
import { categories } from "../utils/store";
import toast from "react-hot-toast";
import { ProductFormSchema } from "../validationSchemas";


const ProductForm = ({product}: { product?: Product}) => {
  const {  register, handleSubmit, formState: {isSubmitting, errors} } = useForm({resolver: zodResolver(ProductFormSchema)});

  const router = useRouter();

  const [details, setDetails] = useState<String>();


  const [file, setFile] = useState<File>();

  const handleChangeImg = (e:React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target as HTMLInputElement;
    const item = (target.files as FileList)[0];
    setFile(item);
  }


  const upload = async () => {
    const formData = new FormData();
    formData.append("file", file!);
    formData.append("api_key", `${process.env.CLOUDINARY_API_KEY}`);
    formData.append("api_secret", `${process.env.CLOUDINARY_API_SECRET}`);
    formData.append("upload_preset", "TechShop");

    const response = await fetch("https://api.cloudinary.com/v1_1/dmwprvrvw/image/upload", {
      method:"POST",
      body: formData,
    });

    const responseData = await response.json();
    return responseData.url;
  }

  const onSubmit = async (formdata: FieldValues) => {
  
      try {

        if(product){

          if(file) {
            const url = await upload();
            const res = await fetch("/api/products/" + product.id, {
              method: "PATCH",
              body: JSON.stringify({
                imgUrl: url,
                title: formdata.title,
                price: formdata.price,
                category: formdata.category,
                details: details,
              }),
            });
            const data = await res.json();
            if(data) toast.success('The product is updated!');
            else toast.error('Update error!')
            router.push(`/products/${data.id}`);
            router.refresh();
          } else {
            const res = await fetch("/api/products/" + product.id, {
              method: "PATCH",
              body: JSON.stringify({
                title: formdata.title,
                price: formdata.price,
                category: formdata.category,
                details: details,
              }),
            });
            const data = await res.json();
            if(data) toast.success('The product is updated!');
            else toast.error('Update error!')
            router.push(`/products/${data.id}`);
            router.refresh();
          }

          
          
        } else {
          const url = await upload();
          const res = await fetch("/api/products", {
            method: "POST",
            body: JSON.stringify({
              imgUrl: url,
              title: formdata.title,
              price: formdata.price,
              category: formdata.category,
              details: details,
            }),
          });
          const data = await res.json();
          if(data) toast.success('The new product is added!');
          else toast.error('The new product could not be added!')
          router.push(`/products/${data.id}`);
        }
        
      } catch (error) {
        console.log(error);
      }
  }

  return (
    <div className="max-w-xl">

      <form
        className="space-y-3"
        onSubmit={handleSubmit(onSubmit)}
      >
        <input type="file" 
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300 text-sm" 
           onChange={handleChangeImg} 
        />

        <TextField.Root>
          <TextField.Input defaultValue={product?.title} placeholder="Title" id="title" { ...register('title')} />
        </TextField.Root>
        {errors.title && <p color="red">{errors.title.message?.toString()}</p>}

        <TextField.Root>
          <TextField.Input type="number" defaultValue={product?.price} placeholder="Price" id="price" { ...register('price', { valueAsNumber: true})}  />
        </TextField.Root>
        {errors.price && <p color="red">{errors.price.message?.toString()}</p>}

        <select id="category" { ...register('category')}  defaultValue={product?.category}
            className="block w-full rounded-md p-1.5 text-sm ring-1 ring-gray-300 !outline-none dark:bg-black">
              <option value={product?.category}>{product?.category}</option>
              {categories.filter((opt) => (opt.value !== product?.category && opt.value !== 'Other')).map(option => (
                <option key={option.value} value={option.value}>
                  {option.text} 
                </option>
              ))}
        </select>
        {errors.category && <p color="red">{errors.category.message?.toString()}</p>}

        <SimpleMDE value={product?.details} placeholder="Product details..." onChange={(value: string) => setDetails(value)} />

        <Button disabled={isSubmitting} className="dark:bg-gray-200 dark:text-black">
          {product ? 'Update Product':'Add New Product'} {isSubmitting && <SpinnerButton/>}</Button>
      </form>
    </div>
  );
};

export default ProductForm;
