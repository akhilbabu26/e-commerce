import { useContext, useState, useEffect } from "react";
import { CartContext } from "../Context/CartContext";
import { useNavigate } from "react-router-dom";

export default function ProductCard({ product }) {

  const navigate = useNavigate()

  const { cart, setCart } = useContext(CartContext);// cart
  const [added, setAdded] = useState(false) //cart

  const [isWishListed, setIsWishListed] = useState(false) // wishlist


// add to cart
  useEffect(() => {
    if (cart.some(item => item.product_id === product.product_id)) {
      setAdded(true); //some => checks if at least one item in the array matches a condition
    }
  }, [cart, product.product_id]);
  
  const addToCart = ()=> {
    if(added){
      navigate("/cart")
      return
    }
    if(!cart.some(item=> item.product_id === product.product_id)){
      setCart(arr => [...arr, product])
      setAdded(true)

    }
  }


// add to wishlist


  return (
    <div className="group relative bg-white rounded-lg shadow-sm p-3 hover:shadow-md transition">

      <img
        alt={product.imageAlt}
        src={product.image_url}
        className="w-full h-64 object-cover rounded-md bg-gray-200 group-hover:opacity-80 transition"
      />

      <div className="mt-4 flex justify-between">
        <div>
          <h3 className="text-sm font-semibold text-gray-800">
            {product.name}
          </h3>

          <div className="text-center justify-center">
            <p className="mt-1 text-sm text-gray-500 text-center">{product.color}</p>

            <span className="text-sm font-bold text-gray-900 line-through mr-2">
              ₹{product.original_price}
            </span>

            <span className="text-sm font-bold text-emerald-400 mr-2 ">
              {product.discount_percentage}% OFF
            </span>

            <span className="text-sm font-bold text-gray-900 mr-2">
              ₹{Math.round(
                product.original_price -
                (product.original_price * product.discount_percentage) / 100
              )}
            </span>

              {/* add to cart btn*/}
            <button
              onClick={addToCart}
              className="bg-black text-white px-3 py-1 rounded mt-2 "
            >
              {added ? "🏃🏼‍♂️‍➡️ Go to cart" : "Add to cart 🛒"}
            </button>

              
              {/*wishlist btn  */}
              <button
                onClick={() => setIsWishListed(!isWishListed)}
                className="p-2 rounded-full transition-colors duration-200 focus:outline-none"
               >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`h-6 w-6 transition-colors duration-200 ${
                    isWishListed ? "text-red-500" : "text-gray-400"
                  }`}
                  fill={isWishListed ? "currentColor" : "none"}
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                  />
                </svg>
              </button>
          </div>
        </div>
      </div>
    </div>
  );
}

