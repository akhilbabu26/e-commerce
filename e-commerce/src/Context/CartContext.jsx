import React, { createContext, useContext, useEffect, useState } from 'react'
import { AuthContext } from './AuthContext';
import { api } from '../Api/Api';


export const CartContext = createContext()

function CartProvider({ children }){
 
  const [cart, setCart] = useState([])
  
  const {currentUser, allUsers} = useContext(AuthContext)

  useEffect(() => {
    if (currentUser?.cart) { // it is null safety it uses when their currentuser and its cart in something
      setCart(currentUser.cart);
    }
  }, [currentUser]);
   
  useEffect(()=>{
    const updateCart = async()=>{
        try{
            const isExist = allUsers.find(data=> data.email === currentUser.email)  
            if(isExist){
                await api.patch(`/users/${currentUser.id}`,{cart:cart})
            }
        }
        catch(err){alert(err)}
       
    }
    updateCart()

  },[cart, currentUser])

    return (
        <CartContext.Provider value={{ cart, setCart}}>
            {children}
        </CartContext.Provider>
    )
}

export default CartProvider
