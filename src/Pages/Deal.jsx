import React, { useCallback, useEffect, useMemo, useState } from 'react'
import { useGetDealQuery, useGetProductCategoryListQuery } from '../Features/ECOMMERCEAPI'
import Loading from '../Component/Loading'
import Error from '../Component/Error'
import DateTime from '../Component/DateTime'
import DealProduct from './DealProduct'
import Pagination from '../Component/Pagination'
import { Paginate } from '../assets/Pagination'
import { useNavigate } from 'react-router-dom'
import FilterOption2 from '../Component/FilterOption2'




const Deal = () => {

  const [country, setCountry] = useState('US')
  const [star, setStar] = useState('ALL')
  const [price, setPrice] = useState('ALL')
  const [discount, setDiscount] = useState('ALL')
  const [sortBy, setSortBy] = useState('FEATURED')
  const [currentPage, setCurrentpage] = useState(1)
  const [categoryProduct, setCategoryProduct] = useState('aps')
  const [ offSet, setOffSet ] = useState(0)
  
  const { data, isLoading, error } = useGetDealQuery({country, offSet,  categoryProduct, star, price, discount}) 

  const { data:categoryData, isLoading:categoryLoading, error:categoryError } = useGetProductCategoryListQuery({country})

  useEffect(() => {
    const right1 = document.querySelector('.right1') 
    if (right1) {
      // right1.scrollIntoView({ behavior: 'smooth', block: 'start' });
      right1.scrollTop = 0
      window.scrollTo({top: 0, behavior: 'smooth'})
    }
  }, [currentPage, data, star, country, price, sortBy, discount, categoryProduct])

  const paginateItems = useMemo (() => Paginate(data?.data?.deals, currentPage), [data?.data?.deals, currentPage])

  const navigate = useNavigate()

    const handlePageChange = useCallback ((page) => {
      if (page >= 1 && page <= Math.ceil(data?.data?.deals.length / 10) && page != currentPage)
      setCurrentpage(page);
    }, [currentPage, data?.data?.deals.length])
  
    if (isLoading) return <Loading />
  
    if (error) return <Error />

    if (!data) return <div className='text-2xl text-center'>No results found</div>;

    if (categoryLoading) return <p>Loading..</p>
  
    if (categoryError) return <p>Something Went Wrong..</p>

    if (!categoryData) return <div className='text-2xl text-center'>No results found</div>;

    const countryOptions = ['US', 'TR']
    const ratingOptions = ['ALL','1','2','3','4']
    const sortByOptions = ['FEATURED', 'LOWEST_PRICE', 'HIGHEST_PRICE', 'REVIEWS', 'NEWEST', 'BEST_SELLERS']
    const priceOptions = [
      { label: 'ALL', value: 'ALL' },
      { label: 'Low Price', value: '1' },
      { label: 'Medium Price', value: '2' },
      { label: 'High Price', value: '3' },
      { label: 'Very High Price', value: '4' },
      { label: 'Luxury Price', value: '5' }
    ];
    const discountOptions = [
      { label: 'ALL', value: 'ALL' },
      { label: 'Up to 10%', value: '1' },
      { label: '10% - 25%', value: '2' },
      { label: '25% - 50%', value: '3' },
      { label: '50% - 75%', value: '4' },
      { label: '75% or more', value: '5' }
    ] 


    const handleClick = async (asin, country) => {

      if (asin) {
          navigate(`/product?asin=${encodeURIComponent(asin)}&country=${encodeURIComponent(country)}`);
      } else {
          console.error('ASIN not available');
      }
    }

    const handleClick1 = () => {
      setOffSet(offSet + 30)
    }

    const handleClick2 = () => {
      setOffSet(0);
      setCurrentpage(1)
    }

  return (
    <div className='h-screen w-full bg-slate-200 p-1'>
        <div className='h-full w-full flex justify-between space-x-0 ml:space-x-2'>
            <div className="left hidden ml:block w-[19%] bg-white py-6 rounded-lg shadow-lg overflow-y-auto scrollbar-thin">
                <h2 className='text-center text-2xl font-semibold mb-4'>Filters</h2>
                <br />
                <hr />
                <br />
                <div className='text-center flex flex-col px-8'>
                  <label htmlFor="price" className='block mb-2 text-lg font-medium text-gray-700'>
                    <h2>PRICE</h2>
                  </label>
                  <select value={price} name="price" id="price" className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-base p-3 transition ease-in-out duration-200 truncate' onChange={(e) => setPrice(e.target.value)}>
                    {priceOptions?.map((option) => 
                      <option value={option.value} key={option.value} className='hover:text-indigo-400' >{option.label}</option>
                    )}
                  </select>
                  <br />
                  <br />
                  <label htmlFor="ratings" className='block mb-2 text-lg font-medium text-gray-700'>
                    <h2>CUSTOMER RATINGS</h2>
                  </label>
                  <select 
                    name="ratings" 
                    id="ratings" 
                    className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-base p-3 transition ease-in-out duration-200 truncate'
                    onChange={(e) => setStar(e.target.value)}
                  >
                    {ratingOptions?.map((option) => 
                      <option value={option} key={option} className='hover:text-indigo-400'>
                        {option}
                      </option>
                    )}
                  </select>
                  <br />
                  <br />
                  <label htmlFor="discount" className='block mb-2 text-lg font-medium text-gray-700'>
                    <h2>DISCOUNT RANGE</h2>
                  </label>
                  <select 
                    name="discount" 
                    id="discount" 
                    className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-base p-3 transition ease-in-out duration-200 truncate'
                    onChange={(e) => setDiscount(e.target.value)}
                  >
                    {discountOptions?.map((option) => 
                      <option value={option.value} key={option.value} className='hover:text-indigo-400'>
                        {option.label}
                      </option>
                    )}
                  </select>
                  <br />
                  <br />
                  <label htmlFor="sortBy" className='block mb-2 text-lg font-medium text-gray-700'>
                    <h2>SORT BY</h2>
                  </label>
                  <select 
                    name="sortBy" 
                    id="sortBy" 
                    className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-base p-3 transition ease-in-out duration-200 truncate'
                    onChange={(e) => setSortBy(e.target.value)}
                  >
                    {sortByOptions?.map((option) => 
                      <option value={option} key={option} className='hover:text-indigo-400'>
                        {option}
                      </option>
                    )}
                  </select>
                  <br />
                  <br />
                  <label htmlFor="productCategory" className='block mb-2 text-lg font-medium text-gray-700'>
                    <h2>PRODUCT BY CATEGORY</h2>
                  </label>
                  <select 
                    name="productCategory" 
                    id="productCategory" 
                    className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-base p-3 transition ease-in-out duration-200 truncate'
                    onChange={(e) => setCategoryProduct(e.target.value)}
                  >
                    {categoryData?.data?.map((option) => 
                      <option value={option.id} key={option.id} className='hover:text-indigo-400'>
                        {option.name}
                      </option>
                    )}
                  </select>
                  <br />
                  <br />
                  <label htmlFor="country" className='block mb-2 text-lg font-medium text-gray-700'>COUNTRY</label>
                  <select name="country" id="country" className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-base p-3 transition ease-in-out duration-200 truncate' onChange={(e) => setCountry(e.target.value)}>
                    {countryOptions?.map((option) => <option value={option} key={option}>{option}</option>
                    )}
                  </select>
                </div>
            </div>
            <div className="right right1 relative bg-white py-6 rounded-lg shadow-lg overflow-y-auto scrollbar-thin scrollbar-thumb-gray-500 scrollbar-track-gray-100 w-full ml:w-[80%]">
              <div>
                    <FilterOption2 priceOptions={priceOptions} ratingOptions={ratingOptions} discountOptions={discountOptions} sortByOptions={sortByOptions} categoryData={categoryData} countryOptions={countryOptions} setCountry={setCountry} setStar={setStar} setPrice={setPrice} setDiscount={setDiscount} setSortBy={setSortBy} setCategoryProduct={setCategoryProduct}  />
              </div>
                <h2 className='text-center text-xl ml:text-2xl font-semibold mb-0 ml:mb-4'>Best Deals</h2>
                <br />
                <hr />
                <br />
              <div className='flex flex-wrap justify-between'>
                {paginateItems?.map((item) => {
                  return (
                    <div key={item.deal_id} className="deal-item flex justify-between vs:justify-normal items-center w-full mb-6 bg-gray-100 p-4 rounded-lg cursor-pointer group" onClick={() => handleClick(item.product_asin, country)}>
                    <div className='left flex justify-center w-[35%] vs:w-[14%] vm:w-[15%] lm:w-[20%]'>
                      <img src={item.deal_photo} alt={item.deal_title} className='object-cover w-full h-auto rounded-lg' loading='lazy' />
                    </div>
                    <div className='flex flex-col space-y-4 w-[60%] vs:hidden'>
                    <div className='lr w-full'> 
                  <h1 className='line-clamp-3 jb:line-clamp-none text-xs vm:text-sm ld:text-base lm:text-lg font-semibold group-hover:text-blue-500'>{item.deal_title}</h1>
                </div>
                <div className='right w-full'>
                      <p>{<DealProduct dealId={item.deal_id} country={country} sortBy={sortBy} dealBadge={item.deal_badge} />}</p>
                      {/* <p className='text-[#388E3C]'>{}</p> */}
                      <p className='text-[0.58rem] vv:text-xs'>Deal Starts at: {<DateTime isoDate={item.deal_starts_at}/>}</p>
                      <p className='text-[0.58rem] vv:text-xs'>Deal Ends at: {<DateTime isoDate={item.deal_ends_at}/>}</p>
                </div>
                    </div>
                    <div className='lr hidden vs:block w-[48%] vm:w-[50%] ld:w-[60%] px-4'> 
                  <h1 className='text-xs vm:text-sm ld:text-base lm:text-lg font-semibold group-hover:text-blue-500'>{item.deal_title}</h1>
                </div>
                <div className='right hidden vs:block w-[40%] vm:w-[30%]'>
                      <p>{<DealProduct dealId={item.deal_id} country={country} sortBy={sortBy} dealBadge={item.deal_badge} />}</p>
                      {/* <p className='text-[#388E3C]'>{}</p> */}
                      <p className='text-xs md:text-sm'>Deal Starts at: {<DateTime isoDate={item.deal_starts_at}/>}</p>
                      <p className='text-xs md:text-sm'>Deal Ends at: {<DateTime isoDate={item.deal_ends_at}/>}</p>
                </div>
                  </div>
                  )
                })}
              </div>
              { (currentPage >= Math.ceil(data?.data?.deals.length/10)) ? 
                (
                <>
                  <div className='text-center my-2'>
                    <button className={`${(offSet === 0) ? 'hidden' : 'text-blue-500 hover:underline'}`} onClick={handleClick2}>See less</button>
                    <span className={`${(offSet === 0) ? 'hidden' : 'mx-2'}`}>/</span> 
                    <button className='text-blue-500 hover:underline' onClick={handleClick1}>See more</button>
                  </div>
                </>
                ) : (null)}
              <Pagination 
                  totalItems={data?.data?.deals.length}
                  currentPage={currentPage}
                  onPageChange={handlePageChange}
              />
            </div>
        </div>
    </div>
  )
}

export default Deal