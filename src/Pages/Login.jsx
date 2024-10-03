import React, { useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../Component/AuthContext';

const Login = () => {
  const navigate = useNavigate()
  const { user, userLogin, error, setError } = useAuth()

  useEffect(() => {
    setError(null)
    if (user) {
      navigate('/')
    }
  }, [])

  const login = useRef()


  

  const handleSubmit = (e) => {
    e.preventDefault()
    const email = login.current.email.value
    const password = login.current.password.value
    const userInfo = { email, password }
    userLogin(userInfo)
  }

  return (

    <div className='min-h-screen w-full bg-gray-100 flex justify-center items-center'>
        <div className='w-4/12 shadow-lg h-5/6 bg-white p-4'>
        <h2 className='font-bold text-center text-2xl'>Login to Your Account</h2>
        <form className='space-y-8 mt-4' ref={login} onSubmit={handleSubmit}>
            <div className='rounded-md shadow-sm'>
            <div className='mb-4'>
                <label htmlFor="email" className="block text-sm font-medium text-gray-800">Email: </label>
                <input type="email" id="email" name="email" placeholder="Enter email.." required className='block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-200'/>
            </div>
            <div className='mb-4'>
              <label htmlFor="password" className='block text-sm font-medium text-gray-800'>Password: </label>
              <input type="password" name="password" placeholder="Enter Password.." required className='block appearance-none w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-200'/>
            </div>
            <p>Don't have an account: <Link to='/signup' className='hover:underline text-blue-500'>Register</Link></p>
            </div>
            <div className='w-full flex justify-center items-center'>
              <button type='submit' className='bg-indigo-600 hover:bg-indigo-700 focus:outline-none py-2 px-4 rounded-md border-none shadow-sm text-sm font-medium text-white focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500'>
                Log in
              </button>
            </div>
        </form>
        {/* {error && <div className='text-red-500 mt-1'>{error}</div>} */}
        </div>
    </div>
  )
}

export default Login