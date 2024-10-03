import React, { useEffect, useRef } from 'react'
import { Link } from 'react-router-dom';
import { useAuth } from '../Component/AuthContext';
import { useNavigate } from 'react-router-dom';

const SignUp = () => {

  const { user, userRegister, error, setError } = useAuth()

  const register = useRef(null)

  const navigate = useNavigate()

  useEffect(() => {
    setError(null)
    if (user) {
      navigate('/')
    }
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()

    const name = register.current.name.value
    const email = register.current.email.value
    const password1 = register.current.password1.value
    const password2 = register.current.password2.value

    if (password1 !== password2) {
      alert("Password's do not match")
      return
    }

    const userInfo = { name, email, password1, password2 }

    userRegister(userInfo)
  }


  return (

    <div className='min-h-screen w-full bg-gray-100 flex justify-center items-center'>
        <div className='w-[95%] jb:w-[90%] vv:w-[85%] vd:w-[80%] vp:w-[60%] vm:w-[50%] lg:w-4/12 shadow-lg h-5/6 bg-white p-4'>
        <h2 className='font-bold text-center text-2xl'>Create Your Account</h2>
        <form className='space-y-8 mt-4' ref={register} onSubmit={handleSubmit}>
            <div className='rounded-md shadow-sm'>
            <div className='mb-4'>
                <label htmlFor="name" className="block text-sm font-medium text-gray-800">Name: </label>
                <input type="text" id="name" name="name" placeholder="Enter name.." required className='block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-200'/>
            </div>
            <div className='mb-4'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email: </label>
                <input type="email" id="email" name="email" placeholder="Enter email.." required className='block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-200'/>
            </div>
            <div className='mb-4'>
              <label htmlFor="password" className='block text-sm font-medium text-gray-800'>Password: </label>
              <input type="password" name="password1" placeholder="Enter Password.." required className='block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-200'/>
            </div>
            <div className='mb-4'>
              <label htmlFor="password" className='block text-sm font-medium text-gray-800'>Confirm Password: </label>
              <input type="password" name="password2" placeholder="Confirm Password.." required className='block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-200'/>
            </div>
            <p>Already have an account: <Link to='/login' className='hover:underline text-blue-500'>Log in</Link></p>
            </div>
            <div className='w-full flex justify-center items-center'>
              <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 focus:outline-none py-2 px-4 rounded-md border-none shadow-sm text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Sign Up
              </button>
            </div>
        </form>
        {/* {error && <div className="text-red-500 mt-2">{error}</div>} */}
        </div>
    </div>
  )
}

export default SignUp