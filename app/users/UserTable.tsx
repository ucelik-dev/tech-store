import { Flex, Link as RadixLink, Table, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import UpdateUserStatus from "./UpdateUserStatus";
import { User } from "@prisma/client";
import { AiOutlineArrowDown, AiOutlineArrowUp } from "react-icons/ai";
import { UserQuery } from "./page";

interface Props {
    searchParams: UserQuery,
    columns: any,
    users: User[]
}

const UserTable = async ({ searchParams, columns, users } : Props) => {
  
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
          {users.map((user:any) => (
            <Table.Row key={user.id} className="border-b-2 border-gray-100">
              <td className="py-3 px-3">{user.id}</td>
              <td className="py-3 px-3">{user.name}</td>
              <td className="py-3 px-3">{user.email}</td>
              <td className="py-3 px-3"><UpdateUserStatus user={user}/></td>
            </Table.Row>
          ))}
        </Table.Body>
    </Table.Root>
  )
}

export default UserTable