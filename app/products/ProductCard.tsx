import { Card, Flex, Link as RadixLink, Text } from "@radix-ui/themes";
import NextLink from "next/link";
import Image from 'next/image';
import AddToCartButton from './[id]/AddToCartButton';
import formatCurrency from '../utils/formatCurrency';
import { Product } from "@prisma/client";

const ProductCard = ({product}: {product: Product}) => {
  return (
    <Card key={product.id} className=' hover:drop-shadow-lg hover:shadow-xl hover:border-none hover:transition-all'>
      <Flex direction='column' align='center' justify={'center'} height={'100%'}>

        <Flex className='object-contain' height={'100%'}>
          <NextLink href={`/products/${product.id}`} passHref legacyBehavior key={product.id}><RadixLink className='hover:no-underline'>
            <Image src={product.imgUrl} height={200} width={200} alt='' loading="eager" priority={true} className="w-full h-auto"/>
          </RadixLink></NextLink>
        </Flex>
        <Flex className='m-0'>
          <NextLink href={`/products/${product.id}`} passHref legacyBehavior key={product.id}><RadixLink>
            <Text as="div" size="2" weight="bold" className='sm:h-10 md:h-20 dark:text-gray-300'>{product.title}</Text>
          </RadixLink></NextLink>
        </Flex>

        <Flex justify={'between'} align={'center'} width={'100%'} className='mb-0 mt-4 md:mt-0'>
            <Text as="div" size="6" className="text-red-600 dark:text-gray-200">{formatCurrency(product.price)}</Text>
            <AddToCartButton product={product}/>
        </Flex>
        
      </Flex>
    </Card>
  )
}

export default ProductCard