import prisma from '@/prisma/client';
import { Flex, Text, Table } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';
import formatCurrency from '@/app/utils/formatCurrency';
import formatDate from '@/app/utils/formatDate';

const OrderDetail = async ({params}: {params: { id: string}}) => {
    const session = await getServerSession(authOptions);
    
    
    const order = await prisma.order.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!order) notFound();

  return (
    <div className='flex flex-col lg:flex-row gap-3'>
        <div className='w-full'>
        <Table.Root className="w-full" variant='surface'>
            <Table.Header>
                <Table.Row>
                    <Table.ColumnHeaderCell>
                        <p><span className='font-bold'>Order ID : </span><span className='font-normal'>{order.id}</span></p>
                        <p><span className='font-bold'>Date : </span><span className='font-normal'>{formatDate(order.createdAt)}</span></p>
                        <p><span className='font-bold'>Status : </span><span className='font-normal'>{order.status === 'Being_Prepared' ? 'Being Prepared' : order.status}</span></p>
                        <p><span className='font-bold'>Total : </span><span className='font-normal'>{formatCurrency(order.price)}</span></p>
                    </Table.ColumnHeaderCell>
                </Table.Row>
            </Table.Header>

            <Table.Body>
                <Table.Row>
                    <Table.Cell className="py-3 px-6" colSpan={3}>
                        {order.products.map((product:any) => 
                            <div key={product.id} className='border-b-2 mb-3'>  
                                <Flex width={'100%'} px={'2'}><h1 className='uppercase'>{product.title}</h1></Flex>
                                <Flex width={'100%'} px={'2'}>
                                    {product.imgUrl && (
                                        <Flex align={'center'} justify={'start'} className='flex-1'>
                                        <Image src={product.imgUrl} alt="" width={100} height={100} className='w-20 h-20 object-contain'/>
                                        <Text className='font-normal text-xl'>x {product.quantity}</Text>
                                        </Flex>
                                    )}
                                    <Flex align={'end'} justify={'center'} className='flex-1' direction={'column'} gap={'1'}>
                                        <h2>{formatCurrency(product.quantity * product.price)}</h2>
                                    </Flex>
                                </Flex>
                            </div>
                        )}</Table.Cell>
                </Table.Row>
            </Table.Body>
        
      </Table.Root>
    </div>
    <div className='w-full'>
        <Table.Root className="w-full" variant='surface'>
        
        <Table.Header>
            <Table.Row>
                <Table.ColumnHeaderCell colSpan={2}>
                    <span className='font-bold'>Contact Information</span>
                </Table.ColumnHeaderCell>
            </Table.Row>
        </Table.Header>

        
        {order.address.map((data:any) => 
            <Table.Body key={data.id}>
                <Table.Row>
                    <Table.Cell className="py-3 px-6 w-auto">Customer</Table.Cell>
                    <Table.Cell className="py-3 px-6 w-auto">{data.firstName + ' ' + data.lastName}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell className="py-3 px-6">City - Country</Table.Cell>
                    <Table.Cell className="py-3 px-6">{data.city + ' - ' + data.country}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell className="py-3 px-6">Postal Code</Table.Cell>
                    <Table.Cell className="py-3 px-6">{data.postalCode}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell className="py-3 px-6">Phone Number</Table.Cell>
                    <Table.Cell className="py-3 px-6">{data.phone}</Table.Cell>
                </Table.Row>
                <Table.Row>
                    <Table.Cell className="py-3 px-6">Address</Table.Cell>
                    <Table.Cell className="py-3 px-6">{data.address}</Table.Cell>
                </Table.Row>
            </Table.Body>
        )}
        
    </Table.Root>
  </div>
      
    </div>
  )
}

export async function generateMetadata({params}: {params: { id: string}}) {
    const order = await prisma.order.findUnique({ where: { id: parseInt(params.id)}});
    return {
        title: 'Details of order ' + order?.id,
        description: 'View details of order ' + order?.id
    }
}

export default OrderDetail