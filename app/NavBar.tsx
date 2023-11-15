"use client";

import { Avatar, Badge, Button, Container, DropdownMenu, Flex, Text, Separator } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import Skeleton from "./components/Skeleton";
import { useCartStore } from "./utils/store";
import { BiCart } from 'react-icons/bi'
import { IoIosCall } from "react-icons/io";
import { MdEmail } from "react-icons/md";
import { RxHamburgerMenu  } from "react-icons/rx";
import formatCurrency from "./utils/formatCurrency";
import AppThemeSwitcher from "./theme/AppThemeSwitcher";
import { MdClose } from "react-icons/md";
import { MdLogout } from "react-icons/md";
import { FaUser } from "react-icons/fa";



const NavBar = () => {
  const { totalItems, totalPrice } = useCartStore();
  const currentPath = usePathname();
  const { status, data: session } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false); 
  const theme = localStorage.getItem("theme");

  useEffect(() => { useCartStore.persist.rehydrate() },[]);

  return (
    <>
    <nav className="border-b shadow-md mb-5 p-4 pt-2 flex-no-wrap z-10 fixed top-0 flex w-full items-center justify-between bg-gray-50 dark:bg-black">
      <Container>

        <Flex className="mb-6 !hidden md:!flex" justify={'between'}>
          <Flex align={'center'} gap={'2'}><IoIosCall />+383 45 665 889</Flex>
          <Flex align={'center'} gap={'2'} justify={'center'}>
            <Badge color="indigo" variant="solid" highContrast radius="full" size={'1'}>Free Shipping over {formatCurrency(100)}</Badge>
          </Flex>
          <Flex align={'center'} gap={'2'}><MdEmail />info@techstore.com</Flex>
        </Flex>

        <Flex justify={'between'} align={'center'} className="mt-4">
          <Flex gap={'3'} align={'center'} >
            {isMenuOpen 
              ? <MdClose size={'30'} onClick={() => setIsMenuOpen(!isMenuOpen)} className="!flex md:!hidden"/> 
              : <RxHamburgerMenu size={'30'} onClick={() => setIsMenuOpen(!isMenuOpen)} className="!flex md:!hidden"/>}
            
            <Link href="/"> 
              <Image 
                src={'https://res.cloudinary.com/dmwprvrvw/image/upload/v1697979579/TechShop/tech-store-logo_fnuwwb.png'}
                width={110} height={20} alt="" loading="eager" priority={true} className="w-15 h-7"
              />
            </Link>
            
            <ul className="gap-6 ml-5 !hidden md:!flex">
                <Link className={`${ '/products' === currentPath ? "font-bold" : "font-normal" } text-sm transition-colors`}
                  href='/products'>PRODUCTS</Link>
                {status === 'authenticated' && 
                <Link className={`${ '/orders' === currentPath ? "font-bold" : "font-normal" } text-sm transition-colors`}
                  href='/orders'>ORDERS</Link>
                }
            </ul>
          </Flex>

          <Flex justify={'between'} align={'center'} gap={'5'} position={'relative'}>
            <Link href="/cart" className="flex items-center gap-2 min-w-max">
              <BiCart size={25}/>
              
              <Badge variant="solid" radius="full"
                className="absolute flex justify-center align-center text-xs dark:bg-gray-200 dark:text-black bottom-6 sm:bottom-7" 
                style={{ width: "1.2rem", height: "1.2rem", position:"absolute", left:0, transform:"translate(25%, 25%)" }}
              >{totalItems}</Badge>

              <span className="font-bold">{formatCurrency(totalPrice)}</span>
            </Link>

            <div className="!hidden sm:!flex"><AppThemeSwitcher/></div>

            { status === "authenticated" && (
              <div className="!hidden sm:!flex">
                <DropdownMenu.Root>
                    <DropdownMenu.Trigger className="cursor-pointer">
                      <Avatar className="dark:bg-gray-200 dark:color-white dark:rounded-full" src={session.user?.image ? session.user?.image : 'https://res.cloudinary.com/dmwprvrvw/image/upload/v1697979579/TechShop/user-icon_eylev2.png' } fallback="" size={'2'} referrerPolicy="no-referrer"/>
                    </DropdownMenu.Trigger>
                    <DropdownMenu.Content>
                      <DropdownMenu.Label>
                        <Text size={'2'}>{session.user!.name} <br/> {session.user!.email}</Text>
                      </DropdownMenu.Label>
                      <Link href={'/profile'}>
                        <DropdownMenu.Item className="mt-3 dark:hover:bg-gray-200 dark:hover:text-black !cursor-pointer">
                          My Profile
                        </DropdownMenu.Item>
                      </Link>
                      <Link href={'/api/auth/signout'}>
                        <DropdownMenu.Item className="dark:hover:bg-gray-200 dark:hover:text-black !cursor-pointer">
                          Logout
                        </DropdownMenu.Item>
                      </Link>
                    </DropdownMenu.Content>
                </DropdownMenu.Root>
              </div>
            )}

            { status === "unauthenticated" && 
              <div>
                <Link href={'/signIn'}>
                  <Button radius="large" className="dark:bg-gray-200 dark:text-black !cursor-pointer">Login</Button>
                </Link>
              </div>}
            { status === "loading" && <Skeleton width={'2rem'} height={'1.75rem'}/> }
            
          </Flex>
        </Flex>
      </Container>
    </nav>

    {isMenuOpen && 
      <section className="flex md:hidden absolute z-50 bg-blue-600 w-full h-full mt-[3.5rem]">
        <Flex direction={'column'} justify={"between"} className=" min-w-full"> 

          <Flex className="gap-6 px-5 mt-5 w-full text-gray-200" direction={'column'}>
               <Link className='text-sm transition-colors font-bold'
                  href='/products' onClick={() => setIsMenuOpen(false)}>PRODUCTS</Link>
                <Separator orientation="horizontal" size={"4"} />
                {status === 'authenticated' && 
                <Link className='text-sm transition-colors font-bold'
                  href='/orders' onClick={() => setIsMenuOpen(false)}>ORDERS</Link>
                }
                <Separator orientation="horizontal" size={"4"}/>
          </Flex>

          <Flex className="px-5 mb-2" justify={'between'} direction={'column'} gap={'2'}>
              <Link href={'/api/auth/signout'} className="flex justify-center align-center gap-2 text-black bg-gray-200 px-2 py-1 rounded-md !cursor-pointer"><MdLogout size={'23'} />Logout</Link>  
              <Link href={'/profile'} onClick={() => setIsMenuOpen(false)} className="flex justify-center align-center gap-2 text-black bg-gray-200 px-2 py-1 rounded-md !cursor-pointer"><FaUser size={'20'} />My Profile</Link>  
              <Flex align={'center'} gap={'2'} justify={'center'} className="text-black bg-gray-200 px-2 py-1 rounded-md">Change Theme <AppThemeSwitcher/></Flex>
              <Flex align={'center'} gap={'2'} justify={'center'} className="text-black bg-gray-200 px-2 py-1 rounded-md"><IoIosCall />+383 45 665 889</Flex>
              <Flex align={'center'} gap={'2'} justify={'center'} className="text-black bg-gray-200 px-2 py-1 rounded-md"><MdEmail />info@techstore.com</Flex>
              <Badge color="indigo" variant="solid" highContrast radius="large" size={'2'} className="justify-center">Free Shipping over {formatCurrency(100)}</Badge>
          </Flex>

        </Flex>
      </section>
    }
</>
  );
};

export default NavBar;
