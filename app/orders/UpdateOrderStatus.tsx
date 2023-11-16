'use client'

import { FormEvent, useState } from 'react';
import { orderStatusOptions } from '../utils/store';
import { useRouter } from "next/navigation";
import { AiFillSave } from 'react-icons/ai';
import { toast } from 'react-hot-toast';
import { OrderStatus } from "@prisma/client";
import { OrderType } from '../types/types';

const UpdateOrderStatus = ({ order }: { order: OrderType }) => {
  const [selectStatus, setSelectStatus] = useState(order.status);
  const router = useRouter();

  const handleChange = (e:React.ChangeEvent<HTMLSelectElement>) => {
    setSelectStatus(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    const res = await fetch("/api/orders/" + order.id, {
      method: "PUT",
      body: JSON.stringify({
        status: selectStatus,
      }),
    });
    const data = await res.json();
    if(data) toast.success("Order status changed!");
    else toast.error("Update error!");
    router.push('/orders');
    router.refresh();
  };
        
  return (
    <form
        className="flex items-center justify-start gap-4"
        onSubmit={(e) => handleSubmit(e, order.id)}
        >
        
        <select
          className={`px-1.5 py-1.3 sm:p-1.5 rounded-md w-full !cursor-pointer outline-none text-white
                ${order.status === OrderStatus.Delivered && " bg-green-500 "}
                ${order.status === OrderStatus.Being_Prepared && "bg-orange-500 "}
                ${order.status === OrderStatus.Cancelled && "bg-red-500 "}
          `}
          onChange={handleChange}
        >
            <option value={order.status}>{order.status === OrderStatus.Being_Prepared ? 'Being Prepared' : order.status }</option>
            {orderStatusOptions.map((opt) => opt !== order.status ? <option value={opt} key={opt}>{opt === 'Being_Prepared' ? 'Being Prepared' : opt}</option> : '')}
        </select>
        
        <button 
              className={`p-1.5 rounded-full
                ${order.status === OrderStatus.Delivered && "bg-green-500"}
                ${order.status === OrderStatus.Being_Prepared && "bg-orange-500"}
                ${order.status === OrderStatus.Cancelled && "bg-red-500"}
              `}
              type='submit'
              ><AiFillSave color="white" size={20}/>
        </button>
    </form>
  );
};

export default UpdateOrderStatus;