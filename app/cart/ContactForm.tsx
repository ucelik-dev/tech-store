'use client'

import React, { useState } from "react";
import { useCartStore } from "../utils/store";
import { Button, Flex, Separator, TextArea, TextField } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { OrderStatus } from "@prisma/client";
import { zodResolver } from '@hookform/resolvers/zod';
import { countryType } from "../utils/types";
import { ContactFormSchema } from "../validationSchemas";

const ContactForm = () => {
  const {products, totalPrice, totalItems, emptyCart} = useCartStore();
  const {data: session} = useSession();
  const router = useRouter();
  const [countryList, setCountryList] = useState<countryType[]>([]);

  const onSubmit = async (formdata: FieldValues) => {
  
    if(!session) { 
      router.push("/"); 
    } else {
      try {
        const res = await fetch("/api/orders", {
          method: "POST",
          body: JSON.stringify({
            price: totalPrice,
            products: products,
            status: OrderStatus.Being_Prepared,
            userEmail: session.user.email,
            address: [{
              firstName: formdata.firstName,
              lastName: formdata.lastName,
              country: formdata.country,
              city: formdata.city,
              postalCode: formdata.postalCode,
              phone: formdata.phone,
              address: formdata.address,
            }],
          }),
        });
        
        const data = await res.json(); 
        router.push(`/orders/${data.id}`);
        emptyCart();
        toast.success('Your order has been completed!', { duration: 5000 })
        router.refresh();
      } catch (error) {
        console.log(error);
      }

    }
}



  const fetchCountries = async () => {
    return fetch("https://countriesnow.space/api/v0.1/countries")
      .then((res) => res.json())
      .then((d) => setCountryList(d.data));
  };
  fetchCountries();
  

  const { register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(ContactFormSchema)});

  return (
    
    <div className='flex h-max p-4 pt-3 flex-col gap-4 border-2 lg:w-1/2 w-full rounded-xl shadow-md'>
      <h1 className="p-1 font-bold pb-0">Contact</h1>
      <Separator orientation="horizontal" size={"4"} className="mb-2"/>
      
      <form onSubmit={handleSubmit(onSubmit)}>
  
      <Flex direction="column" gap={"3"}>
        <Flex gap={"2"} direction={'column'}>
          <TextField.Root>
            <TextField.Input
              type="text"
              placeholder="First name"
              className="block w-full rounded-md border-0 p-1.5 text-sm"
              id="firstName" { ...register('firstName')} 
            />
          </TextField.Root>
          {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message?.toString()}</span>}
          <TextField.Root>
            <TextField.Input
               placeholder="Last name"
               className="block w-full rounded-md border-0 p-1.5 text-sm"
               id="lastName" { ...register('lastName')} 
            />
          </TextField.Root>
          {errors.lastName && <span className="text-sm text-red-500">{errors.lastName.message?.toString()}</span>}
          
          <select
            className="block w-full rounded-md border-0 p-1.5 text-sm ring-1 ring-gray-300 !outline-none dark:bg-black"
            id="country" { ...register('country')} 
          >
            <option value="">Select Country</option>
            {countryList.map((c: any, index) => (
              <option value={c.country} key={index}>
                {c.country}
              </option>
            ))}
          </select>
          {errors.country && <span className="text-sm text-red-500">{errors.country.message?.toString()}</span>}
          
          <TextField.Root>
            <TextField.Input
               placeholder="City"
               className="block w-full rounded-md border-0 p-1.5 text-sm"
               id="city" { ...register('city')} 
            />
          </TextField.Root>
          {errors.city && <span className="text-sm text-red-500">{errors.city.message?.toString()}</span>}
          <TextField.Root>
            <TextField.Input
                placeholder="Postal code"
                className="block w-full rounded-md border-0 p-1.5 text-sm"
                id="postalCode" { ...register('postalCode')} 
            />
          </TextField.Root>
          {errors.postalCode && <span className="text-sm text-red-500">{errors.postalCode.message?.toString()}</span>}
          <TextField.Root>
            <TextField.Input
                type='number'
                placeholder="Phone number"
                className="block w-full rounded-md border-0 p-1.5 text-sm"
                id="phone" { ...register('phone')} 
            />
          </TextField.Root>
          {errors.phone && <span className="text-sm text-red-500">{errors.phone.message?.toString()}</span>}
          <TextArea 
            rows={4}
            placeholder="Address"
            className="block w-full rounded-md border-0 p-1.5 text-sm"
            id="address" { ...register('address')} 
          />
          {errors.address && <span className="text-sm text-red-500">{errors.address.message?.toString()}</span>}
        </Flex>


        <Flex direction={{ initial: "column", sm: "row" }} justify={"center"} gap={'4'}>
          {(totalItems>0 && session) && <Button disabled={totalItems === 0} className="dark:bg-gray-200 dark:text-black">Complete Your Order</Button>}
        </Flex>
        
      </Flex>
      </form>
    </div>

  );
};

export default ContactForm;
