import prisma from '@/prisma/client';
import { Card, Flex, Text, Box, Table } from '@radix-ui/themes';
import { notFound } from 'next/navigation';
import React from 'react'
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import EditProductButton from './EditProductButton';
import DeleteProductButton from './DeleteProductButton';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/auth/authOptions';
import AddToCartButton from './AddToCartButton';

const ProductDetail = async ({params}: {params: { id: string}}) => {
    const session = await getServerSession(authOptions);
    
    const product = await prisma.product.findUnique({
        where: { id: parseInt(params.id) },
    });

    if (!product) notFound();

  return (
    <Card>
        {session?.user.isAdmin && <Box>
            <Flex gap='3' justify={{ initial:"center", lg:"end" }}>
                <EditProductButton productId={product.id} />
                <DeleteProductButton productId={product.id} />
            </Flex>
        </Box>}
        <Flex direction={{ initial:"column", md:"row" }} justify={'center'} align={'start'} gap={{ initial:"0", xs:"0", md:"5" }}>
            <Box className='center flex-1'>
                <Image className='w-full' src={product.imgUrl} width={400} height={400} alt='' loading="eager" priority={true} />
            </Box>

            <Box className='mt-0 md:mt-10 flex-1 px-5'>
                <Table.Root variant="surface">
                    <Table.Header>
                        <Table.Row>
                            <Table.ColumnHeaderCell>{product.title}</Table.ColumnHeaderCell>
                        </Table.Row>
                    </Table.Header>
                    <Table.Body>
                        <Table.Row>
                            <Table.Cell><ReactMarkdown>{product.details}</ReactMarkdown></Table.Cell>
                        </Table.Row>
                    </Table.Body>
                    <Table.Header>
                        <Table.Row>
                            <Table.Cell>{product.category}</Table.Cell>
                        </Table.Row>
                    </Table.Header>
                </Table.Root>
            </Box>

        </Flex>

        <Flex justify={'between'} className='mt-5'>
            <Text as="div" size="8" color="red">
            ${product.price}
            </Text>
            <AddToCartButton product={product}/>
        </Flex>
    </Card>
  )
}

export async function generateMetadata({params}: {params: { id: string}}) {
    const product = await prisma.product.findUnique({ where: { id: parseInt(params.id)}});
    return {
        title: product?.title,
        description: 'Details of product ' + product?.id
    }
}

export default ProductDetail