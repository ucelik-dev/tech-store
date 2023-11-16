import React from "react";
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';
import formatCurrency from "../utils/formatCurrency";
import { Badge, Flex, Link as RadixLink, Table } from "@radix-ui/themes";
import NextLink from "next/link";
import UpdateOrderStatus from "./UpdateOrderStatus";
import formatDate from "../utils/formatDate";
import { Order, OrderStatus } from "@prisma/client";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { OrderQuery } from "./page";
  
interface Props {
  searchParams: OrderQuery,
  columns: any,
  orders: Order[]
}

const OrderTable = async ({ searchParams, columns, orders } : Props) => {
  const session = await getServerSession(authOptions);

  return (
    <Table.Root variant="surface">
        <Table.Header>
          <Table.Row className="text-left">
              {columns.map((column:any) => (
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
                    <td className="py-3 px-3">
                      {order.status === OrderStatus.Being_Prepared && <Badge color="orange" size={'1'}>{order.status === 'Being_Prepared' ? 'Being Prepared' : order.status}</Badge>}
                      {order.status === OrderStatus.Delivered && <Badge color="green" size={'1'}>{order.status}</Badge>}
                      {order.status === OrderStatus.Cancelled && <Badge color="red" size={'1'}>{order.status}</Badge>}
                    </td>
                  )}
     
            </Table.Row>
          ))}
        </Table.Body>
      </Table.Root>
  )
}

export default OrderTable