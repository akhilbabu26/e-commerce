import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import ProductCard from './ProductCard'

function ShowAll() {

  const { type } = useParams()
  const { data } = useFetch("/products")

  const navigate = useNavigate()

  

  const datas = data.filter(
    (value) => value.type === type
  )

console.log("Raw data:", data)

  return (
    <div className='max-w-7xl mx-auto p-4 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
      
{/* imgs */}
      {type === "Casual Retro Runner" && <img src='https://mir-s3-cdn-cf.behance.net/project_modules/1400/13e36e124462013.61044211481a0.jpg'/>}
      {type === "Lifestyle Basketball Sneaker" && <img src=""/>}
      {type === "Performance & Motorsport" && <img src=""/>}
      {type === "Heritage Court & Fitness" && <img src=""/>}
      {type === "Premium Heritage Runner" && <img src=""/>}

      <button onClick={()=> navigate("/home")}>BACK</button>
      {datas.length > 0 ? (
        datas.map(product => (
          <ProductCard key={product.id} product={product} />
        ))
      ) : (
        <p>No products found</p>
      )}

    </div>
  )
}

export default ShowAll

