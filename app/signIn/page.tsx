'use client'

import { Badge } from '@radix-ui/themes'
import { redirect } from 'next/navigation';
import { FieldValues, useForm } from 'react-hook-form';
import { signIn, useSession } from 'next-auth/react';
import { useState } from 'react';
import Image from 'next/image'

const SignInPage = () => {
  const {data:session} = useSession();
  if(session) { redirect('/products') }

  const { register, handleSubmit, formState: {isSubmitting, errors} } = useForm();
  const [error, setError] = useState('');

  const onSubmit = async (formdata: FieldValues) => {
    const response = await signIn('credentials', {
      email: formdata.email,
      password: formdata.password,
      redirect: false,
    });

    if(response?.error) { setError("Invalid email or password!") }
  }

  return (
    <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0 mt-10 sm:mt-20">
      <div className="flex items-center mb-6 text-2xl font-semibold text-gray-900">
          <Image className="w-8 h-8 mr-2" src="https://res.cloudinary.com/dmwprvrvw/image/upload/v1697979579/TechShop/logo_tech_shop_cropped_i7hq3f.png" width={'20'} height={'20'} alt="logo" />
          Tech Shop    
      </div>
      <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                  Sign in to your account
              </h1>
              <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                  <div>
                      <input type="email" placeholder="Email" { ...register('email')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                      {errors.email && <p className='text-red-500'>{errors.email.message?.toString()}</p>}
                  </div>
                  <div>
                      <input type="password" placeholder="Password" { ...register('password')} className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" />
                      {errors.password && <p className='text-red-500'>{errors.password.message?.toString()}</p>}
                  </div>
                  <button type="submit" className="w-full text-md text-white rounded-lg bg-blue-600 font-medium !px-2 !py-2.5 text-center">Sign in</button>
                  {error && <Badge color='red' size={'2'} className='w-full'>{error}</Badge>}

                  <p className="text-sm font-light text-gray-500">
                      You dont have an account yet? <a href="/signUp" className="font-medium text-primary-600 underline">Sign Up</a>
                  </p>

                  <div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
                    <p className="mx-4 mb-0 text-center">OR</p>
                  </div>

                  <button onClick={() => signIn('google')} className="flex w-full items-center justify-center gap-3 bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-md font-medium text-gray-800 hover:bg-gray-100 focus:outline-none">
                    <svg x="0px" y="0px" width="20" height="20" viewBox="0 0 48 48">
                      <path fill="#fbc02d" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12	s5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24s8.955,20,20,20	s20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#e53935" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039	l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4caf50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36	c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1565c0" d="M43.611,20.083L43.595,20L42,20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571	c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                    <span>Sign in with Google</span>
                </button>
              </form>
          </div>
      </div>
    </div>
  )
}

export default SignInPage