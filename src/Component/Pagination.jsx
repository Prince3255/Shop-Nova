import React from 'react'
import { TfiArrowCircleRight, TfiArrowCircleLeft } from "react-icons/tfi";

const Pagination = ({totalItems, currentPage, onPageChange}) => {

    const postPerPage = 10;
    let totalPages = Math.ceil(totalItems/postPerPage)

    // if (totalPages = 1) {return null;} 

  return (
    <div className='w-full text-black h-fit py-0 flex justify-center items-center'>
        {
        (totalPages > 1) && (
            <div className='p-1 border-slate-400 rounded-full flex justify-center items-center gap-x-4 bg-[#e2dfdf] w-fit py-2 px-2.5 vv:px-8'>
                <span className={`cursor-pointer flex justify-center items-center gap-x-1 ${currentPage != 1 ? '' : 'hidden'}`} onClick={() => onPageChange(currentPage-1)}><TfiArrowCircleLeft /> Previous   <span className='custom'>|</span></span>

                {
                    [...Array(totalPages)].map((_,i) => {
                        return <span onClick={() => onPageChange(i+1)} key={i} className={`custom justify-center items-center h-8 w-8 rounded-full text-black cursor-pointer ${(i+1) === currentPage ? 'bg-white' : 'bg-transparent'}`}>{i+1}</span>
                    })
                }

                <span className={`visible vs:hidden ${(currentPage != 1 && currentPage < totalItems / 10) ? '' : 'hidden'}`}>|</span>

                <span className={`cursor-pointer flex justify-center items-center gap-x-1 ${currentPage < totalItems / 10 ? '' : 'hidden'}`} onClick={() => onPageChange(currentPage+1)}><span className='custom'>|</span>  Next<TfiArrowCircleRight /></span>
            </div>
        )
        }
    </div>
  )
}

export default Pagination