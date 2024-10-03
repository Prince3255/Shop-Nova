import React, { useState, useEffect } from 'react'
import { useGetSearchQuery } from '../Features/ECOMMERCEAPI'
import Loading from '../Component/Loading'
import Error from '../Component/Error'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { IoStarHalfSharp } from "react-icons/io5";
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";
import { useAuth } from '../Component/AuthContext'
import FilterOption from '../Component/FilterOption'

const Search = () => {
    const [ page, setPage ] = useState(1)
    const [ sortBy, setSortBy ] = useState('RELEVANCE')
    const [ productCondition, setProductCondition ] = useState('ALL')
    const [ country, setCountry ] = useState('US')
    const [ categoryData, setCategoryData ] = useState([])
    const location = useLocation()
    const params = new URLSearchParams(location.search)
    const searchTerm = params.get('query')
    const { data, isLoading, error } = useGetSearchQuery({searchTerm, page, country, sortBy, productCondition}, {skip: !searchTerm})

    useEffect(() => {
      const right1 = document.querySelector('.right1') 
      if (right1) {
        // right1.scrollIntoView({ behavior: 'smooth', block: 'start' });
        right1.scrollTop = 0
        window.scrollTo({top: 0, behavior: 'smooth'})
      }
    }, [page, data, country, sortBy, productCondition])
    const navigate = useNavigate()
    
    const { addToCart } = useAuth()

    if (isLoading) return <Loading />
  
    if (error) return <Error />

    if (!data) return <div className='text-2xl text-center'>No results found</div>;

    const country1 = [ 'US', 'AU', 'BR', 'CA', 'CN', 'FR', 'DE', 'IN', 'IT', 'MX', 'NL', 'SG', 'ES', 'TR', 'AE', 'GB', 'JP', 'SA', 'PL', 'SE', 'BE', 'EG' ]

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
          stars.push(<IoStarHalfSharp key={i} className='inline mb-[3px] text-sm text-[#FFD700]' />);
          i++;
      }
  
      while (i < 5) {
          stars.push(<span key={i} className='text-gray-300'>&#9734;</span>);
          i++;
      }
  
      return stars;
  }

  const addPage = () => {
    setPage(prevPage => prevPage + 1)
  }

  const decreasePage = () => {
    if (page > 1) {
      setPage(prevPage => prevPage - 1)
    }
  }

  const handleAddToCart = (item) => {
    addToCart(item)
  }


  const handleProductClick = (asin) => {
    navigate(`/product?asin=${encodeURIComponent(asin)}&country=${encodeURIComponent(country)}`);
  }

  return (
    <div className='h-screen w-full bg-slate-200 p-1'>
        <div className='h-full w-full flex justify-between space-x-0 ml:space-x-2'>
            <div className="left hidden ml:block w-[18%] bg-white py-6 rounded-lg shadow-lg overflow-y-auto scrollbar-thin">
                <h2 className='text-center text-xl ml:text-2xl font-semibold mb-0 ml:mb-4'>Filters</h2>
                <br />
                <hr />
                <br />
                <div className='text-center flex flex-col px-8'>
                  <label htmlFor="sortBy" className='block mb-2 text-base lm:text-lg font-medium text-gray-700'>
                    <h2>Sort By</h2>
                  </label>
                  <select value={sortBy} name="sortBy" id="sortBy" className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-sm lm:text-base p-3 transition ease-in-out duration-200 truncate' onChange={(e) => setSortBy(e.target.value)}>
                    {sortByy?.map((option) => 
                      <option value={option.value} key={option.value} className='hover:text-indigo-400' >{option.label}</option>
                    )}
                  </select>
                  <br />
                  <br />
                  <label htmlFor="productCondition" className='block mb-2 text-base lm:text-lg font-medium text-gray-700'>
                    <h2>Product Condition</h2>
                  </label>
                  <select 
                    name="productCondition" 
                    id="productCondition" 
                    className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-sm lm:text-base p-3 transition ease-in-out duration-200 truncate'
                    onChange={(e) => setProductCondition(e.target.value)}
                  >
                    {productCondition1?.map((option) => 
                      <option value={option.value} key={option.value} className='hover:text-indigo-400'>
                        {option.label}
                      </option>
                    )}
                  </select>
                  <br />
                  <br />
                  <label htmlFor="COCR" className='block mb-2 text-base lm:text-lg font-medium text-gray-700'>
                    <h2>Country & Currency</h2>
                  </label>
                  <select 
                    name="COCR" 
                    id="COCR" 
                    className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-sm lm:text-base p-1 lm:p-3 transition ease-in-out duration-200 truncate'
                    onChange={(e) => setCountry(e.target.value)}
                  >
                    {country1?.map((option) => 
                      <option value={option} key={option} className='hover:text-indigo-400'>
                        {option}
                      </option>
                    )}
                  </select>
                </div>
            </div>
            <div className="right right1 relative ml:static bg-white py-6 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-500 w-full ml:w-[82%]">
                    <div>
                      {<FilterOption sortByy={sortByy}
                                     productCondition1={productCondition1}
                                     country1={country1}
                                     setSortBy={setSortBy}
                                     setProductCondition={setProductCondition}
                                     setCountry={setCountry} />}
                    </div>
                <h2 className='text-center text-xl ml:text-2xl font-semibold mb-0 ml:mb-4'>{searchTerm.toUpperCase()}</h2>
                <br />
                <hr />
                <br />
                <div className='flex flex-wrap justify-between'>
                {data?.data?.products?.map((item) => {

                  //  let dealprice = 

                  return (
                    <div key={item.asin} className="deal-item flex justify-between vs:justify-normal items-center w-full mb-6 bg-gray-100 p-4 rounded-lg cursor-pointer group relative">
                    <div className='left flex justify-center w-[35%] vs:w-[12%] vm:w-[15%] lm:w-[20%]'>
                      <img src={item.product_photo} alt={item.product_title} className='object-contain w-full h-48 lm:h-60 rounded-lg' loading='lazy' onClick={() => handleProductClick(item.asin)}/>
                    </div>
                    <div className='flex flex-col space-y-4 w-[60%] vs:hidden'>
                    <div className='lr w-full'> 
                        <h1 className='line-clamp-3 jb:line-clamp-none text-xs vm:text-sm ld:text-base lm:text-lg font-semibold group-hover:text-blue-500' onClick={() => handleProductClick(item.asin)}>{item.product_title}</h1>
                        {
                                        item.climate_pledge_friendly ?  
                                        (
                                            <div className='flex space-x-2 items-center my-2'>
                                            <img src="https://m.media-amazon.com/images/I/11qFTG64RvL.png" alt="CPF" className='size-4 vm:size-6'/>
                                            <p className='text-xs vm:text-sm text-[#168342]'>Climate Pledge Friendly</p>
                                            </div>
                                        ) : null
                        }
                    </div>
                    <div className='right w-full relative'>
                            {
                                <div className='flex items-center justify-end absolute top-0 right-0' onClick={() => handleProductClick(item.asin)}>
                                { 
                                    item?.is_prime ? 
                                    (<img src="https://www.logotypes101.com/logos/875/A41B7A0C2125D3C1F6DDDE56C1203C77/amazon_prime_icon.png" alt="Prime" className='w-8 h-8 object-contain mr-4 mix-blend-multiply'/>) : (null)
                                }
                                { 
                                    item?.is_best_seller ? 
                                    (<p className='bg-[#F5553A] text-white text-[0.48rem] p-1'>BEST SELLER</p>) : (null)
                                }
                                </div>
                            }
                            <h1 className='font-semibold text-base lm:text-lg' onClick={() => handleProductClick(item.asin)}>{
                              (item?.product_minimum_offer_price) ? (item?.product_minimum_offer_price) : (item?.product_price)
                            }</h1>
                            <p><span className='line-through text-sm lm:text-base text-gray-400 mr-1' onClick={() => handleProductClick(item.asin)}>{(item?.product_original_price) ? (item?.product_original_price) : (item?.product_price)}</span></p>
                            <p onClick={() => handleProductClick(item.asin)}>
                              <span className='mr-2 text-sm lm:text-base'>{item?.product_star_rating}</span>
                              {
                                countStartRating(item?.product_star_rating)
                              }
                              <span className='mx-[0.35rem] bj:mx-3'>|</span>
                              <span className='text-xs'>{item?.sales_volume}</span>
                            </p>
                            <p className='text-xs my-1'>{item?.delivery}</p>
                            <div className='w-full h-fit flex justify-start items-center mt-4 vs:mt-8 space-x-1 bj:space-x-3 vm:space-x-5 ld:space-x-4 ll:space-x-5'>
                                {/* <NavLink> */}
                                    <button className='bg-[#FA8900] px-[0.45rem] bj:px-3 ll:px-4 py-1 rounded-full text-xs bj:text-sm lm:text-base text-center text-white'>Buy Now</button>
                                {/* </NavLink> */}
                                <button className='bg-[#F7CA00] px-[0.45rem] bj:px-4 py-1 rounded-full text-xs bj:text-sm lm:text-base text-center text-white' onClick={() => handleAddToCart({asin: item.asin, title: item.product_title, image: item.product_photo, price: (item?.product_minimum_offer_price) ? (item?.product_minimum_offer_price) : (item?.product_price), date: item?.delivery})}>Add to Cart</button>
                            </div>
                    </div>
                    </div>
                    <div className='lr hidden vs:block w-[45%] vm:w-[50%] ld:w-[60%] px-4'> 
                        <h1 className='text-xs vm:text-sm ld:text-base lm:text-lg font-semibold group-hover:text-blue-500' onClick={() => handleProductClick(item.asin)}>{item.product_title}</h1>
                        {
                                        item.climate_pledge_friendly ?  
                                        (
                                            <div className='flex space-x-2 items-center my-2'>
                                            <img src="https://m.media-amazon.com/images/I/11qFTG64RvL.png" alt="CPF" className='size-4 vm:size-6'/>
                                            <p className='text-xs vm:text-sm text-[#168342]'>Climate Pledge Friendly</p>
                                            </div>
                                        ) : null
                        }
                    </div>
                    <div className='right hidden vs:block w-[40%] vm:w-[30%]'>
                            {
                                <div className='flex items-center justify-end absolute top-4 right-4' onClick={() => handleProductClick(item.asin)}>
                                { 
                                    item?.is_prime ? 
                                    (<img src="https://www.logotypes101.com/logos/875/A41B7A0C2125D3C1F6DDDE56C1203C77/amazon_prime_icon.png" alt="Prime" className='w-8 h-8 object-contain mr-4 mix-blend-multiply'/>) : (null)
                                }
                                { 
                                    item?.is_best_seller ? 
                                    (<p className='bg-[#F5553A] text-white text-[0.48rem] p-1'>BEST SELLER</p>) : (null)
                                }
                                </div>
                            }
                            <h1 className='font-semibold text-base lm:text-lg' onClick={() => handleProductClick(item.asin)}>{
                              (item?.product_minimum_offer_price) ? (item?.product_minimum_offer_price) : (item?.product_price)
                            }</h1>
                            <p><span className='line-through text-sm lm:text-base text-gray-400 mr-1' onClick={() => handleProductClick(item.asin)}>{(item?.product_original_price) ? (item?.product_original_price) : (item?.product_price)}</span></p>
                            <p onClick={() => handleProductClick(item.asin)}>
                              <span className='mr-2 text-sm lm:text-base'>{item?.product_star_rating}</span>
                              {
                                countStartRating(item?.product_star_rating)
                              }
                              <span className='mx-3'>|</span>
                              <span className='text-xs'>{item?.sales_volume}</span>
                            </p>
                            <p className='text-xs my-1'>{item?.delivery}</p>
                            <div className='w-full h-fit flex justify-start items-center mt-4 vs:mt-8 space-x-3 vm:space-x-5 ld:space-x-4 ll:space-x-5'>
                                {/* <NavLink> */}
                                    <button className='bg-[#FA8900] px-3 ll:px-4 py-1 rounded-full text-sm lm:text-base text-center text-white'>Buy Now</button>
                                {/* </NavLink> */}
                                <button className='bg-[#F7CA00] px-4 py-1 rounded-full text-sm lm:text-base text-center text-white' onClick={() => handleAddToCart({asin: item.asin, title: item.product_title, image: item.product_photo, price: (item?.product_minimum_offer_price) ? (item?.product_minimum_offer_price) : (item?.product_price), date: item?.delivery})}>Add to Cart</button>
                            </div>
                    </div>
                    </div>
                        )
                        })}

                  {
                    (data?.data?.total_products > 1) ? (
                      <div className='p-1 border-slate-400 rounded-full flex justify-center items-center gap-x-4 bg-[#e2dfdf] w-fit py-2 px-2.5 vv:px-8 mx-auto'>
                      <span className={`cursor-pointer flex justify-center items-center gap-x-1`} onClick={decreasePage}><TfiArrowCircleLeft /> Previous</span>
                      <span>|</span>
                      <span className={`cursor-pointer flex justify-center items-center gap-x-1`} onClick={addPage}>Next<TfiArrowCircleRight /></span>
                      </div>
                    ) : (null)
                  }  
                    </div>
            </div>
        </div>
    </div>
  )
}

export default Search