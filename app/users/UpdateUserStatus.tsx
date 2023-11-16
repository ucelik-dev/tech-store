'use client'

import { FormEvent, useState } from 'react';
import { useRouter } from "next/navigation";
import { toast } from 'react-hot-toast';
import { UserType } from '../types/types';
import { Badge } from '@radix-ui/themes';

const UpdateOrderStatus = ({ user }: { user: UserType }) => {
  const [selectStatus, setSelectStatus] = useState(user.isAdmin);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>, id: number) => {
    e.preventDefault();

    const res = await fetch("/api/users/" + user.id, {
      method: "PUT",
      body: JSON.stringify({
        isAdmin: selectStatus,
      }),
    });
    const data = await res.json();
    if(data) toast.success("User role changed!");
    else toast.error("Update error!");
    router.push('/users');
    router.refresh();
  };
        
  return (
    <form
        className="flex items-center justify-start gap-4"
        onSubmit={(e) => handleSubmit(e, user.id)}
        >

        <button className='!cursor-pointer hover:cursor-pointer'
              
          type='submit'
          onClick={() => setSelectStatus(!selectStatus)}>
            <Badge 
              className='!cursor-pointer hover:cursor-pointer' variant='soft'
              color={`${user.isAdmin ? 'green' : 'red'}`}
            >{user.isAdmin ? 'True' : 'False'}</Badge>
          </button>
        
    </form>
  );
};

export default UpdateOrderStatus;