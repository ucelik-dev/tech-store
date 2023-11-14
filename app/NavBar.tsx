"use client";

import { Avatar, Badge, Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect } from "react";
import Skeleton from "./components/Skeleton";
import { useCartStore } from "./utils/store";
import { BiCart } from 'react-icons/bi'
import formatCurrency from "./utils/formatCurrency";
import ThemeSwitcher from "./theme/AppThemeSwitcher";

const NavBar = () => {
  const { totalItems, totalPrice } = useCartStore();
  const currentPath = usePathname();
  const { status, data: session } = useSession();

  useEffect(() => { useCartStore.persist.rehydrate() },[]);

  return (
    <nav className="border-b shadow-md mb-5 p-4 flex-no-wrap z-10 fixed top-0 flex w-full items-center justify-between bg-gray-50 dark:bg-black">
      <Container>
        <Flex justify={'between'} align={'center'}>
          <Flex gap={'3'} align={'center'}>
            <Link href="/">
              <Image 
                src={'https://res.cloudinary.com/dmwprvrvw/image/upload/v1697979579/TechShop/logo_tech_shop_cropped_i7hq3f.png'}
                width={20} height={20} alt="" loading="eager" priority={true} className="w-7 h-7"
              />
            </Link>
            <ul className="flex gap-6">
                <Link className={`${ '/products' === currentPath ? "font-bold" : "font-normal" } hover:font-normal transition-colors`}
                  href='/products?category=Other'>Products</Link>
                {status === 'authenticated' && 
                <Link className={`${ '/orders' === currentPath ? "font-bold" : "font-normal" } hover:font-normal transition-colors`}
                  href='/orders'>Orders</Link>
                }
            </ul>

            
          </Flex>

          <Flex justify={'between'} align={'center'} gap={'5'} position={'relative'}>
            <Link href="/cart" className="flex items-center gap-2 min-w-max">
              <BiCart size={25}/>
              
              <Badge variant="solid" radius="full"
                className="absolute flex justify-center align-center text-xs dark:bg-gray-200 dark:text-black" 
                style={{ width: "1.2rem", height: "1.2rem", position:"absolute", top:-15, left:0, transform:"translate(25%, 25%)" }}
              >{totalItems}</Badge>

              <span className="font-bold">{formatCurrency(totalPrice)}</span>
            </Link>

            <ThemeSwitcher/>

            { status === "authenticated" && (
              //<Link href={'/api/auth/signout'}>Logout</Link>}
              <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="cursor-pointer">
                    <Avatar className="dark:bg-gray-200 dark:color-white dark:rounded-full" src={session.user?.image ? session.user?.image : 'https://res.cloudinary.com/dmwprvrvw/image/upload/v1697979579/TechShop/user-icon_eylev2.png' } fallback="" size={'2'} referrerPolicy="no-referrer"/>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      <Text size={'2'}>{session.user!.name} <br/> {session.user!.email}</Text>
                    </DropdownMenu.Label>
                    <Link href={'/api/auth/signout'}>
                      <DropdownMenu.Item className="mt-3 dark:hover:bg-gray-200 dark:hover:text-black !cursor-pointer">
                        Logout
                      </DropdownMenu.Item>
                    </Link>
                  </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}

            { status === "unauthenticated" && <Link className="" href={'/signIn'}><Button radius="large" className="dark:bg-gray-200 dark:text-black !cursor-pointer">Login</Button></Link>}
            { status === "loading" && <Skeleton width={'2rem'} height={'1.75rem'}/> }
            
          </Flex>
        </Flex>
      </Container>
    </nav>

  );
};

export default NavBar;
