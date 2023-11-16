import React from "react";
import prisma from "@/prisma/client";
import { Flex, Text } from "@radix-ui/themes";
import { User } from "@prisma/client";
import Pagination from "../components/Pagination";
import { Metadata } from "next";
import RouteProtectionAuthorized from "../components/RouteProtectionAuthorized";
import UserTable from "./UserTable";

export interface UserQuery {
  orderBy: keyof User;
  sortBy: string;
  page: string; 
}

interface Props {
  searchParams: UserQuery,
}

const columns : { label: string, value: keyof User }[] = [
  { label: 'ID', value: 'id' },
  { label: 'Name', value: 'name' },
  { label: 'Email', value: 'email' },
  { label: 'Role', value: 'isAdmin' },
];

const columnNames = columns.map(column => column.value);

const OrdersPage = async ({ searchParams } : Props) => {
  const page = parseInt(searchParams.page) || 1;
  const pageSize = 10;
  const userCount = await prisma.user.count();

  const orderBy = columnNames.includes(searchParams.orderBy) ? { [searchParams.orderBy]: searchParams.sortBy } : undefined;
  const users = await prisma.user.findMany( { where: { }, orderBy, skip: (page - 1) * pageSize, take: pageSize }, ); 
    
  return (
  <RouteProtectionAuthorized>
    <Flex direction='column' gap='3'>
      
      <UserTable searchParams={searchParams} columns={columns} users={users}/>

      <Flex align={'center'} justify={'between'}>
        <Pagination pageSize={pageSize} currentPage={page} itemCount={userCount}/>
        {pageSize < userCount && <Text size={'2'}>{userCount} orders</Text> }
      </Flex>

    </Flex>
  </RouteProtectionAuthorized>
  );
};

export const metadata: Metadata = {
  title: 'Tech Store - User List',
  description: 'View list of users'
}

export default OrdersPage;