import React from "react";
import prisma from "@/prisma/client";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';
import formatCurrency from "../utils/formatCurrency";
import { Badge, Flex, Link as RadixLink, Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import UpdateOrderStatus from "./UpdateOrderStatus";
import formatDate from "../utils/formatDate";
import { Order, OrderStatus } from "@prisma/client";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import Pagination from "../components/Pagination";
import OrderSummary from "./OrderSummary";
import { Metadata } from "next";

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
  
    const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: searchParams.sortBy } : undefined;
  
    const page = parseInt(searchParams.page) || 1;
    const pageSize = 10;

   
      var orders = await prisma.order.findMany( { where: { userEmail: session?.user.email??""}, orderBy, skip: (page - 1) * pageSize, take: pageSize }  ); 

  
    const orderCount = await prisma.order.count()

    const delivered = await prisma.order.count({ where: { status: 'Delivered' } });
    const being_prepared = await prisma.order.count({ where: { status: 'Being_Prepared' } });
    const cancelled = await prisma.order.count({ where: { status: 'Cancelled' } });

  return (
    <Flex direction='column' gap='3'>
      <OrderSummary delivered={delivered} being_prepared={being_prepared} cancelled={cancelled}/>
      <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="text-left">
              {columns.map(column => (
                <Table.ColumnHeaderCell key={column.value} className={column.className}>
                  <Flex gap={'2'}>
                    <div><NextLink href={{ query: {...searchParams, orderBy: column.value, sortBy:'asc'}}}><AiOutlineArrowUp /></NextLink></div>
                    <div><NextLink href={{ query: {...searchParams, orderBy: column.value}}}>{column.label}</NextLink></div>
                    <div><NextLink href={{ query: {...searchParams, orderBy: column.value, sortBy:'desc'}}}><AiOutlineArrowDown /></NextLink></div>
                      { /*column.value === searchParams.orderBy && <ArrowUpIcon /> */}
                    </Flex>
                </Table.ColumnHeaderCell>
              ))}
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {orders.map((order:any) => (
            <Table.Row key={order.id} className="border-b-2 border-gray-100">
              <td className="py-3 px-3">
                <NextLink href={`/orders/${order.id}`} passHref legacyBehavior>
                  <RadixLink>{order.id}</RadixLink>
                </NextLink>
              </td>
              <td className="py-3 px-3">
                {formatDate(order.createdAt)}
              </td>
              <td className="py-3 px-3 hidden md:table-cell">{formatCurrency( order.price)}</td>
              <td className="py-3 px-3 hidden md:block">{order.products.map((product:any) => <p className="list-disc marker:text-gray-500" key={product.id}>{product.category} x {product.quantity} ({formatCurrency(product.price)})</p>)}</td>
        
                  {session?.user.isAdmin ? (
                    <td className="py-3 px-3">
                      <UpdateOrderStatus order={order}/>
                    </td>
                  ) : (
                    <td className="py-6 px-3">
                      {order.status === OrderStatus.Being_Prepared && <Badge color="orange" size={'2'}>{order.status}</Badge>}
                      {order.status === OrderStatus.Delivered && <Badge color="green" size={'2'}>{order.status}</Badge>}
                      {order.status === OrderStatus.Cancelled && <Badge color="red" size={'2'}>{order.status}</Badge>}
                    </td>
                  )}
     
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>

      <Flex align={'center'} justify={'between'}>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={orderCount}/>
        {pageSize < orderCount && <Text size={'2'}>{orderCount} orders</Text> }
      </Flex>

    </Flex>
  );
};

export const metadata: Metadata = {
  title: 'Tech Shop - Order List',
  description: 'View list of orders'
}

export default OrdersPage;