import React, { useEffect, useState } from 'react'
import { useGetReviewQuery } from '../Features/ECOMMERCEAPI'
import Loading from '../Component/Loading'
import Error from '../Component/Error'
import { IoStarHalfSharp } from "react-icons/io5";

const Review = ({asin, country}) => {
    const [ sortBy, setSortBy ] = useState('TOP_REVIEWS')
    const [ starRating, setStarRating ] = useState('ALL')
    const [ verifiedPurchaseOnly, setVerifiedPurchaseOnly ] = useState('False')
    const [ page, setPage ] = useState(1)
    const [ reviews, setReviews ] = useState([])
    const [visibleReviews, setVisibleReviews] = useState([]);

    const { data, isLoading, error } = useGetReviewQuery({asin, country, sortBy, starRating, verifiedPurchaseOnly, page})

    useEffect(() => {

        if (data?.data?.reviews) {
            setReviews(data.data.reviews)
        }
    }, [data, sortBy, starRating, verifiedPurchaseOnly, page])

    useEffect(() => {
        const reviewPerPage = 10
        const startIndex = 0
        const endIndex = startIndex + reviewPerPage
        setVisibleReviews(reviews.slice(startIndex, endIndex))
    }, [page, data, reviews])

    if (isLoading) return <Loading />

    if (error) return <Error />

    if (!data) return <div className='text-2xl text-center'>No results found</div>;

    const sortByy = [
        { label: 'Top reviews', value: 'TOP_REVIEWS' },
        { label: 'Most recent', value: 'MOST_RECENT' },
    ];

    
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

    const handlePage = () => {
        setPage(prevPage => prevPage + 1)
    }

    const handlePage1 = () => {
        if (page > 1) {
            setPage(prevPage => prevPage - 1)
        }
    }

  return (
    <>
        {
        visibleReviews ? (
            <div>
                {/* {console.log(data)} */}
                {   (visibleReviews?.length > 0) ? (
                    <>
                        <label htmlFor="sortBy" className='block mb-1 text-base font-medium text-gray-700 px-3'>
                            <h2>Sort By</h2>
                        </label>
                        <select 
                            name="sortBy" 
                            id="sortBy" 
                            className='block w-fit rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 bg-slate-200 hover:border-indigo-500 hover:shadow-md p-2 transition ease-in-out duration-200 truncate  text-sm mb-4'
                            onChange={(e) => setSortBy(e.target.value)}
                        >
                            {sortByy?.map((option) => 
                            <option value={option.value} key={option.value} className='hover:text-indigo-400'>
                                {option.label}
                            </option>
                            )}
                        </select>
                        {
                            visibleReviews.map((option, index) => (
                                  <>
                                    <div className='top' key={index}>
                                        <div className='left flex items-center justify-between'>
                                            <div className="left1 w-fit p-2 cursor-pointer">
                                                {
                                                    option?.review_author_avatar ? (
                                                        <div className='flex  items-center space-x-4'>
                                                            <img src={option.review_author_avatar} alt="Avatar" className='w-9 h-9 rounded-full' />
                                                            <p>
                                                                {option.review_author}
                                                            </p>
                                                        </div>
                                                    ) : (null)
                                                }
                                            </div>
                                            <div className="left2">
                                                    {
                                                        option?.is_verified_purchase ? (        
                                                            <p className='text-xs jb:text-base text-[#C45500]'>
                                                                Verified Purchase
                                                            </p>
                                                        ) : (null)
                                                    }
                                            </div>
                                        </div>
                                    </div>
                                    <div className='bottom px-4'>
                                        <div className='bottom1 flex'>
                                            {
                                                countStartRating(option?.review_star_rating)
                                            }
                                            <p className='ml-2'>
                                                {option?.review_title}
                                            </p>
                                            {/* review_title */}
                                        </div>
                                        <p className='mb-2 mt-1'>
                                            {option?.review_date}
                                        </p>
                                        <p className='my-2'>
                                            {option?.review_comment}
                                        </p>
                                        <p className='mb-4'>
                                            {
                                                option?.helpful_vote_statement
                                            }
                                        </p>
                                    </div>
                                </>          
                            ))
                        }
                        <div className='text-center my-2'>
                            <button className={`${(page === 1) ? 'text-slate-400 cursor-none' : 'text-blue-500 hover:underline'}`} onClick={handlePage1}>Previous page</button>
                            <span> / </span>
                            <button className='text-blue-500 hover:underline' onClick={handlePage}>Next page</button>
                        </div>
                    </>
                    ) : (null)
                }
            </div>
        ) : (null, setPage(1))
        }
    </>
  )
}

export default Review