import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Registration from './Authentication/Registration/Registration'
import Login from './Authentication/Login/Login'
import Home from './Pages/Home'
import ShowAll from './ShoeComponents/ShowAll'
import CartPage from './Pages/CartPage'
import WishList from './Pages/WishList'
import SearchPage from './NavSections/SearchPage/SearchPage'
import CheckOutPage from './Authentication/CheckOut/CheckOutPage'
import OrderPage from './Pages/OrderPage'
import ProductDetail from './Pages/ProductDetail'
import OrderDetailPage from './Pages/OrederDetailPage'
import AdminPage from './DashBoard/AdminPage'
import AdminRouter from './Routers/AdminRouter'


function App() {
  return (
    <div>
      
      <Routes>
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        <Route path='/allshoe/:type' element={<ShowAll/>}/>
        <Route path='/cart' element={<CartPage/>}/>
        <Route path='/wishlist' element={<WishList/>}/>
        <Route path='/searchPage' element={<SearchPage/>}/>
        <Route path='/checkOut' element={<CheckOutPage/>}/>
        <Route path='/orderPage' element={<OrderPage/>}/>
        <Route path='/product/:productId' element={<ProductDetail/>}/>
        <Route path='/orders' element={<OrderDetailPage/>}/>

        <Route element={<AdminRouter />}>
          <Route path='/admin' element={<AdminPage />} />
        </Route>


      </Routes>

      
      
     
    </div>
  )
}

export default App