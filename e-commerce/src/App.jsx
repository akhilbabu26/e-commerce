import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './Authentication/Registration/Registration'
import Login from './Authentication/Login/Login'
import Home from './Pages/Home'
import ShowAll from './ShoeComponents/ShowAll'
import ProductCard from './ShoeComponents/ProductCard'
import { CartContext } from './Context/CartContext'
import CartPage from './Pages/CartPage'
import WishList from './Pages/WishList'


function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/home' element={<Home/>}/>
        <Route path='/allshoe/:type' element={<ShowAll/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
      </Routes>
      
     
    </div>
  )
}

export default App