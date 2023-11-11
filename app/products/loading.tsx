import React from 'react'
import Spinner from '../components/Spinner'

const OrderTableSkeleton = async() => {

  return (
    <div className='mt-[10%] ml-[25%] sm:ml-[40%]'>
      <Spinner/>
    </div>
  )
}

export default OrderTableSkeleton