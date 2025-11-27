import React from 'react'
// user side
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

// Admin side
import AdminPage from './DashBoard/AdminPage'
import AdminRouter from './Routers/AdminRouter'
import UserRouter from './Routers/UserRouter'
import DashBoardPage from './DashBoard/DashBoardPage'
import UserInfo from './DashBoard/UserDetsils/UserInfo'
import OrdersInfo from './DashBoard/OrderDetails/OrdersInfo'
import ProductInfo from './DashBoard/ProductDetails/ProductInfo'
import ProductEdit from './DashBoard/ProductDetails/ProductEdit'
import Brands from './DashBoard/ProductDetails/Brands'
import AddProduct from './DashBoard/ProductDetails/AddProduct'


function App() {
  return (
    <div>
      
      <Routes>

        {/* public */}
        <Route path='/register' element={<Registration/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/' element={<Home/>}/>
        

        {/* user */}
        <Route element={<UserRouter/>}>
          <Route path='/allshoe/:type' element={<ShowAll/>}/>
          <Route path='/cart' element={<CartPage/>}/>
          <Route path='/wishlist' element={<WishList/>}/>
          <Route path='/searchPage' element={<SearchPage/>}/>
          <Route path='/checkOut' element={<CheckOutPage/>}/>
          <Route path='/orderPage' element={<OrderPage/>}/>
          <Route path='/product/:productId' element={<ProductDetail/>}/>
          <Route path='/orders' element={<OrderDetailPage/>}/>
        </Route>

        {/* admin */}
        <Route  element={<AdminRouter />}>
          <Route path='/admin' element={<AdminPage/>}> 

            <Route index element={<DashBoardPage />} />
            <Route path="dashboard" element={<DashBoardPage />} />
            <Route path="userinfo" element={<UserInfo />} />
            <Route path="productInfo" element={<ProductInfo />} />
            <Route path="orderInfo" element={<OrdersInfo />} />

            <Route path="brands" element={<Brands />} />
            <Route path='productEdit/:productId' element={<ProductEdit/>}/>
            <Route path='addProduct' element={<AddProduct/>}/>
            
          </Route>
        </Route>


      </Routes>

      
      
     
    </div>
  )
}

export default App