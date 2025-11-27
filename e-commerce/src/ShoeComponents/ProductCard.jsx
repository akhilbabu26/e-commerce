import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { AuthContext } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { api } from "../Api/Api";
import toast from "react-hot-toast";

export default function ProductCard({ product }) {
  const navigate = useNavigate()
  const { cart, setCart } = useContext(CartContext)
  const { currentUser } = useContext(AuthContext)
  const [added, setAdded] = useState(false)
  const [isWishListed, setIsWishListed] = useState(false)

  // Check if product is in cart
  useEffect(() => {
    setAdded(cart.some(item => item.product_id === product.product_id))
  }, [cart, product.product_id])

  // Check wishlist status
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"))
    if (user?.wishlist) {
      setIsWishListed(user.wishlist.some(item => item.product_id === product.product_id))
    }
  }, [product.product_id])

  // detail page--
  const goToDetail = () => navigate(`/product/${product.product_id}`)
  
  const addToCart = (e) => {
    e?.stopPropagation() // to Prevent navigation
    
     toast.success("Added to Cart 🛒")
    if (added) {
     
      navigate("/cart")
      return
    }

    if (!currentUser) {
      toast.error("Please login to add items to cart")
      navigate("/login")
      return
    }

    const productWithQuantity = { ...product, quantity: 1 }
    setCart(prev => [...prev, productWithQuantity])
    setAdded(true)
  }

  const toggleWishlist = async (e) => {
    e?.stopPropagation() // to Prevent navigation
    
    if (!currentUser) {
      toast.error("Please login to manage wishlist")
      navigate("/login")
      return
    }

    try {

      const user = JSON.parse(localStorage.getItem("user"))
      const oldWishlist = user.wishlist || []
      const exists = oldWishlist.some(item => item.product_id === product.product_id)

      const newWishlist = exists
        ? oldWishlist.filter(item => item.product_id !== product.product_id)
        : [...oldWishlist, product]

      const updated = await api.patch(`/users/${user.id}`, { wishlist: newWishlist })

      if(!exists)toast.success(`Added to Wishlist 💖`)
      if(exists)toast.error(`Removed to Wishlist 💖`)
      

      localStorage.setItem("user", JSON.stringify(updated.data))
      setIsWishListed(!exists)
      
    } catch (err) {
      console.error(err)
    }
  }

  const salePrice = Math.round(
    product.original_price - (product.original_price * product.discount_percentage) / 100
  )

  return (
    <div className="group bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition cursor-pointer"
     onClick={goToDetail}>
      
      <div className="relative">
        <img src={product.image_url} alt={product.name} className="w-full h-64 object-cover rounded-md bg-gray-200" />
        
        <button onClick={toggleWishlist} className="absolute top-2 right-2 p-2 bg-white rounded-full shadow-md">
          <svg className={`h-5 w-5 ${isWishListed ? "text-red-500 fill-current" : "text-gray-400"}`} viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
          </svg>
        </button>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-gray-800 hover:text-indigo-600">{product.name}</h3>
        <p className="mt-1 text-sm text-gray-500">{product.color}</p>

        <div className="flex items-center justify-center gap-2 mt-2 flex-wrap">
          <span className="text-sm line-through">₹{product.original_price}</span>
          <span className="text-sm text-emerald-400 font-bold">{product.discount_percentage}% OFF</span>
          <span className="text-sm font-bold">₹{salePrice}</span>
        </div>

        <button onClick={addToCart} className="bg-black text-white px-3 py-2 rounded mt-2 w-full hover:bg-gray-800">
          {added ? "🏃‍♂️ Go to cart" : "Add to cart 🛒"}
        </button>
      </div>
    </div>
  )
}