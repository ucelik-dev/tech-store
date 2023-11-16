'use client'

import { zodResolver } from '@hookform/resolvers/zod';
import { Badge } from '@radix-ui/themes'
import { redirect, useRouter } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { SignUpFormSchema } from '../validationSchemas';
import { useSession } from 'next-auth/react';
import { useState } from 'react';

const SignUpPage = () => {
  const {data:session} = useSession();
  if(session) { redirect('/products?category=Other') }
  
  const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm({resolver: zodResolver(SignUpFormSchema)});
  const router = useRouter();
  const [error, setError] = useState('');

  const onSubmit = async (formdata: FieldValues) => {
    
    const response = await fetch("/api/auth/signUp", {
      method: "POST",
      body: JSON.stringify({
        name: formdata.name,
        email: formdata.email,
        password: formdata.password,
      }),
    });

    if(response.status === 409) {
      setError("User with this email already exists!");
    }
    if(response.status === 201) {
      router.push('/signIn')
      toast.success("New user created successfully.", { duration: 3000 });
    }

  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-10 sm:mt-20">
      <div className="w-full bg-white dark:bg-gray-400 rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-gray-700">
                  Create an account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                      <input type="text" placeholder="Full Name" { ...register('name')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                      {errors.name && <p className='text-red-500'>{errors.name.message?.toString()}</p>}
                  </div>
                  <div>
                      <input type="email" placeholder="Email" { ...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                      {errors.email && <p className='text-red-500'>{errors.email.message?.toString()}</p>}
                  </div>
                  <div>
                      <input type="password" placeholder="Password" { ...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                      {errors.password && <p className='text-red-500'>{errors.password.message?.toString()}</p>}
                  </div>
                  <button type="submit" className="w-full text-md text-white rounded-lg bg-blue-600 font-medium !px-2 !py-2.5 text-center dark:bg-gray-200 dark:text-black">Sign up</button>
                  {error && <Badge color='red' size={'2'} className='w-full'>{error}</Badge>}

                  <p className="text-sm font-light text-gray-500 dark:text-gray-700">
                      You already have an account? <a href="/signIn" className="font-medium text-primary-600 underline">Sign In</a>
                  </p>
              </form>
          </div>
      </div>
    </div>
  )
}

export default SignUpPage