import React, { useRef, useState, useEffect } from "react"
import gsap from 'gsap'
import SplashScreen from "./Component/SplashScreen"
import Layout from "./Component/Layout"
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements } from "react-router-dom";
import { Home, Login, SignUp, Cart, About, Contact, Deal, Product, BuyNow, Search } from "./Pages/index";
import { AuthProvider } from "./Component/AuthContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
    <Route path='/login' element={<Login />} />
    <Route path='/signup' element={<SignUp />} />
    <Route path='/' element={<Layout />}>
      <Route path='' element={<Home />} />
      <Route path='cart' element={<Cart />} />
      <Route path='contact' element={<Contact />} />
      <Route path='about' element={<About />} />
      <Route path='deal' element={<Deal />} />
      <Route path='product' element={<Product />}/>
      <Route path='buyNow' element={<BuyNow />}/>
      <Route path='search' element={<Search />}/>
    </Route>
    </>
  )
)

const App = () => {

  const [isSplashAvailable, setSplashAvailable] = useState(true)

  useEffect(() => {
    const splashScreenShown = localStorage.getItem('splashScreenShown');

    if (!splashScreenShown) {
      setSplashAvailable(true);
      localStorage.setItem('splashScreenShown', 'true');
    }
  }, []);

  const handleAnimationEnd = () => {
    setSplashAvailable(false)
  }

  return (
    <div className="App">
      {isSplashAvailable ? (<SplashScreen onanimationend={handleAnimationEnd} />) :
      (
        <>
          <AuthProvider>
            <RouterProvider router={router} />
          </AuthProvider>
        </>
      )
      }
    </div>
  )
}

export default App
