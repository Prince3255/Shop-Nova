import React from 'react'
import { useAuth } from '../Component/AuthContext'
import { useNavigate, NavLink } from 'react-router-dom'

const Cart = () => {

  const { cartItems,removeFromCart, updateQuantity } = useAuth()
  const navigate = useNavigate()

  let sum = 0
  let formatedPrice = 0

  const handlePrice = (option) => {
    const price = option.price.replace(/[^0-9.]/g, '')
    sum = sum + parseFloat(price * option.quantity)
    formatedPrice = sum.toFixed(2)
    return parseFloat(price * option.quantity)
    // console.log(price.substring(1, price.length))
  }

  const handleClick = (asin) => {

    if (asin) {
        navigate(`/product?asin=${encodeURIComponent(asin)}&country=US`);
    } else {
        console.error('ASIN not available');
    }
  }

  return (
    <div className='min-h-screen w-full py-8 bg-slate-200 p-1'>
      <div className='h-full w-full'>
        {/* {console.log(cartItems)}         */}
          {cartItems.length === 0 ? (
            <p className='text-center text-lg font-semibold mt-8'>Your cart is empty</p>
          ) : (
            <div className='h-full w-full flex flex-col vt:flex-row justify-center space-x-0 vt:space-x-5 px-4 vt:p-0 space-y-8 vt:space-y-0'>
            <div className='w-full vt:w-[70%] ml:w-[60%] flex justify-center flex-col space-y-4'>
            {
              cartItems?.map((option) => (
                  <div key={option.asin} className="left w-full flex justify-between bg-white p-4 rounded-lg">
                  <div className='left1 w-[25%] vp:w-[30%]'>
                    <img src={option?.image} alt={option.asin} className='object-contain w-[full] h-40 rounded-lg cursor-pointer' onClick={() => handleClick(option.asin)}/>
                  </div>
                  <div className='left2 w-[72%] vp:w-[68%] flex flex-col space-y-2 relative'>
                    <h1 className='text-xs vp:text-sm mg:text-base font-semibold hover:text-blue-500 line-clamp-3 vp:line-clamp-none' onClick={() => handleClick(option.asin)}>{option?.title}</h1>
                    <p className='text-xs vp:text-sm mg:text-[1.1rem] line-clamp-2 jb:line-clamp-none'>{option?.price} , <span className='text-xs mg:text-sm'>{option?.date}</span></p>
                    <div className='flex space-x-1 jb:space-x-2 absolute bottom-1'>
                      <button className='flex justify-center items-center size-4 jb:size-5 rounded-full border-2 border-slate-500 text-sm jb:text-lg' onClick={() => updateQuantity(option.asin, -1)} disabled={option.quantity <= 1}>-</button>
                      <button className='border-slate-500 flex justify-center items-center border-2 w-5 jb:w-8 h-4 jb:h-5 text-[0.65rem] jb:text-xs'>{option.quantity}</button>
                      <button className='flex justify-center items-center size-4 jb:size-5 rounded-full border-2 border-slate-500 text-sm jb:text-lg' onClick={() => updateQuantity(option.asin, 1)}>+</button>
                    </div>
                      <button className='absolute right-0 jb:right-4 bottom-1 text-xs jb:text-sm ml:text-base' onClick={() => removeFromCart(option.asin)}>Remove</button>
                  </div>
                </div>
              ))
            }
            </div>
            <div className="right w-full vt:w-[25%] ml:w-[20%] bg-white rounded-lg p-4 h-fit">
              <h1 className='text-base mg:text-lg text-slate-500'>PRICE DETAILS</h1>
              <hr />
              <div className='mt-4'>
                {
                  cartItems.map((option) => 
                    <div className='mt-2 text-sm mg:text-base flex justify-between'>
                      <p>Price ({option.quantity} item)</p>
                      <p>{option.price.charAt(0)}{handlePrice(option).toFixed(2)}</p>
                    </div>
                  )
                }
              </div>
              <div className='mt-20'>
                <hr className='mb-1'/>
                <div className='flex justify-between text-sm mg:text-base'>
                  <p>Total Amount</p>
                  <p>{cartItems[0].price[0]}{formatedPrice}</p>
                </div>
                <hr className='mt-1 mb-4'/>
                <div className='flex vt:block justify-center items-center w-full'>
                {/* <NavLink to={"/buyNow"}> */}
                  <button className='bg-[#FA8900] px-8 vt:px-0 vt:w-full py-1 rounded-full text-xs bj:text-sm lm:text-base text-center text-white'>Buy Now</button>
                {/* </NavLink> */}
                </div>
              </div>
            </div>
          </div>
          )}
      </div>
    </div>
  )
}

export default Cart