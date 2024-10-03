import React, { useEffect } from 'react'
import { useGetDealProductQuery } from '../Features/ECOMMERCEAPI'
import Loading from '../Component/Loading'
import Error from '../Component/Error'

const DealProduct = ({dealId, country, sortBy, dealBadge}) => {

    const { data, isLoading, error } = useGetDealProductQuery({ dealId, country, sortBy })

    if (isLoading) return <Loading />

    if (error) return <p></p>

    if (!data) return <div className='text-2xl text-center'>No results found</div>;

    const product = data?.data?.products[0]
    
  return (

    <>
        {product ? (
            <div><h1 className='font-semibold text-base md:text-lg'>{product?.deal_price}</h1>
            {/* {console.log(data)} */}
            <p><span className='line-through text-gray-400 mr-1 text-sm md:text-base'>{product?.list_price}</span> <span className='text-[#388E3C] text-xs bj:text-sm md:text-base'>{product?.savings_percentage ? `${(product?.savings_percentage).toString().substring(1, 4)} off` : dealBadge}</span></p>
            <p className='text-[0.58rem] vs:text-xs md:text-sm'>{product?.additional_info?.map((item) => <span>{item}<br /></span>)}</p>
            </div>
        ) : (<span className='text-[#388E3C]'>{dealBadge}</span>)}
    </>
  )
}

export default DealProduct