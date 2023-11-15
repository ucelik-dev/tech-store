'use client'

import { Card, Flex, Separator, Text } from '@radix-ui/themes'
import React, { useEffect } from 'react'
import { AiOutlineMinusCircle, AiOutlinePlusCircle } from 'react-icons/ai'
import { FaTrashCan } from 'react-icons/fa6'
import Image from 'next/image'
import formatCurrency from '../utils/formatCurrency'
import { useCartStore } from '../utils/store'

interface Props {
  openContact: Boolean;
  setOpenContact: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProductsDetails = ({ openContact, setOpenContact } : Props) => {
  const {products, removeFromCart, increaseQuantity, decreaseQuantity, totalPrice, totalItems} = useCartStore();
  useEffect(() => { useCartStore.persist.rehydrate() },[]);
  const deliveryCost = (totalPrice>=100 || totalItems === 0) ? 0 : 5;
  
  return (
    <div className='flex h-max p-4 pt-3 flex-col gap-4 border-2 lg:w-1/2 w-full rounded-xl shadow-md'>
        <h1 className="p-1 font-bold pb-0">Products</h1>
        <Separator orientation="horizontal" size={"4"} className="mb-0"/>
          {products.length === 0 && <p>The cart is empty</p>}
          {products.map(item => (
            <Card my={'2'} key={item.id} >
              <Flex width={'100%'} px={'2'}>
                  <h1 className='uppercase text-sm'>{item.title}</h1>
              </Flex>
              <Flex width={'100%'} px={'2'}>
                {item.imgUrl && (
                  <Flex align={'center'} justify={'start'} className='w-1/3'>
                    <Image src={item.imgUrl} alt="" width={100} height={100} className='w-20 h-20 object-contain'/>
                    <Text className='font-normal text-xl'>x {item.quantity}</Text>
                  </Flex>
                )}
                <Flex align={'center'} justify={'center'} className='w-1/3' direction={'column'} gap={'1'}>
                  <h2 className='font-bold'>{formatCurrency(item.quantity * item.price)}</h2>
                  <div className="flex gap-3 items-center">
                    <button onClick={() => item.quantity > 1 ? decreaseQuantity(item) : removeFromCart(item)}><AiOutlineMinusCircle size={20}/></button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item)}><AiOutlinePlusCircle size={20}/></button>
                  </div>
                </Flex>
                <Flex align={'center'} justify={'end'} className='w-1/3'>
                  <span className='cursor-pointer' onClick={() => removeFromCart(item)}>
                      <FaTrashCan size={20}/>
                  </span>
                </Flex>

              </Flex>
            </Card>
          ))}

          <Separator orientation="horizontal" size={'4'}/>
          
          <Flex direction={'column'}>
            <div className='flex justify-between'>
              <span>Subtotal:</span>
              <span>{formatCurrency(totalPrice)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Delivery:</span>
              <span>{formatCurrency(deliveryCost)}</span>
            </div>
            <div className='flex justify-between'>
              <span>Total:</span>
              <span className='font-bold'>{ formatCurrency(totalPrice + deliveryCost)}</span>
            </div>
          </Flex>
          

        </div>
  )
}

export default ProductsDetails