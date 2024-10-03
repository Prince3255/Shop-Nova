import React, { useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterOption2 = ({priceOptions, ratingOptions, discountOptions, sortByOptions, categoryData, countryOptions, setCountry, setStar, setPrice, setDiscount, setSortBy, setCategoryProduct}) => {
    const [ mainDropDown, setMainDropDown ] = useState(false)
    const [ priceDropDown, setPriceDropDown ] = useState(false)
    const [ ratingDropDown, setRatingDropDown ] = useState(false)
    const [ discountDropDown, setDiscountDropDown ] = useState(false)
    const [ categoryDropDown, setCategoryDropDown ] = useState(false)
    const [ countryDropDown, setCountryDropDown ] = useState(false)
    const [ sortByDropDown, setSortByDropDown ] = useState(false)

    const handleClick = () => {
        setMainDropDown(!(mainDropDown))
    }

  return (
    
    <div className="absolute ml:hidden left-2 top-11 inline-block text-left w-[32%] jb:w-[30%] bj:w-[28%] vd:w-[20%] vp:w-[15%] bg-white rounded-lg shadow-sm overflow-y-auto scrollbar-thin z-10">
        <button
        onClick={handleClick}
        className="inline-flex justify-between w-full px-2 py-1 text-xs vv:text-sm font-medium text-black rounded-lg focus:border-2 border-slate-500"
      >
        Filters <span className={`text-sm jb:text-base vv:text-lg flex justify-center items-center mr-1 my-auto ${mainDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><IoIosArrowDropdown /></span>
      </button>

      {mainDropDown && (
        <div className="mt-2 p-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          <div className="mb-4">
            <button
              onClick={() => setPriceDropDown(!priceDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Price <span className={`text-base flex justify-center items-center mr-1 my-auto ${priceDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {priceDropDown && (
              <select
                value={priceOptions}
                name="sortBy"
                id="sortBy"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setPrice(e.target.value)}
              >
                {priceOptions?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Product Condition Filter */}
          <div className="mb-4">
            <button
              onClick={() => setRatingDropDown(!ratingDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Customer Ratings <span className={`text-base flex justify-center items-center mr-1 my-auto ${ratingDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {ratingDropDown && (
              <select
                name="rating"
                id="rating"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setStar(e.target.value)}
              >
                {ratingOptions?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Country & Currency Filter */}
          <div className='mb-4'>
            <button
              onClick={() => setDiscountDropDown(!discountDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Discount Range <span className={`text-base flex justify-center items-center mr-1 my-auto ${discountDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {discountDropDown && (
              <select
                name="disocunt"
                id="disocunt"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setDiscount(e.target.value)}
              >
                {discountOptions?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="mb-4">
            <button
              onClick={() => setSortByDropDown(!sortByDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Sort By <span className={`text-base flex justify-center items-center mr-1 my-auto ${sortByDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {sortByDropDown && (
              <select
                value={sortByOptions}
                name="sortBy"
                id="sortBy"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortByOptions?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className='mb-4'>
            <button
              onClick={() => setCategoryDropDown(!categoryDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Product By Category <span className={`text-base flex justify-center items-center mr-1 my-auto ${categoryDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {categoryDropDown && (
              <select
                name="category"
                id="category"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setCategoryProduct(e.target.value)}
              >
                {categoryData?.data?.map((option) => (
                  <option value={option.id} key={option.id}>
                    {option.name}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div>
            <button
              onClick={() => setCountryDropDown(!countryDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Country & Currency <span className={`text-base flex justify-center items-center mr-1 my-auto ${countryDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {countryDropDown && (
              <select
                name="COCR"
                id="COCR"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setCountry(e.target.value)}
              >
                {countryOptions?.map((option) => (
                  <option value={option} key={option}>
                    {option}
                  </option>
                ))}
              </select>
            )}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilterOption2