import React from 'react'
import { Link } from 'react-router-dom';
import { FaInstagram, FaLinkedin,  FaGithubSquare } from "react-icons/fa";
import { BsTwitterX } from "react-icons/bs";

function Footer() {
  return (
    <footer className='relative m-0 sm:mt-2 bottom-0 w-full'>
      <div className='absolute bottom-0 bg-slate-200 w-full'>
      <hr />
      <div className='flex flex-col vv:flex-row justify-between items-center p-2 vv:p-4 gap-y-4 vv:gap-y-0'>
        <div className='hover:underline cursor-pointer md:text-base sm:text-xl self-start vv:self-baseline'>
        All Rights Reserved &copy; 2024
        </div>
        <div className='flex flex-row justify-between w-full px-8 vv:px-0 vv:w-4/12 sm:w-5/12 md:w-2/12'>
          <a href='https://www.linkedin.com/in/prince-suthar-876720281/' target="_blank" rel="noopener noreferrer">
            <FaLinkedin className='sm:w-7 sm:h-7 md:w-5 md:h-5'/>
          </a>
          <Link to='#'>
            <BsTwitterX className='sm:w-7 sm:h-7 md:w-5 md:h-5'/>
          </Link>
          <Link to='#'>
            <FaInstagram className='sm:w-7 sm:h-7 md:w-5 md:h-5'/>
          </Link>
          <a href='https://github.com/Prince3255' target="_blank">
            <FaGithubSquare className='sm:w-7 sm:h-7 md:w-5 md:h-5'/>
          </a>
        </div>
      </div>
    </div>
    </footer>
  )
}

export default Footer