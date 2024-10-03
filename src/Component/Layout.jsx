import React from 'react'
import Header from './Header'
import { Outlet, Navigate, useLocation } from 'react-router-dom'
import Footer from './Footer'
import { useAuth } from './AuthContext'

function Layout() {
    const location = useLocation()
    const hideHeaderFooter = location.pathname === '/login' || location.pathname === '/signup'
    const { user } = useAuth()
  return (
    <>
        {!hideHeaderFooter && <Header />}
        <main className={`${!hideHeaderFooter ? 'pt-16 pb-16' : ''}`}>
            {user ? <Outlet /> : <Navigate to='/login' />}
        </main>

        {!hideHeaderFooter && <Footer />}
    </>
  )
}

export default Layout