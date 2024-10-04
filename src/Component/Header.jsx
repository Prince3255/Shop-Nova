import React, { useEffect, useState } from 'react'
import { useAuth } from './AuthContext'
import logo from '../assets/logo.png'
import { Link, NavLink } from 'react-router-dom'
import SearchBar from './SerachBar'
import { IoCartOutline } from "react-icons/io5";
import { IoMenu } from "react-icons/io5";
import { IoIosClose } from "react-icons/io";

const Header = () => {
  const { user, userLogout } = useAuth();
  const [ menu, setMenu ] = useState(false);

  useEffect(() => {
    setMenu(false)
  }, [])

  const { quantityProduct } = useAuth()

  const toggleMenu = () => {
    setMenu(!menu)
  }

  return (
    <header className='flex justify-between items-center bg-slate-800 text-white rounded-lg z-50 top-0 fixed w-full px-4 shadow-md py-1'>
      <div className='flex items-center'>
        <Link to="/">
          <img src={logo} alt="SHOP NOVA" className='w-[3.2rem] vv:w-[3.8rem] md:w-[4.8rem] object-contain rounded mix-blend-difference' />
        </Link>
      </div>
      <div className='flex-1 mx-4'>
        <SearchBar />
      </div>
      <div className='flex items-center space-x-5'>
        {user ? (
          <>
            <div className='hidden md:block'>
              <span className='text-sm font-medium'>Hello, {user.name}</span>
            </div>
          </>
        ) : (
          <Link to="/login" className='text-sm bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md'>Login</Link>
        )}
        <Link to="/cart" className='relative'>
          <IoCartOutline className='size-4 vv:size-7' />
          {/* Badge for cart items */}
          <span className='absolute -top-1 vv:-top-2 -right-1 vv:-right-2 bg-red-600 text-white text-[0.55rem] vv:text-xs rounded-full size-3 vv:size-5 flex items-center justify-center'>
            {quantityProduct > 0 ? quantityProduct : 0}
          </span>
        </Link>
        <div className='text-center'>   
          <button onClick={toggleMenu}>
            <IoMenu className='size-4 vv:size-7 mx-auto'/>
          </button>
          <div className={`absolute py-12 top-0 ${menu ? 'right-0' : '-right-[150%] vv:-right-full'} transition-all duration-500 w-full vv:w-96 bg-slate-500`}>
              <button onClick={toggleMenu} className='absolute top-2 right-2 flex justify-center items-center bg-red-500 hover:bg-red-600 rounded-full size-5 vv:size-8'>
                <IoIosClose className='size-5 vv:size-8'/>
              </button>
              <nav className='min-h-screen'>
                <ul className='space-y-8'>
                {user ? (
                    <span className='text-sm font-medium block text-center md:hidden'>Hello, {user.name}</span>
                ) : (
                  <Link to="/login" className='text-sm block text-center md:hidden bg-blue-500 hover:bg-blue-600 px-2 py-1 rounded-md'>Login</Link>
                )}
                  <li>
                    <NavLink to="/" className={({isActive}) => (isActive ? 'bg-emerald-500 px-3 py-1.5 rounded-xl' : 'hover:underline underline-offset-[3px]')}>
                      Home
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/about" className={({isActive}) => (isActive ? 'bg-emerald-500 px-3 py-1.5 rounded-xl' : 'hover:underline underline-offset-[3px]')}>
                      About us
                    </NavLink>
                  </li>
                  <li>
                    <NavLink to="/contact" className={({isActive}) => (isActive ? 'bg-emerald-500 px-3 py-1.5 rounded-xl' : 'hover:underline underline-offset-[3px]')}>
                      Contact us  
                    </NavLink>
                  </li>
                  <hr />
                  <li><button onClick={userLogout} className='text-sm bg-red-500 hover:bg-red-600 px-2 py-1 rounded-md'>Logout</button></li>
                </ul>
              </nav>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;