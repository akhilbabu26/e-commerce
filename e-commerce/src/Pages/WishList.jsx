import React, { useContext, useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import { api } from "../Api/Api";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";

function WishList() {
  const [reload, setReload] = useState(false)
  const { currentUser, setCurrentUser } = useContext(AuthContext)
  const { data } = useFetch("/users", reload)
  const navigate = useNavigate()

  const currentUserdata = data.find((val) => val.email === currentUser?.email)

  const removeFromWishlist = async (product_id) => {
    try {
      if (!currentUserdata) {
        alert("User data not found")
        return;
      }

      const updatedWishlist = currentUserdata.wishlist.filter(
        item => item.product_id !== product_id
      );

      // Update 
      await api.patch(`/users/${currentUserdata.id}`, {
        wishlist: updatedWishlist,
      });

      // Update local storage and context
      const updatedUser = { ...currentUser, wishlist: updatedWishlist }
      localStorage.setItem("user", JSON.stringify(updatedUser))
      setCurrentUser(updatedUser)

      setReload((prev) => !prev)
      
    } catch (err) {
      console.log(err);
      alert("Error removing item from wishlist")
    }
  };

  const moveToCart = async (product) => {

    try {
      if (!currentUserdata) {
        alert("User data not found");
        return;
      }

      // Remove from wishlist
      const updatedWishlist = currentUserdata.wishlist.filter(
        item => item.product_id !== product.product_id
      );

      // checking if in cart
      const currentCart = currentUserdata.cart || []
      const isInCart = currentCart.some(item => item.product_id === product.product_id)
      
      let updatedCart = [...currentCart]
      if (!isInCart) {
        updatedCart = [...currentCart, { ...product, quantity: 1 }]
      }

      // Update user in database
      await api.patch(`/users/${currentUserdata.id}`, {
        wishlist: updatedWishlist,
        cart: updatedCart
      });

      // Update local storage and context
      const updatedUser = { 
        ...currentUser, 
        wishlist: updatedWishlist, 
        cart: updatedCart 
      };
      localStorage.setItem("user", JSON.stringify(updatedUser));
      setCurrentUser(updatedUser);

      setReload((prev) => !prev);
      
      if (isInCart) {
        alert("Product is already in your cart");
      } else {
        alert("Product moved to cart!");
      }
      
    } catch (err) {
      console.log(err);
      alert("Error moving product to cart");
    }
  };

  // Calculate sale price
  const calculateSalePrice = (product) => {
    return Math.round(
      product.original_price -
      (product.original_price * product.discount_percentage) / 100
    );
  };

  if (!currentUser) {
    return (
      <div className="max-w-7xl mx-auto p-4 text-center py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Please Login</h2>
        <p className="text-gray-600 mb-6">You need to be logged in to view your wishlist.</p>
        <button
          onClick={() => navigate("/login")}
          className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
        >
          Login
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-900">My Wishlist</h1>
        <button
          onClick={() => navigate("/")}
          className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
        >
          Continue Shopping
        </button>
      </div>

      {currentUserdata?.wishlist?.length === 0 ? (
        <div className="text-center py-12">
          <div className="text-gray-400 mb-4">
            <svg className="w-24 h-24 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
            </svg>
          </div>
          <h3 className="text-xl font-semibold text-gray-900 mb-2">Your wishlist is empty</h3>
          <p className="text-gray-600 mb-6">Save items you love for later!</p>
          <button
            onClick={() => navigate("/")}
            className="bg-indigo-600 text-white px-6 py-2 rounded-lg hover:bg-indigo-700 transition"
          >
            Start Shopping
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {currentUserdata?.wishlist?.map((product) => (
            <div
              key={product.product_id}
              className="group relative bg-white rounded-lg shadow-sm p-4 hover:shadow-md transition border"
            >
              <div className="relative">
                <img
                  alt={product.name}
                  src={product.image_url}
                  className="w-full h-64 object-cover rounded-md bg-gray-200 group-hover:opacity-90 transition"
                />
                <button
                  onClick={() => removeFromWishlist(product.product_id)}
                  className="absolute top-2 right-2 bg-white rounded-full p-2 shadow-md hover:bg-red-50 hover:text-red-600 transition"
                  title="Remove from wishlist"
                >
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="mt-4">
                <h3 className="text-sm font-semibold text-gray-800 line-clamp-2">{product.name}</h3>
                <p className="mt-1 text-sm text-gray-500">{product.color}</p>

                <div className="flex items-center space-x-2 mt-2 flex-wrap">
                  <span className="text-sm font-bold text-gray-900 line-through">
                    ₹{product.original_price}
                  </span>
                  <span className="text-sm font-bold text-emerald-400">
                    {product.discount_percentage}% OFF
                  </span>
                </div>
                
                <div className="flex items-center justify-between mt-3">
                  <span className="text-lg font-bold text-gray-900">
                    ₹{calculateSalePrice(product)}
                  </span>
                  
                  <button
                    onClick={() => moveToCart(product)}
                    className="bg-black text-white px-4 py-2 rounded text-sm hover:bg-gray-800 transition"
                  >
                    Add to Cart
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Back to top button */}
      {currentUserdata?.wishlist?.length > 4 && (
        <div className="text-center mt-8">
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            className="bg-gray-200 text-gray-700 px-4 py-2 rounded-lg hover:bg-gray-300 transition"
          >
            Back to Top
          </button>
        </div>
      )}
    </div>
  );
}

export default WishList;