import React from "react";
import prisma from "@/prisma/client";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';
import { Flex, Text } from "@radix-ui/themes";
import { Order } from "@prisma/client";
import Pagination from "../components/Pagination";
import OrderSummary from "./OrderSummary";
import { Metadata } from "next";
import RouteProtectionUnauthorized from "../components/RouteProtectionUnauthorized";
import OrderTable from "./OrderTable";
export interface OrderQuery {
  orderBy: keyof Order;
  sortBy: string;
  page: string; 
}
interface Props {
  searchParams: OrderQuery,
}

const columns : { label: string, value: keyof Order, className?: string }[] = [
  { label: 'ID', value: 'id' },
  { label: 'Created', value: 'createdAt' },
  { label: 'Price', value: 'price', className: "hidden md:table-cell" },
  { label: 'Products', value: 'products', className: "hidden md:table-cell" },
  { label: 'Status', value: 'status' },
];

const columnNames = columns.map(column => column.value);

const OrdersPage = async ({ searchParams } : Props) => {
    const session = await getServerSession(authOptions);
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;
    const orderCount = await prisma.order.count()
    const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: searchParams.sortBy } : undefined;


    if(session?.user.isAdmin)
      var orders = await prisma.order.findMany( { where: { }, orderBy, skip: (page - 1) * pageSize, take: pageSize }, ); 
    else
      var orders = await prisma.order.findMany( { where: { userEmail: session?.user.email??""}, orderBy, skip: (page - 1) * pageSize, take: pageSize }  ); 
    
    const delivered = await prisma.order.count({ where: { status: 'Delivered' } });
    const being_prepared = await prisma.order.count({ where: { status: 'Being_Prepared' } });
    const cancelled = await prisma.order.count({ where: { status: 'Cancelled' } });
    
  return (
  <RouteProtectionUnauthorized>
    <Flex direction='column' gap='3'>
      {session?.user.isAdmin && <OrderSummary delivered={delivered} being_prepared={being_prepared} cancelled={cancelled}/> }
      
      <OrderTable searchParams={searchParams} columns={columns} orders={orders}/>

      <Flex align={'center'} justify={'between'}>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={orderCount}/>
        {pageSize < orderCount && <Text size={'2'}>{orderCount} orders</Text> }
      </Flex>

    </Flex>
  </RouteProtectionUnauthorized>
  );
};

export const metadata: Metadata = {
  title: 'Tech Store - Order List',
  description: 'View list of orders'
}

export default OrdersPage;