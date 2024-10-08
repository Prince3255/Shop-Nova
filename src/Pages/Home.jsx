import React, { useEffect, useState, useRef } from 'react';
import DealData from '../Component/DealData';
import Loading from '../Component/Loading';
import Error from '../Component/Error';
import { useNavigate } from 'react-router-dom';
import { useGetSearchQuery, useGetDealQuery } from '../Features/ECOMMERCEAPI';
import { IoStarHalfSharp } from "react-icons/io5";
import DateTime from '../Component/DateTime';
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger';

// Register the GSAP plugin
gsap.registerPlugin(ScrollTrigger);


const Home = () => {
  const [deals, setDeals] = useState(null);
  const [img1, setImg1] = useState('');
  const [img2, setImg2] = useState('');
  const [img3, setImg3] = useState('');
  const [img4, setImg4] = useState('');
  const [img5, setImg5] = useState('');
  const [img6, setImg6] = useState('');
  const [img7, setImg7] = useState('');

  const handleData = (dealData) => {
    if (dealData) {
      setDeals(dealData); // Set deals only if data is present
    }
    else {
      console.log("no data found")
    }
  };

  useEffect(() => {
    if (deals && deals.length > 0) {
      // Safe to access deals[0] now
      setImg1(deals[0]?.deal_photo || '');
      setImg2(deals[1]?.deal_photo || '');
      setImg3(deals[2]?.deal_photo || '');
      setImg4(deals[3]?.deal_photo || '');
      setImg5(deals[4]?.deal_photo || '');
      setImg6(deals[5]?.deal_photo || '');
      setImg7(deals[6]?.deal_photo || '');
    }
  }, [deals]);

  // const animatRefs = useRef([]);
  // const arrowRefs = useRef([]);

  // useEffect(() => {
  //   if (!animatRefs.current) return;
  //   const handleScroll = throttle(() => {
  //     if (window.scrollY > currentScroll) {
  //       scrolldown = true;
  //     } else {
  //       scrolldown = false;
  //     }

  //     // Update tween animation
  //     gsap.to(tween, {
  //       timeScale: scrolldown ? 1 : -1,
  //     });

  //     // Rotate arrows
  //     arrowRefs.current.forEach((arrow) => {
  //       gsap.to(arrow, {
  //         rotate: scrolldown ? 180 : 0,
  //       });
  //     });

  //     currentScroll = window.scrollY;
  //   }, 200);

  //   let currentScroll = 0;
  //   let scrolldown = true;

  //   // const resetAutoSlide = () => {
  //   //   clearTimeout(setTime)
  //   //   startAutoSlide()
  //   // }
  //   // Animation for animat elements
  //   let tween = gsap
  //     .to(animatRefs.current, {
  //       xPercent: -200, // Move horizontally by percentage
  //       repeat: -1,
  //       duration: 9,
  //       ease: 'linear',
  //     })
  //     .totalProgress(0.5);

  //   window.addEventListener('scroll', handleScroll);

  //   // Cleanup when the component unmounts
  //   return () => {
  //     window.removeEventListener('scroll', handleScroll);
  //   };
  // }, [animatRefs, arrowRefs]);

  // useEffect(() => {
  //   console.log("animatRefs", animatRefs.current);
  //   console.log("arrowRefs", arrowRefs.current);
  // }, []);
  

  useEffect(() => {

    const animatElements = document.querySelectorAll('.animat'); // Add a class to target elements
  const arrowElements = document.querySelectorAll('.arrow1');

  

  // while (animatElements.length === 0) {
  //   console.log('jfvhb')
  // }

    let currentScroll = 0;
    let scrolldown = false;
    let tween = gsap
        .to(animatElements, {
          xPercent: -200,
          repeat: -1,
          duration: 9,
          ease: 'linear',
        })
        .totalProgress(0.5);
  
    const handleScroll = throttle(() => {
      scrolldown = window.scrollY > currentScroll;
  
      // Update tween animation
      gsap.to(tween, {
        timeScale: scrolldown ? 1 : -1,
      });
  
      // Rotate arrows
      arrowElements.forEach((arrow) => {
        gsap.to(arrow, {
          rotate: scrolldown ? 180 : 0,
        });
      });
  
      currentScroll = window.scrollY;
    }, 200);
  

      // Animation for animat elements
       
  
      window.addEventListener('scroll', handleScroll);
      return () => {
        window.removeEventListener('scroll', handleScroll);
        if (tween) tween.kill(); // Cleanup GSAP tween to prevent memory leaks
      };
  
    // Cleanup when the component unmounts
  }, []);
  

  // Throttle function for better performance
  const throttle = (callback, limit) => {
    let wait = false;
    return function () {
      if (!wait) {
        callback.apply(null, arguments);
        wait = true;
        setTimeout(() => {
          wait = false;
        }, limit);
      }
    };
  };

                const listRef = useRef(null);  // Ref for the list element
                const carouselRef = useRef(null); // Ref for the carousel element
                const [isSliding, setIsSliding] = useState(false); // State to manage slide animation
                
                let timeAutoNext = 7000;  // Time before switching to the next slide
                let timeAutoCut = 3000;   // Time for the transition animation
                
                let setClearTime; // For clearing the animation timeout
                let setTime; // For clearing and restarting the 7-second timer
                
                const debounce = (func, delay) => {
                  let timeout
    return (...args) => {
      clearTimeout(timeout)
      timeout = setTimeout(() => {
        func.apply(this, args)
      }, delay)
    }
  } 
  const resetAutoSlide = () => {
      clearTimeout(setTime)
      startAutoSlide()
    }

  const showSlider = (type) => {
    // if (isSliding) return; // Prevent actions during ongoing animation

    if (listRef.current && carouselRef.current) {
      // setIsSliding(true); // Mark that a slide is in progress
      let sliderShow = listRef.current.querySelectorAll('.item');

      if (type === 'next') {
        listRef.current.appendChild(sliderShow[0]);  // Move first item to the end
        carouselRef.current.classList.add('next');
      } else {
        listRef.current.insertBefore(sliderShow[sliderShow.length - 1], sliderShow[0]);
        carouselRef.current.classList.add('prev');
      }

      // Clear the timeout for resetting classes
      clearTimeout(setClearTime); //
      setClearTime = setTimeout(() => {
        carouselRef.current.classList.remove('next');
        carouselRef.current.classList.remove('prev');
        // setIsSliding(false); // Allow new actions after animation completes

        // Restart the 7-second timer after the slide animation ends
        clearTimeout(setTime); //
        setTime = setTimeout(() => {
          showSlider('next');
        }, timeAutoNext);
      }, timeAutoCut);

      resetAutoSlide()
    }
  };
  const debounceSlider = debounce(showSlider, 500)

  const startAutoSlide = () => {
    clearTimeout(setTime)
    setTime = setTimeout(() => {
      debounceSlider('next');
    }, timeAutoNext);
  };

  // Auto-slide timer setup in useEffect
  useEffect(() => {
    startAutoSlide();

    // Clean up the timeouts when the component unmounts
    return () => {
      clearTimeout(setTime);
      clearTimeout(setClearTime);
    };
  }, []); // Empty dependency array to run only on mount

  const navigate = useNavigate()

  const { data, isLoading, error } = useGetSearchQuery({searchTerm: 'Best Sellers in Electronics', page: 1, country: 'US', sortBy: 'RELEVANCE', productCondition: 'ALL'})

  const { data: searchData, isLoading: searchLoading, error: searchError } = useGetSearchQuery({searchTerm: 'Best Sellers in Clothing, Shoes and jewelery', page: 1, country: 'US', sortBy: 'RELEVANCE', productCondition: 'ALL'})

  const { data: searchData2, isLoading: searchLoading2, error: searchError2 } = useGetSearchQuery({searchTerm: 'Best Sellers in Sports & Outdoors', page: 1, country: 'US', sortBy: 'RELEVANCE', productCondition: 'ALL'})

  const { data: searchData4, isLoading: searchLoading4, error: searchError4 } = useGetSearchQuery({searchTerm: 'Best Sellers in Beauty and Personal Care', page: 1, country: 'US', sortBy: 'RELEVANCE', productCondition: 'ALL'})

  const { data: searchData5, isLoading: searchLoading5, error: searchError5 } = useGetSearchQuery({searchTerm: 'Best Sellers in Home & Kitchen', page: 1, country: 'US', sortBy: 'RELEVANCE', productCondition: 'ALL'})

  const { data: dealData, isLoading: dealLoading, error: dealError } = useGetDealQuery({country: 'US', offSet: 0,  categoryProduct: 'aps', star: 'ALL', price: 'ALL', discount: 'ALL'})

  if (isLoading || dealLoading || searchLoading || searchLoading2 || searchLoading4 || searchLoading5) return <Loading />
  
  if (error || dealError || searchError || searchError2 || searchError4 || searchError5) return <Error />

  if (!data || !dealData || !searchData || !searchData2 || !searchData4 || !searchData5) return <div className='text-2xl text-center'>No results found</div>;

  // Function to start the auto-slide



  // Function to handle the sliding logic
  


  // Event handler for next/prev buttons
  const handleButtonClick = (type) => {
    clearTimeout(setTime);  // Stop the current auto-slide timer

        debounceSlider(type);       // Move to the next or previous slide immediately
  };

  const handleClick = (asin) => {
    const country = 'US'

    if (asin) {
        navigate(`/product?asin=${encodeURIComponent(asin)}&country=${encodeURIComponent(country)}`);
    } else {
        console.error('ASIN not available');
    }
  }

  const countStartRating = (number) => {
    const stars = []
    // let number1 = Number(number)
    let i = 0
    while (i < Math.floor(number)) {
        stars.push(<span key={i} className='text-xs vv:text-base text-[#FFD700]'>&#9733;</span>);
        i++;
    }

    if (number - i >= 0.1) {
        stars.push(<IoStarHalfSharp key={i} className='inline text-xs vv:text-base text-[#FFD700]' />);
        i++;
    }

    while (i < 5) {
        stars.push(<span key={i} className='text-xs vv:text-base text-gray-300'>&#9734;</span>);
        i++;
    }

    return stars;
  }

  const handleClick1 = (asin) => {
    navigate(`/product?asin=${encodeURIComponent(asin)}&country=US`);
  }

  const handleClick12 = (searchTerm) => {
    navigate(`/search?query=${searchTerm}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`)
  }

  const handleClick1234 = () => {
    navigate(`/deal`)
  }

  return (
    <div className='min-h-screen w-full z-10'>
      <DealData onData={handleData}/>
      <div className='h-full w-full pt-2'>
        {deals ? (
          <div ref={carouselRef} className='carousel h-96 w-full relative overflow-hidden p-4 z-10'>
          <div ref={listRef} className='list h-full p-8 z-10'>
            <div className='item mix-blend-color-burn z-10' style={{backgroundImage: `url(${img1})`}}>
              <div className='content z-10'>
                <h1 className='title text-base xl:text-xl font-semibold'>{deals[0].deal_title}</h1>
                <button className='bg-blue-500 py-1 px-4 z-10 rounded-lg text-white hover:bg-blue-600' onClick={() => handleClick(deals[0].product_asin)}>See more</button>
              </div>
            </div>
            <div className='item z-10' style={{backgroundImage: `url(${img2})`}}>
              <div className='content z-10'>
                <h1 className='title text-xl font-semibold'>{deals[1].deal_title}</h1>
                <button className='bg-blue-500 py-1 px-4 rounded-lg text-white hover:bg-blue-600 z-10' onClick={() => handleClick(deals[1].product_asin)}>See more</button>
              </div>
            </div>
            <div className='item z-10' style={{backgroundImage: `url(${img3})`}}>
              <div className='content z-10'>
                <h1 className='title text-xl font-semibold'>{deals[2].deal_title}</h1>
                <button className='bg-blue-500 py-1 px-4 rounded-lg text-white hover:bg-blue-600 z-10' onClick={() => handleClick(deals[2].product_asin)}>See more</button>
              </div>
            </div>
            <div className='item z-10' style={{backgroundImage: `url(${img4})`}}>
              <div className='content z-10'>
                <h1 className='title text-xl font-semibold'>{deals[3].deal_title}</h1>
                <button className='bg-blue-500 py-1 px-4 rounded-lg text-white hover:bg-blue-600 z-10' onClick={() => handleClick(deals[3].product_asin)}>See more</button>
              </div>
            </div>
            <div className='item z-10' style={{backgroundImage: `url(${img5})`}}>
              <div className='content z-10'>
                <h1 className='title text-xl font-semibold'>{deals[4].deal_title}</h1>
                <button className='bg-blue-500 py-1 px-4 rounded-lg text-white hover:bg-blue-600 z-10' onClick={() => handleClick(deals[4].product_asin)}>See more</button>
              </div>
            </div>
            <div className='item z-10' style={{backgroundImage: `url(${img6})`}}>
              <div className='content z-10'>
                <h1 className='title text-xl font-semibold'>{deals[5].deal_title}</h1>
                <button className='bg-blue-500 py-1 px-4 rounded-lg text-white hover:bg-blue-600 z-10' onClick={() => handleClick(deals[5].product_asin)}>See more</button>
              </div>
            </div>
            <div className='item z-10' style={{backgroundImage: `url(${img7})`}}>
              <div className='content z-10'>
                <h1 className='title text-xl font-semibold'>{deals[6].deal_title}</h1>
                <button className='bg-blue-500 py-1 px-4 rounded-lg text-white hover:bg-blue-600 z-10' onClick={() => handleClick(deals[6].product_asin)}>See more</button>
              </div>
            </div>
          </div>

          <div className='arrow absolute top-[80%] left-[20%] flex gap-2 max-w-[30%] items-center justify-center'>
            <button onClick={() => handleButtonClick('prev')} className='prev z-20'>{'<'}</button>
            <button onClick={() => handleButtonClick('next')} className='next z-20'>{'>'}</button>
          </div>

          {/* <div className='timeline'></div> */}
        </div>
        ) : (<Loading />)}
        <div className='mt-5 p-1 jb:mt-8 vs:p-2 jb:p-0'>
          <h1 className='text-lg vv:text-2xl font-semibold px-2 jb:px-5 vv:px-8'>Best Sellers in electronics</h1>
          <div className='flex items-center justify-start w-full space-x-2 vv:space-x-4 overflow-x-scroll scrollbar-thin px-2 jb:px-5 vv:px-8'>
            {/* {console.log(data)} */}
            {
              data?.data?.products?.map((option) => (
                <div className='w-24 jb:w-28 vv:w-32 vs:w-40 vm:w-60 h-auto flex-shrink-0 cursor-pointer group' onClick={() => handleClick1(option?.asin)}>
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
                <button className='text-blue-500 hover:underline' onClick={() => handleClick12('best sellers in electronics')}>Show more</button>
            </p>
          </div>
        </div>
        <div className='mt-5 p-1 jb:mt-8 jb:p-0 vs:p-2'>
          <h1 className='text-lg vv:text-2xl font-semibold px-2 jb:px-5 vv:px-8'>Best Deals</h1>
          <div className='flex items-center justify-start w-full space-x-2 vv:space-x-4 overflow-x-scroll scrollbar-thin px-2 jb:px-5 vv:px-8'>
            {/* {console.log(dealData)} */}
            {
              dealData?.data?.deals?.map((option) => (
                <div className='w-24 jb:w-28 vv:w-32 vs:w-40 vm:w-60 h-auto flex-shrink-0 cursor-pointer group' onClick={() => handleClick1(option?.product_asin)}>
                  <div className='flex justify-center items-center mx-auto'>
                    <img src={option?.deal_photo} alt={option?.product_asin} className='object-contain w-40 h-48  vs:w-48 vs:h-64 p-1 group-hover:scale-110 duration-200' />
                  </div>
                  <div className='p-1'>
                    <p className='w-full text-xs vv:text-sm text-ellipsis overflow-hidden line-clamp-3 vs:line-clamp-4'>
                      {option?.deal_title}
                    </p>
                    <p className='mt-2 flex items-center'>
                      <span className='text-xs text-[#168342]'>&nbsp;{option?.deal_badge ? (option?.deal_badge) : `${option?.savings_percentage}% off`}</span>
                    </p>
                    <div className='text-sm vv:text-base space-x-2 my-1'>
                      <span>{option?.deal_price?.amount}</span>
                      {option?.list_price?.amount ? 
                        (
                          <>
                            <span className='text-xs text-slate-500'>List Price:</span>
                            <span className='line-through text-xs text-slate-400'>{option?.list_price?.amount}</span>
                          </>
                        )
                        : null
                      }
                    </div>
                    {
                      option?.deal_ends_at ?  
                      (
                          <div className='flex space-x-2 items-center'>
                          <p className='text-[0.58rem] vv:text-xs sm:text-sm'>Deal Ends at: {<DateTime isoDate={option?.deal_ends_at}/>}</p>
                          </div>
                      ) : null
                    }
                  </div>
                </div>
              ))
            }
            <p>
                <button className='text-blue-500 hover:underline' onClick={handleClick1234}>Show more</button>
            </p>
          </div>
        </div>
        <div className='mt-5 p-1 jb:mt-8 jb:p-0 vs:p-2'>
          <h1 className='text-lg vv:text-2xl font-semibold px-2 jb:px-5 vv:px-8'>Best Sellers in Clothing, Shoes and jewelery</h1>
          <div className='flex items-center justify-start w-full space-x-2 vv:space-x-4 overflow-x-scroll scrollbar-thin px-2 jb:px-5 vv:px-8'>
            {/* {console.log(data)} */}
            {
              searchData?.data?.products?.map((option) => (
                <div className='w-24 jb:w-28 vv:w-32 vs:w-40 vm:w-60 h-auto flex-shrink-0 cursor-pointer group' onClick={() => handleClick1(option?.asin)}>
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
                <button className='text-blue-500 hover:underline' onClick={() => handleClick12('Best Sellers in Clothing, Shoes and jewelery')}>Show more</button>
            </p>
          </div>
        </div>
        <div className='mt-5 p-1 jb:mt-8 jb:p-0 vs:p-2'>
          <h1 className='text-lg vv:text-2xl font-semibold px-2 jb:px-5 vv:px-8'>Best Sellers in Sports & Outdoors</h1>
          <div className='flex items-center justify-start w-full space-x-2 vv:space-x-4 overflow-x-scroll scrollbar-thin px-2 jb:px-5 vv:px-8'>
            {/* {console.log(data)} */}
            {
              searchData2?.data?.products?.map((option) => (
                <div className='w-24 jb:w-28 vv:w-32 vs:w-40 vm:w-60 h-auto flex-shrink-0 cursor-pointer group' onClick={() => handleClick1(option?.asin)}>
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
                <button className='text-blue-500 hover:underline' onClick={() => handleClick12('Best Sellers in sports and outdoors')}>Show more</button>
            </p>
          </div>
        </div>
        <div className="page7">
        <div className="move">
            <div className="animat">
                <h1>SHOP NOVA BEST SELLERS</h1>
                <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" className='arrow1'/>
            </div>
            <div className="animat">
                <h1>SHOP NOVA BEST SELLERS</h1>
                <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" className='arrow1'/>
            </div>
            <div className="animat">
                <h1>SHOP NOVA BEST SELLERS</h1>
                <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" className='arrow1'/>
            </div>
            <div className="animat">
                <h1>SHOP NOVA BEST SELLERS</h1>
                <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" className='arrow1'/>
            </div>
            <div className="animat">
                <h1>SHOP NOVA BEST SELLERS</h1>
                <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" className='arrow1'/>
            </div>
            <div className="animat">
                <h1>SHOP NOVA BEST SELLERS</h1>
                <img src="https://www.brandium.nl/wp-content/uploads/2023/07/arrow-br.svg" alt="arrow" className='arrow1'/>
            </div>
        </div>
        </div>
        <div className='mt-5 p-1 jb:mt-8 jb:p-0 vs:p-2'>
          <h1 className='text-lg vv:text-2xl font-semibold px-2 jb:px-5 vv:px-8'>Best Sellers in Beauty and Personal Care</h1>
          <div className='flex items-center justify-start w-full space-x-2 vv:space-x-4 overflow-x-scroll scrollbar-thin px-2 jb:px-5 vv:px-8'>
            {/* {console.log(data)} */}
            {
              searchData4?.data?.products?.map((option) => (
                <div className='w-24 jb:w-28 vv:w-32 vs:w-40 vm:w-60 h-auto flex-shrink-0 cursor-pointer group' onClick={() => handleClick1(option?.asin)}>
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
                <button className='text-blue-500 hover:underline' onClick={() => handleClick12('Best Sellers in Beauty and Personal Care')}>Show more</button>
            </p>
          </div>
        </div>
        <div className='mt-5 p-1 jb:mt-8 jb:p-0 vs:p-2'>
          <h1 className='text-lg vv:text-2xl font-semibold px-2 jb:px-5 vv:px-8'>Best Sellers in Home & Kitchen</h1>
          <div className='flex items-center justify-start w-full space-x-2 vv:space-x-4 overflow-x-scroll scrollbar-thin px-2 jb:px-5 vv:px-8'>
            {/* {console.log(data)} */}
            {
              searchData5?.data?.products?.map((option) => (
                <div className='w-24 jb:w-28 vv:w-32 vs:w-40 vm:w-60 h-auto flex-shrink-0 cursor-pointer group' onClick={() => handleClick1(option?.asin)}>
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
                <button className='text-blue-500 hover:underline' onClick={() => handleClick12('Best Sellers in Home & Kitchen')}>Show more</button>
            </p>
          </div>
        </div>
      </div>
      {<DealData onData={handleData} />}
    </div>
  );
};

export default Home;
