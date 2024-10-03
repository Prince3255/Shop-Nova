import React, { useCallback, useEffect, useState } from 'react'
import { useGetCategoryQuery } from '../Features/ECOMMERCEAPI'
import Loading from '../Component/Loading'
import Error from '../Component/Error'
import { IoStarHalfSharp } from "react-icons/io5";
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Product } from '.';
import img45 from "../assets/img45.png"

const Category = ({categoryPath, country}) => {

  const [ page, setPage ] = useState(1)
  const [ sortBy, setSortBy ] = useState('RELEVANCE')
  const [ productCondition, setProductCondition ] = useState('ALL')
  const [ categoryData, setCategoryData ] = useState([])

  const { data, isLoading, error } = useGetCategoryQuery({categoryID: categoryPath[0].id, page, country, sortBy, productCondition})


    // useEffect(() => {
    //   if (data?.data?.products) {
    //     setCategoryData(prevData => [...prevData, ...(data?.data?.products) ])
    //   }
    // }, [page])

    useEffect(() => {
      if (data?.data?.products) {
        setCategoryData(data?.data?.products);
        // setPage(1)
      }
    }, [data, sortBy, productCondition, categoryPath]);

    const navigate = useNavigate()

    // useEffect(() => {
      // if (data?.data?.products) {
        // setCategoryData((prevData) => [...prevData, ...data.data.products]);
      // }
    // }, [page, data]);
  
    // Effect to load more data when the page changes
    // useEffect(() => {
    //   if (data?.data?.products && page > 1) {
    //     setCategoryData((prevData) => [...prevData, ...(data?.data?.products)]);
    //   }
    // }, [page, data]);

    // useEffect(() => {
    //   if (data?.data?.products) {
    //     setCategoryData(data?.data?.products);
    //   }

    //   // if (data?.data?.products) {
    //   //   // setCategoryData((prevData) => 
    //   //   //   page === 1 ? data.data.products : [...prevData, ...data.data.products]
    //   //   // );
    //   // }
    // }, [page, data])

    if (isLoading) return <Loading />

    if (error) return <Error />

    if (!data) return <div className='text-2xl text-center'>No results found</div>;

    const sortByy = [
      { label: 'Relevance', value: 'RELEVANCE' },
      { label: 'Lowest Price', value: 'LOWEST_PRICE' },
      { label: 'Highest Price', value: 'HIGHEST_PRICE' },
      { label: 'Best Reviews', value: 'REVIEWS' },
      { label: 'Most Recent', value: 'NEWEST' },
      { label: 'Best Sellers', value: 'BEST_SELLERS' },
    ];

    const productCondition1 = [
      { label: 'Any', value: 'ALL'},
      { label: 'New', value: 'NEW'},
      { label: 'Used', value: 'USED'},
      { label: 'Renewed', value: 'RENEWED'},
      { label: 'Collectible', value: 'COLLECTIBLE'},
    ]

    const countStartRating = (number) => {
      const stars = []
      // let number1 = Number(number)
      let i = 0
      while (i < Math.floor(number)) {
          stars.push(<span key={i} className='text-[#FFD700]'>&#9733;</span>);
          i++;
      }
  
      if (number - i >= 0.1) {
          stars.push(<IoStarHalfSharp key={i} className='inline text-base text-[#FFD700]' />);
          i++;
      }
  
      while (i < 5) {
          stars.push(<span key={i} className='text-gray-300'>&#9734;</span>);
          i++;
      }
  
      return stars;
    }

    const handleClick = (asin) => {
      navigate(`/product?asin=${encodeURIComponent(asin)}&country=${encodeURIComponent(country)}`);
    }

    const handleClick1 = () => {
      setPage((prevPage) => prevPage + 1)
      setCategoryData((prevData) => [...prevData, ...(data.data.products)]);
    }

    const handleClick12 = () => {
      if(page !== 1) {
        setPage(1)
        setCategoryData(data.data.products);
      }
    }
  return (
    <>
      {
        categoryData ? (
          <>
            <div className='flex items-center space-x-4 vv:space-x-7'>
            <div>
            <label htmlFor="sortBy" className='block mb-1 text-sm vv:text-base font-medium text-gray-700 px-1 vv:px-3'>
              <h2>Sort By</h2>
            </label>
            <select 
                            name="sortBy" 
                            id="sortBy" 
                            className='block w-fit rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 bg-slate-200 hover:border-indigo-500 hover:shadow-md p-1 vv:p-2 transition ease-in-out duration-200 truncate text-xs vv:text-sm mb-1 vv:mb-4'
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            {sortByy?.map((option) => 
                            <option value={option.value} key={option.value} className='hover:text-indigo-400'>
                                {option.label}
                            </option>
                            )}
                        </select>
            </div>
            <div>
            <label htmlFor="productCondition" className='block mb-1 text-sm vv:text-base font-medium text-gray-700 px-1 vv:px-3'>
              <h2>Product Condition</h2>
            </label>
            <select 
                            name="productCondition" 
                            id="productCondition" 
                            className='block w-fit rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 bg-slate-200 hover:border-indigo-500 hover:shadow-md p-1 vv:p-2 transition ease-in-out duration-200 truncate text-xs vv:text-sm mb-1 vv:mb-4'
                            onChange={(e) => setProductCondition(e.target.value)}
                        >
                            {productCondition1?.map((option) => 
                            <option value={option.value} key={option.value} className='hover:text-indigo-400'>
                                {option.label}
                            </option>
                            )}
                        </select>
            </div>
            </div>
            <div className='flex items-center justify-start w-full space-x-2 vv:space-x-4 overflow-x-scroll scrollbar-thin px-0 lg:px-1'>
            {/* {console.log(data)} */}
            {
              categoryData?.map((option) => (
                <div className='w-24 jb:w-28 vv:w-32 vs:w-40 vm:w-60 h-auto flex-shrink-0 cursor-pointer group' onClick={() => handleClick(option?.asin)}>
                  <div className='flex justify-center items-center mx-auto'>
                    <img src={option?.product_photo} alt={option?.asin} className='object-contain w-40 h-48  vs:w-48 vs:h-64 p-1 group-hover:scale-110 duration-200' />
                  </div>
                  <div className='p-1'>
                    <p className='w-full text-xs vv:text-sm text-ellipsis overflow-hidden line-clamp-3 vs:line-clamp-4'>
                      {option?.product_title}
                    </p>
                    <p className='my-0 flex items-center'>
                      {countStartRating(option?.product_star_rating)} 
                      <span className='text-[0.58rem] vv:text-xs'>&nbsp;{option?.product_num_ratings}</span>
                    </p>
                    <p className='text-[0.65rem] vv:text-xs'>{option?.sales_volume}</p>
                    <div className='text-sm vv:text-base space-x-2 my-1'>
                      <span>{option?.product_minimum_offer_price ? (option?.product_minimum_offer_price) : (option?.product_price)}</span>
                      <span className='line-through text-[0.85rem] text-slate-400'>{option?.product_original_price}</span>
                    </div>
                    {
                          <div className='flex items-center'>
                          { 
                            option?.is_prime ? 
                            (<img src="https://www.logotypes101.com/logos/875/A41B7A0C2125D3C1F6DDDE56C1203C77/amazon_prime_icon.png" alt="Prime" className='w-8 h-8 object-contain mr-4'/>) : (null)
                          }
                          { 
                            option?.is_best_seller ? 
                            (<p className='bg-[#F5553A] text-white text-[0.48rem] p-1'>BEST SELLER</p>) : (null)
                          }
                          </div>
                    }
                    {
                      option?.climate_pledge_friendly ?  
                      (
                          <div className='flex space-x-2 items-center'>
                          <img src="https://m.media-amazon.com/images/I/11qFTG64RvL.png" alt="CPF" className='w-4 h-4'/>
                          <p className='text-[0.58rem] vv:text-xs text-[#168342]'>Climate Pledge Friendly</p>
                          </div>
                      ) : null
                    }
                  </div>
                </div>
              ))
            }
            <p>
                <button className='text-blue-500 hover:underline mb-4' onClick={handleClick1}>Show more</button>
                <button className='text-blue-500 hover:underline' onClick={handleClick12}>Show less</button>
            </p>
          </div>
          </>
        ) : (null)
      }
    </>
  )
}

export default Category