'use client'

import React, { useState } from "react";
import { useCartStore } from "../utils/store";
import { Button, Flex, Separator } from "@radix-ui/themes";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { FieldValues, useForm } from "react-hook-form";
import { OrderStatus } from "@prisma/client";
import { zodResolver } from '@hookform/resolvers/zod';
import { countryType } from "../utils/types";
import { ContactFormSchema } from "../validationSchemas";

interface Props {
  openContact: Boolean, 
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>,
}

const ContactForm = ({openContact, setOpenContact} : Props) => {
  const {products, totalPrice, totalItems, emptyCart} = useCartStore();
  const {data: session} = useSession();
  const router = useRouter();
  const [countryList, setCountryList] = useState<countryType[]>([]);

  const onSubmit = async (formdata: FieldValues) => {
  
    if(!session) { 
      router.push("/"); 
    } else {
      try {
        const res = await fetch("http://localhost:3000/api/orders", {
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


  if (openContact) {
    const fetchCountries = async () => {
      return fetch("https://countriesnow.space/api/v0.1/countries")
        .then((res) => res.json())
        .then((d) => setCountryList(d.data));
    };
    fetchCountries();
  }

  const { register, handleSubmit, formState: {errors} } = useForm({resolver: zodResolver(ContactFormSchema)});

  return (
    
    <div className="flex h-[100vh-5rem] p-4 pt-3 flex-col gap-4 rounded-xl border-2 shadow-md">
      <form onSubmit={handleSubmit(onSubmit)}>
      <h1 className="p-1 font-bold">Contact Information</h1>
      <Separator orientation="horizontal" size={"4"} />
      <Flex direction="column" gap={"3"}>
        <Flex gap={"2"} direction={'column'}>
          <input
            type="text"
            placeholder="First name"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  border-gray-300 text-sm"
            id="firstName" { ...register('firstName')} 
          />
          {errors.firstName && <span className="text-sm text-red-500">{errors.firstName.message?.toString()}</span>}
          <input
            placeholder="Last name"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  border-gray-300 text-sm"
            id="lastName" { ...register('lastName')} 
          />
          {errors.lastName && <span className="text-sm text-red-500">{errors.lastName.message?.toString()}</span>}
          <select
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  border-gray-300 text-sm"
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
          <input
            placeholder="City"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  border-gray-300 text-sm"
            id="city" { ...register('city')} 
          />
          {errors.city && <span className="text-sm text-red-500">{errors.city.message?.toString()}</span>}
          <input
            placeholder="Postal code"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  border-gray-300 text-sm"
            id="postalCode" { ...register('postalCode')} 
          />
          {errors.postalCode && <span className="text-sm text-red-500">{errors.postalCode.message?.toString()}</span>}
          <input
            type='number'
            placeholder="Phone number"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  border-gray-300 text-sm"
            id="phone" { ...register('phone')} 
          />
          {errors.phone && <span className="text-sm text-red-500">{errors.phone.message?.toString()}</span>}
          <textarea
            rows={4}
            placeholder="Address"
            className="block w-full rounded-md border-0 p-1.5 text-gray-900 ring-1 ring-inset ring-gray-300  border-gray-300 text-sm"
            id="address" { ...register('address')} 
          />
          {errors.address && <span className="text-sm text-red-500">{errors.address.message?.toString()}</span>}
        </Flex>


        <Flex direction={{ initial: "column", sm: "row" }} justify={"center"} gap={'4'}>
          <Button onClick={() => setOpenContact(false)}>Go Back</Button>
          <Button disabled={totalItems === 0}>Complete Your Order</Button>
        </Flex>
        
      </Flex>
      </form>
    </div>

  );
};

export default ContactForm;
