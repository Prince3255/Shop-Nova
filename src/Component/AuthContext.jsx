import React, { createContext, useContext, useState, useEffect } from 'react'
import { account } from '../AppWriteConfig'
import { ID } from 'appwrite'
import Loading from './Loading'
import { Provider } from 'react-redux'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {

  const [loading, setLoading] = useState(true)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)
  const [country, setCountry] = useState('US')
  const [min_pro_star_rating, set_min_pro_start_rating] = useState('ALL')
  const [price, setPrice] = useState('ALL')
  const [discount, setDiscount] = useState('ALL')
  const [cartItems, setCartItems] = useState([]);
  const [ quantityProduct, setQuantityProduct ] = useState(0)


  useEffect(() => {
    const storedItem = localStorage.getItem('cartItems')
    // const quantityProduct = localStorage.getItem('quantityProduct')
    if (storedItem) {
      const parsedItems = JSON.parse(storedItem)
      setCartItems(parsedItems)

      const totalQuantity = parsedItems.reduce((sum, option) => sum + option.quantity, 0);
      setQuantityProduct(totalQuantity)
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cartItems', JSON.stringify(cartItems))
    // localStorage.setItem('quantityProduct', JSON.stringify(quantityProduct))
  }, [cartItems])

  const addToCart = (item) => {
    setCartItems((prevItems) => {
      const existingProduct = prevItems.find(option => option.asin === item.asin);
      if (existingProduct) {
        setQuantityProduct(prevQuantity => prevQuantity + 1)
        return prevItems.map(option => option.asin === item.asin ? {...option, quantity: option.quantity + 1} : option)
      }
      setQuantityProduct(prevQuantity => prevQuantity + 1)
      return [...prevItems, {...item, quantity: 1}]
    })
  };

  const removeFromCart = (asin) => {
    setCartItems((prevItems) => {
      const productRemove = prevItems.find(option => option.asin === asin)
      if (productRemove) {
        setQuantityProduct(prevQuantity => prevQuantity - productRemove.quantity)
      }
      return prevItems.filter(item => item.asin !== asin)
    })
  }

  const updateQuantity = (asin, quan) => {
    setCartItems((prevItems) => {
      const updateCart = prevItems.map((option) => {
        if (option.asin === asin) {
          setQuantityProduct(prevQuantity => prevQuantity + quan)
          return { ...option, quantity: option.quantity + quan}
        }
        return option
      })
      return updateCart
    })
  }

  useEffect(() => {
    userStatus()
  }, [])

  const userLogin = async (userInfo) => {
    setLoading(true)
    setError(null)

    try {
      let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password)

      const accountDetails = await account.get()

      setUser(accountDetails)
    } catch (error) {
        setError(error.message)
      console.error(error)
    }
    setLoading(false)
  }

  const userLogout = () => {
    account.deleteSession('current')
    setUser(null)
    setError(null)
  }

  const userRegister = async (userInfo) => {
    setLoading(true)
    setError(null)
    try {
      await account.create(ID.unique(), userInfo.email, userInfo.password1, userInfo.name)

      let response = await account.createEmailPasswordSession(userInfo.email, userInfo.password1)

      const accountDetails = await account.get()

      setUser(accountDetails)
    } catch (error) {
        setError(error.message)
      console.error(error)
    }
    setLoading(false)
  }

  const userStatus = async () => {

    try {
      const accountDetails = await account.get();
      setUser(accountDetails);
      setError(null); // Clear any previous errors
    } catch (error) {
      // If the error is because the user is not logged in, do not set it as an error
      if (error.code !== 401) { // 401 typically indicates "Unauthorized"
        setError(error.message);
      }
      setUser(null);
    }
  
    setLoading(false);
  }

  const contextData = {
    loading,
    user,
    userLogin,
    userLogout,
    userRegister,
    userStatus,
    error,
    setError,
    country, 
    setCountry,
    min_pro_star_rating, set_min_pro_start_rating,
    price, 
    setPrice,
    discount, 
    setDiscount,
    cartItems,
    setCartItems,
    addToCart,
    removeFromCart,
    updateQuantity,
    quantityProduct
  }

  return (
    <AuthContext.Provider value={contextData}>
      {loading ? <Loading /> : children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {
  return useContext(AuthContext)
}

export default AuthContext