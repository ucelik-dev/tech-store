"use client";

import { Avatar, Badge, Button, Container, DropdownMenu, Flex, Text } from "@radix-ui/themes";
import { useSession } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect } from "react";
import Skeleton from "./components/Skeleton";
import { useCartStore } from "./utils/store";
import { BiCart } from 'react-icons/bi'
import formatCurrency from "./utils/formatCurrency";

const NavBar = () => {
  const { totalItems, totalPrice } = useCartStore();
  const { status, data: session } = useSession();

  useEffect(() => { useCartStore.persist.rehydrate() },[]);

  return (
    <nav className="border-b mb-5 p-4 bg-gray-50 flex-no-wrap z-10 fixed top-0 flex w-full items-center justify-between">
      <Container>
        <Flex justify={'between'} align={'center'}>
          <Flex gap={'3'}>
            <Link href="/">
              <Image 
                src={'http://res.cloudinary.com/dmwprvrvw/image/upload/v1697979579/TechShop/logo_tech_shop_cropped_i7hq3f.png'}
                width={20} height={20} alt="" loading="eager" priority={true} className="w-5 h-5"
              />
            </Link>
          

            
          </Flex>

          <Flex justify={'between'} align={'center'} gap={'5'} position={'relative'}>
            <Link href="/cart" className="flex items-center gap-2 min-w-max">
              <BiCart size={25}/>
              
              <Badge variant="solid" radius="full"
                className="absolute flex justify-center align-center text-xs" 
                style={{ width: "1.2rem", height: "1.2rem", position:"absolute", top:-15, left:0, transform:"translate(25%, 25%)" }}
              >{totalItems}</Badge>

              <span className="font-bold">{formatCurrency(totalPrice)}</span>
            </Link>

            { status === "authenticated" && (
              //<Link href={'/api/auth/signout'}>Logout</Link>}
              <DropdownMenu.Root>
                  <DropdownMenu.Trigger className="cursor-pointer">
                    <Avatar src={session.user?.image ? session.user?.image : 'http://res.cloudinary.com/dmwprvrvw/image/upload/v1697979579/TechShop/user-icon_eylev2.png' } fallback="" size={'2'} referrerPolicy="no-referrer"/>
                  </DropdownMenu.Trigger>
                  <DropdownMenu.Content>
                    <DropdownMenu.Label>
                      <Text size={'2'}>{session.user!.name} <br/> {session.user!.email}</Text>
                    </DropdownMenu.Label>
                    <DropdownMenu.Item className="mt-3">
                      <Link href={'/api/auth/signout'}>Logout</Link>
                    </DropdownMenu.Item>
                  </DropdownMenu.Content>
              </DropdownMenu.Root>
            )}

            { status === "unauthenticated" && <Button radius="large"><Link className="cursor-pointer" href={'/signIn'}>Login</Link></Button>}
            { status === "loading" && <Skeleton width={'2rem'} height={'1.75rem'}/> }
            
          </Flex>
        </Flex>
      </Container>
    </nav>
  );
};

export default NavBar;
