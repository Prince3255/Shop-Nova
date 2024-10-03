import React, { useEffect, useRef, useState } from 'react'
import { useGetProductsQuery, useGetProductDetailQuery } from '../Features/ECOMMERCEAPI'
import Loading from '../Component/Loading'
import Error from '../Component/Error'
import { v4 as uuidv4 } from 'uuid';
import { IoIosArrowDropdown } from "react-icons/io";
import { IoIosArrowDropup } from "react-icons/io";
import { IoStarHalfSharp } from "react-icons/io5";
import { NavLink, useLocation } from "react-router-dom"
import { BuyNow, Cart, Category, Review } from "./index"
import DealProduct from './DealProduct';
import { useAuth } from '../Component/AuthContext'

const Product = () => {
    const location = useLocation();
    const params = new URLSearchParams(location.search);
    
    // let asin = null
    // let country = null

    const [ productCondition, setProductCondition ] = useState(null)
    const [ isClicked, setIsClicked ] = useState(false)
    const [ link, setLink ] = useState(null)
    const [ initialLink, setInitialLink ] = useState(null)
    const [ asin, setAsin ] = useState(null);
    // const [ selectedAsin, setSelectedAsin ] = useState('B07ZPKBL9V');
    const [ selectedAsin, setSelectedAsin ] = useState(asin);
    // const [ country, setCountry ] = useState('US');
    const [ country, setCountry ] = useState(null);
    const [ color, setColor ] = useState(null)
    const [ initialColor, setInitialColor ] = useState(null)
    const [ size, setSize ] = useState(null)
    const [ initialSize, setInitialSize ] = useState(null)
    const [ serviceProvider, setServiceProvider ] = useState(null)
    const [ initialServiceProvider, setInitialServiceProvider ] = useState(null)
    const [ isExpanded, setIsExpanded ] = useState(false)
    const [ isExpanded1, setIsExpanded1 ] = useState(false)
    const scroll1 = useRef()

    useEffect(() => {
        const asinParam = params.get('asin');
        const countryParam = params.get('country');
        // setAsin(asinParam);
        // setCountry(countryParam);
        // setSelectedAsin(asinParam); // Set selected ASIN here
        if (asinParam && countryParam) {
            setAsin(asinParam);
            setCountry(countryParam);
            setSelectedAsin(asinParam); // Set selected ASIN here
        }
    }, [location.search]);

    const { data, isLoading, error } = useGetProductsQuery({asin: selectedAsin, country, productCondition}, { skip: !selectedAsin || !country })
    const { data: detailProduct, isLoading: detailLoading, error: detailError } = useGetProductDetailQuery({asin: selectedAsin, country, productCondition}, { skip: !selectedAsin || !country })

    

    useEffect(() => {
        let index = 0;
        // if (asin && selectedAsin && data && detailProduct) {
            if (detailProduct?.data?.product_photos?.length > 0) {
                setLink(detailProduct.data.product_photos[0]); // Set first image as default
                setInitialLink(detailProduct.data.product_photos[0]); // Set first image as default
            }
    
            if (detailProduct?.data?.product_variations) {while ((detailProduct?.data?.product_variations?.color?.length > 0) && (color === null)  ) {
                if (String(detailProduct?.data?.product_variations?.color[index]?.asin) === String(selectedAsin)) {
                    setColor(detailProduct?.data?.product_variations?.color[index].value)
                    setInitialColor(detailProduct?.data?.product_variations?.color[index].value)
                    index = 0;
                    break;
                }
                else {
                    index++;
                }    
            }
    
            while (detailProduct?.data?.product_variations?.size?.length > 0) {
                if (String(detailProduct?.data?.product_variations?.size[index]?.asin) === String(selectedAsin)) {
                    setSize(detailProduct?.data?.product_variations?.size[index].value)
                    setInitialSize(detailProduct?.data?.product_variations?.size[index].value)
                    index = 0;
                    break;
                }
                else {
                    index++;
                }    
            }
    
            while (detailProduct?.data?.product_variations?.service_provider?.length > 0) {
                if (String(detailProduct?.data?.product_variations?.service_provider[index]?.asin) === String(selectedAsin)) {
                    setServiceProvider(detailProduct?.data?.product_variations?.service_provider[index]?.value)
                    setInitialServiceProvider(detailProduct?.data?.product_variations?.service_provider[index]?.value)
                    index = 0;
                    break;
                }
                else {
                    index++;
                }    
            }}
    
            if (detailProduct?.data?.product_information?.Color) {
                setColor(detailProduct?.data?.product_information?.Color)
                setInitialColor(detailProduct?.data?.product_information?.Color)
            }
        // }
    }, [data, detailProduct, asin, selectedAsin]);
    
    const imgRef = useRef()
    const zoomRef = useRef()
    const magnifiedImage = useRef()
    const rollImage = useRef()

    // useEffect(() => {
    //     if (data?.data?.product_photos?.length > 0) {
    //         // setLink(data.data.product_photos[1]); // Set first image as default
    //     }
    // }, [link])

    const { addToCart } = useAuth()

    if (isLoading || detailLoading) return <Loading />

    if (error || detailError) return <Error />

    if (!data || !detailProduct) return <div className='text-2xl text-center'>No results found</div>;

    let country1 = country
    let asin1 = asin

    const productCondition1 = [
    {label: 'Any', value: 'ANY'},
    {label: 'New', value: 'NEW'},
    {label: 'Used Like New', value: 'USED_LIKE_NEW'},
    {label: 'Used Very Good', value: 'USED_VERY_GOOD'},
    {label: 'Used Good', value: 'USED_GOOD'},
    {label: 'Used Acceptable', value: 'USED_ACCEPTABLE'}
    ];
    

    const handleScrollClick = (direction) => {
        setIsClicked(!isClicked)
        if (scroll1.current) {
            if (direction === 'up') {
                scroll1.current.scrollTop -= 8000
            }
            else if (direction === 'down') {
                scroll1.current.scrollTop += 8000
            }
        }
    }

    const handleMouseLeave1 = () => {
        if(window.innerWidth <= 880) return

        const zoom = zoomRef.current
        const magnifiedImageRef = magnifiedImage.current
        const roll = rollImage.current

        if (zoom) {
            zoom.style.display = 'none'
        }

        if (roll) {
            roll.style.display = 'block'
        }

        if (magnifiedImageRef) {
            magnifiedImageRef.classList.remove('active')
        }
    }

    const handleMouseEnter = (option, color, size, serviceProvider) => {
        setLink(option)
        setColor(color)
        setSize(size)
        setServiceProvider(serviceProvider)
    }

    const handleMouseLeavee1 = () => {
        setColor(initialColor)
        setLink(initialLink)
        setSize(initialSize)
        setServiceProvider(initialServiceProvider)
    }


    const handleMouseMove = (event) => {
        if(window.innerWidth <= 880) return

        const image = imgRef.current
        const zoom = zoomRef.current
        const magnifiedImageRef = magnifiedImage.current
        const roll = rollImage.current

        if (image && zoom) {
            zoom.style.display = 'block'
            roll.style.display = 'none'
            magnifiedImageRef.classList.add('active')

            const abcd = event.target.getBoundingClientRect()

            let x = event.pageX - abcd.left - zoom.offsetWidth / 2
            let y = event.pageY - abcd.top - zoom.offsetHeight / 2

            let max_xpos = abcd.width - zoom.offsetWidth
            let max_ypos = abcd.height - zoom.offsetHeight

            if (x > max_xpos) x = max_xpos
            if  (x < 0) x = 0

            if (y > max_ypos) y = max_ypos
            if (y < 0) y = 0

            zoom.style.left = x + "px"
            zoom.style.top = y + "px"

            let cx = magnifiedImageRef.offsetWidth / zoom.offsetWidth
            let cy = magnifiedImageRef.offsetHeight / zoom.offsetHeight

            magnifiedImageRef.style.backgroundPosition = `-${x * cx}px -${y * cy}px`
            magnifiedImageRef.style.backgroundImage = `url(${link})`
            magnifiedImageRef.style.backgroundSize = `${abcd.width * cx}px ${abcd.height * cy}px`
            magnifiedImageRef.style.backgroundRepeat = `no-repeat`
        }
    } 
    
    const stars = []

    const countStartRating = (number) => {
        // let number1 = Number(number)
        let i = 0
        while (i < Math.floor(number)) {
            stars.push(<span key={i} className='text-sm md:text-base text-[#FFD700]'>&#9733;</span>);
            i++;
        }
    
        if (number - i >= 0.1) {
            stars.push(<IoStarHalfSharp key={i} className='inline text-[0.75rem] md:text-base text-[#FFD700] mt-0' />);
            i++;
        }
    
        while (i < 5) {
            stars.push(<span key={i} className='text-sm md:text-base text-gray-300'>&#9734;</span>);
            i++;
        }
    
        return stars;
    }

    const handleAsinChange = (newAsin) => {
        setSelectedAsin(newAsin);
        // refetch(); // Refetch the data for the new ASIN
    }

    const toggleExpand = () => {
        setIsExpanded(!isExpanded)
    }

    const toggleExpand1 = () => {
        setIsExpanded1(!isExpanded1)
    }

    const handleAddToCart = (item) => {
        addToCart(item)
    }

  return (
    <div className='min-h-screen w-full'>
        {/* {console.log(data)} */}
        {/* {console.log(detailProduct)} */}
        <div className='h-full w-full'>
            {/* <label htmlFor="Product" className='block mb-2 text-lg font-medium text-gray-700'>
                <h2>Product Condition</h2>
            </label>
            <select value={productCondition} name="productCondition" id="productCondition" className='block w-full rounded-md border-gray-300 focus:ring-indigo-500 focus:ring-2 hover:border-indigo-500 hover:shadow-md text-base p-3 transition ease-in-out duration-200 truncate' onChange={(e) => setProductCondition(e.target.value)}>
            {productCondition1?.map((option) => 
                <option value={option.value} key={option.value} className='hover:text-indigo-400' >{option.label}</option>
            )}
            </select> */}
            {/* {console.log(data)} */}
            <div className='page1 flex flex-col dj:flex-row justify-between items-center min-h-[90%] w-full flex-wrap p-4 space-y-8 dj:space-y-0'>
                {(detailProduct?.data?.product_title && detailProduct?.data?.product_price) ? (
                    <>
                <div className='left flex flex-row w-full dj:flex-[42%] justify-between space-x-4 h-full'>
                    <div className='left1 w-8 vd:w-12 rounded-md border-slate-400 border-solid border-[1px] max-h-fit'>
                        <button onClick={() => handleScrollClick('up')} className={`${isClicked ? 'flex' : 'hidden'} justify-center items-center w-full p-1 text-xl cursor-pointer`}>
                            <IoIosArrowDropup />
                        </button>
                        <div ref={scroll1} className='left2 w-8 vd:w-12 max-h-96 jb:max-h-[500px] overflow-y-scroll overflow-x-hidden scroll-smooth'>
                        {
                            detailProduct?.data?.product_photos?.map((option) => (
                                <>
                                    <img src={option} alt={detailProduct.data.product_title} key={uuidv4()} className='object-cover w-full h-auto my-2 px-1 cursor-pointer hover:scale-110 transition' onMouseEnter={() => handleMouseEnter(option, color, size, serviceProvider)}/>
                                    <hr className='h-[1px] border-0 bg-slate-400'/>
                                </>
                            ))
                        }
                        </div>
                        <button onClick={() => handleScrollClick('down')} className={`${isClicked ? 'hidden' : 'flex'} justify-center items-center w-full p-1 text-xl cursor-pointer`}>{<IoIosArrowDropdown />}</button>
                    </div>
                    <div className='left2345678 relative w-full h-[400px] jb:h-[530px] flex flex-col justify-center items-center'>
                        {
                            link ? (
                            <>
                                <img ref={imgRef} src={link} alt="abcd" className='h-full w-full object-contain cursor-crosshair' onMouseLeave={handleMouseLeave1}  onMouseMove={handleMouseMove}/>
                                <span ref={zoomRef} className='absolute w-36 h-36 bg-black bg-opacity-30 pointer-events-none top-0 left-0 border-2 border-slate-700 z-[2] hidden'></span>
                                <span ref={rollImage} className='roll-image-span hidden ml:block text-xs text-center w-full h-fit '>Roll over image to zoom in</span>
                            </>    
                            ) : (null)
                        }
                    </div>
                </div>
                <div className='right relative flex flex-[50%] h-[540px]  overflow-y-scroll overflow-x-hidden scroll-smooth'>
                    {/* {console.log(data)} */}
                    {/* {console.log(detailProduct)} */}
                    <div ref={magnifiedImage} className='magnifiedImage'>
                    </div>
                    <div className='h-full w-full'>
                        <div className='w-full h-full p-4'>
                            <h1 className='text-lg md:text-2xl font-semibold'>{detailProduct?.data?.product_title}</h1>
                            <div className='my-2 text-lg'>
                                <div className='flex flex-wrap relative'>
                                    <span className='text-sm mt-2 md:mt-0 md:text-base'>{detailProduct?.data?.product_star_rating}</span>
                                    {
                                        (detailProduct?.data?.product_star_rating > 0) ? 
                                        (<p className='flex items-center ml-2'>
                                            {countStartRating(detailProduct?.data?.product_star_rating)}
                                            <span className='text-xs md:text-sm ml-2'>{detailProduct.data?.product_num_ratings
                                            } &nbsp;ratings</span>
                                        </p>) : (null)
                                    }
                                    <span className='mx-3 mt-1 md:mt-0'>|</span>
                                    <span className='text-xs md:text-sm mt-[10px] dj:mt-1'>{detailProduct?.data?.sales_volume}</span>
                                        {/* <span className='mx-3'>|</span> */}
                                    <span className='items-center absolute right-0 hidden lg:flex'>
                                    { 
                                        detailProduct?.data?.is_prime ? 
                                        (<img src="https://www.logotypes101.com/logos/875/A41B7A0C2125D3C1F6DDDE56C1203C77/amazon_prime_icon.png" alt="Prime" className='w-8 h-8 object-contain mr-4'/>) : (null)
                                    }
                                    { 
                                        detailProduct?.data?.is_best_seller ? 
                                        (<p className='bg-[#F5553A] text-white py-1 px-2 text-xs'>BEST SELLER</p>) : (null)
                                    }
                                    </span>
                                </div>
                                <span className='flex lg:hidden items-center my-2'>
                                    { 
                                        detailProduct?.data?.is_prime ? 
                                        (<img src="https://www.logotypes101.com/logos/875/A41B7A0C2125D3C1F6DDDE56C1203C77/amazon_prime_icon.png" alt="Prime" className='w-8 h-8 object-contain mr-4'/>) : (null)
                                    }
                                    { 
                                        detailProduct?.data?.is_best_seller ? 
                                        (<p className='bg-[#F5553A] text-white py-1 px-2 text-xs'>BEST SELLER</p>) : (null)
                                    }
                                    </span>
                                <hr className='my-1 mb-4'/>
                                <div>
                                    {
                                        detailProduct?.data?.product_price && (
                                            <p className='text-sm lg:text-[18px]'>Price: <span className='font-[500]'>{detailProduct?.data?.product_price}</span></p>
                                        )
                                    }
                                    {  
                                        detailProduct?.data?.product_variations?.color ?  
                                        (<p className='block my-2 text-sm lg:text-[18px]'>Color: <span className='font-[500]'>{color}</span></p>) : null
                                    }
                                    <div className='flex items-center space-x-4 overflow-x-scroll lr12'>
                                    {
                                        detailProduct?.data?.product_variations &&
                                        (detailProduct?.data?.product_variations?.color?.length > 0) ? (
                                            detailProduct?.data?.product_variations?.color?.map((option, index) => (
                                                option?.is_available ? (
                                                    <div key={index} className='flex items-center'>
                                                        <img 
                                                            src={option.photo} 
                                                            alt={option.value} 
                                                            className={`object-contain inline cursor-pointer max-w-fit h-14 rounded-sm border-[1.5px] ${(String(option.asin) === String(selectedAsin) )? 'border-indigo-500 border-[2.2px]' : 'border-slate-400'} hover:border-slate-800`} 
                                                            onClick={() => handleAsinChange(option.asin)} 
                                                            onMouseEnter={() => handleMouseEnter(option.photo, option.value, size, serviceProvider)}
                                                            onMouseLeave={handleMouseLeavee1}
                                                        />
                                                    </div>
                                                    // #007185
                                                ) : null
                                            ))
                                        ) : null
                                    }
                                    </div>
                                    {
                                        detailProduct?.data?.product_variations?.size ?  
                                        (<p className='block my-2 text-sm lg:text-[18px]'>Size: <span className='font-[500]'>{size}</span></p>) : null
                                    }
                                    <div className='flex items-center space-x-4 overflow-x-scroll overflow-y-hidden lr12'>
                                    {
                                        detailProduct?.data?.product_variations &&
                                        (detailProduct?.data?.product_variations?.size?.length > 0) ? (
                                            detailProduct?.data?.product_variations?.size?.map((option, index) => (
                                                option?.is_available ? (
                                                    <div key={index} className='flex items-center'>
                                                        <p className={`flex text-sm justify-center items-center cursor-pointer w-max h-8 p-1 rounded-md border-[1.5px] ${(String(option.asin) === String(selectedAsin) )? 'border-indigo-500 border-[2.2px]' : 'border-slate-400'} hover:border-slate-800`} 
                                                        onClick={() => handleAsinChange(option.asin)} 
                                                        onMouseEnter={() => handleMouseEnter(link,color,option.value, serviceProvider)}
                                                        onMouseLeave={handleMouseLeavee1}>
                                                            {option.value}
                                                        </p>
                                                    </div>
                                                    // #007185
                                                ) : null
                                            ))
                                        ) : null
                                    }
                                    </div>
                                    {
                                        detailProduct?.data?.product_variations?.service_provider ?  
                                        (<p className='block my-2 text-sm lg:text-[18px]'>Service Provider: <span className='font-[500]'>{serviceProvider}</span></p>) : null
                                    }
                                    <div className='flex items-center space-x-4'>
                                    {
                                        detailProduct?.data?.product_variations &&
                                        (detailProduct?.data?.product_variations?.service_provider?.length > 0) ? (
                                            detailProduct?.data?.product_variations?.service_provider?.map((option, index) => (
                                                option?.is_available ? (
                                                    <div key={index} className='flex items-center'>
                                                        <p className={`flex text-sm justify-center items-center cursor-pointer w-fit h-8 px-2 rounded-md border-[1.5px] ${(String(option.asin) === String(selectedAsin) )? 'border-indigo-500 border-[2.2px]' : 'border-slate-400'} hover:border-slate-800`} 
                                                        onClick={() => handleAsinChange(option.asin)} 
                                                        onMouseEnter={() => handleMouseEnter(link,color,size, option.value)}
                                                        onMouseLeave={handleMouseLeavee1}>
                                                            {option.value}
                                                        </p>
                                                    </div>
                                                    // #007185
                                                ) : null
                                            ))
                                        ) : null
                                    }
                                    </div>
                                    {
                                        detailProduct?.data?.climate_pledge_friendly ?  
                                        (
                                            <div className='flex space-x-4 items-center my-2'>
                                            <img src="https://m.media-amazon.com/images/I/11qFTG64RvL.png" alt="CPF" className='size-5 lg:size-8'/>
                                            <p className='text-sm text-[#168342]'>Climate Pledge Friendly</p>
                                            </div>
                                        ) : null
                                    }
                                </div>
                            </div>
                            <div className='w-full h-fit flex justify-start items-center my-4 space-x-5'>
                                {/* <NavLink> */}
                                    <button className='bg-[#FA8900] px-4 bj:px-7 py-1 bj:py-2 rounded-full text-base lg:text-lg text-center text-white'>Buy Now</button>
                                {/* </NavLink> */}
                                <button className='bg-[#F7CA00] px-4 bj:px-7 py-1 bj:py-2 rounded-full text-base text-center text-white' onClick={() => handleAddToCart({asin: selectedAsin, title: detailProduct?.data?.product_title, image: link, price: detailProduct?.data?.product_price, date: detailProduct?.data?.delivery})}>Add to Cart</button>
                            </div>
                            <div className='mb-4 p-1'>
                                {
                                    detailProduct?.data?.delivery ? (
                                        <>
                                            <p>Delivery {detailProduct.data.delivery}</p>
                                            <p className='text-[#148114] text-lg'>{detailProduct.data.product_availability}</p>
                                        </>
                                    ) : (null)
                                }
                            </div>
                            <div className='w-full p-1'>
                                {
                                    detailProduct?.data?.product_description ? (
                                        <>
                                            <hr className='my-1 mb-4'/>
                                            <h1 className='text-lg font-[500]'>Product Description</h1>
                                            <p>
                                                {detailProduct?.data?.product_description}
                                            </p>
                                        </>
                                    ) : (null)
                                }
                            </div>
                            {
                                detailProduct?.data?.about_product ? (
                                <>
                                    <hr className='my-4'/>
                                    <h1 className='text-lg font-[500] mt-4'>About Product</h1>
                                    {detailProduct?.data?.about_product?.map((option, index) => (
                                        <p key={index}><span className='font-[500]'>{index + 1}.</span> {option}</p>
                                    ))}
                                </> 
                                ) : (null)
                            }
                            {
                                detailProduct?.data?.product_details ? (
                                    <>
                                        <hr className='my-4'/>
                                        <h1 className='text-lg font-[500] mt-4'>Product Details</h1>
                                        <div className={`overflow-hidden ${isExpanded ? '' : 'max-h-24'}`}>
                                            {
                                                Object.entries(detailProduct?.data?.product_details)?.map(([key, value]) => (
                                                    <div key={key} className='flex w-full justify-between dj:justify-normal'>
                                                        <span className='left w-[40%] font-medium'>
                                                            {key}
                                                        </span>
                                                        <span className='right w-1/2'>
                                                            {value}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <button onClick={toggleExpand}className="text-blue-500 hover:underline">
                                            {isExpanded ? 'See less' : 'See more'}
                                        </button>
                                    </>
                                ) : (null)
                            }
                            {
                                detailProduct?.data?.product_information ? (
                                    <>
                                        <hr className='my-4'/>
                                        <h1 className='text-lg font-[500] mt-4'>Product Information</h1>
                                        <div className={`overflow-hidden ${isExpanded1 ? '' : 'max-h-32'}`}>
                                            {
                                                Object.entries(detailProduct?.data?.product_information
                                                )?.map(([key, value]) => (
                                                    <div key={key} className='flex w-full justify-between dj:justify-normal'>
                                                        <span className='left w-[40%] font-medium'>
                                                            {key}
                                                        </span>
                                                        <span className='right w-1/2'>
                                                            {value}
                                                        </span>
                                                    </div>
                                                ))
                                            }
                                        </div>

                                        <button onClick={toggleExpand1}className="text-blue-500 hover:underline">
                                            {isExpanded1 ? 'Show less' : 'Show more'}
                                        </button>
                                    </>
                                ) : (null)
                            }
                        </div>
                    </div>
                </div>
                </>
            ) : (<div className='text-2xl text-center'>No results found</div>)}
            </div>
            {/* <hr className='my-1'/>
            <div className='page2 w-full my-4 p-4'>
                {
                    (detailProduct?.data?.category_path.length > 0) ? (
                        <>
                            <h1 className='text-xl font-semibold mb-4 px-8'>Deals on related products</h1>
                            <div className='px-12 my-8'>
                                {
                                    <Category categoryPath={detailProduct?.data?.category_path} country={'US'}/>
                                }
                            </div>
                        </>
                    ) : (null)
                }
            </div> */}
            <hr className='my-1'/>
            <div className='page3 w-full my-4 p-2 vv:p-4'>
                {
                    (detailProduct?.data?.category_path?.length > 0) ? (
                        <>
                            <h1 className='text-base jb:text-lg vv:text-xl font-semibold mb-0 jb:mb-4 px-4 ld:px-8'>Products related to this item</h1>
                            <div className='px-2 vs:px-4 ld:px-12 my-8'>
                                {
                                    <Category categoryPath={detailProduct?.data?.category_path} country={country}/>
                                }
                            </div>
                        </>
                    ) : (null)
                }
            </div>
            <hr className='my-1'/>
            <div className='page4 w-full my-4 p-0 vd:p-4'>
                {
                    (detailProduct?.data?.customers_say) ? (
                        <>
                            <h1 className='text-2xl text-center font-semibold mb-4'>Customer Reviews</h1>
                            <div className='px-8 mb-7'>
                                <h1 className='my-1 font-semibold text-lg'>Customers say</h1>
                                <p>{detailProduct?.data?.customers_say}</p>
                            </div>
                        </>
                    ) : (null)
                }
                <div className='px-6'>
                    {<Review asin={selectedAsin} country={country} />}
                </div>
            </div>
        </div>
    </div>
  )
}

export default Product