import React, { useState } from 'react'
import { IoIosArrowDropdown } from "react-icons/io";
import { RiArrowDropDownLine } from "react-icons/ri";

const FilterOption = ({sortByy, productCondition1, country1, setSortBy, setProductCondition, setCountry}) => {
    const [ mainDropDown, setMainDropDown ] = useState(false)
    const [ productDropDown, setProductDropDown ] = useState(false)
    const [ countryDropDown, setCountryDropDown ] = useState(false)
    const [ sortByDropDown, setSortByDropDown ] = useState(false)

    const handleClick = () => {
        setMainDropDown(!(mainDropDown))
    }

  return (
    <div className="absolute ml:hidden left-2 top-11 inline-block text-left w-[35%] jb:w-[30%] vd:w-[20%] vp:w-[15%] bg-white rounded-lg shadow-sm overflow-y-auto scrollbar-thin z-10">
        <button
        onClick={handleClick}
        className="inline-flex justify-between w-full px-2 py-1 text-sm font-medium text-black rounded-lg focus:border-2 border-slate-500"
      >
        Filters <span className={`text-lg flex justify-center items-center mr-1 my-auto ${mainDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><IoIosArrowDropdown /></span>
      </button>

      {mainDropDown && (
        <div className="mt-2 p-4 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5">
          {/* <h2 className="text-center text-base font-semibold mb-2">Filters</h2>
          <hr className="mb-2" /> */}

          {/* Sort By Filter */}
          <div className="mb-4">
            <button
              onClick={() => setSortByDropDown(!sortByDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Sort By <span className={`text-base flex justify-center items-center mr-1 my-auto ${sortByDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {sortByDropDown && (
              <select
                value={sortByy}
                name="sortBy"
                id="sortBy"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setSortBy(e.target.value)}
              >
                {sortByy?.map((option) => (
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
              onClick={() => setProductDropDown(!productDropDown)}
              className="w-full flex justify-between text-xs text-left font-medium text-gray-700"
            >
              Product Condition <span className={`text-base flex justify-center items-center mr-1 my-auto ${productDropDown ? 'rotate-180 duration-300' : 'rotate-0 duration-300'} `}><RiArrowDropDownLine /></span>
            </button>
            {productDropDown && (
              <select
                name="productCondition"
                id="productCondition"
                className="block w-full mt-2 rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-xs p-1"
                onChange={(e) => setProductCondition(e.target.value)}
              >
                {productCondition1?.map((option) => (
                  <option value={option.value} key={option.value}>
                    {option.label}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Country & Currency Filter */}
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
                {country1?.map((option) => (
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

export default FilterOption