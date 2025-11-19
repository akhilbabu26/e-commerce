import React, { useEffect, useState } from 'react'
import { api } from '../Api/Api'

function useFetch(url) {

    const [data, setData] = useState([])

    useEffect(()=>{
        try{
        api.get(url)
        .then((res)=> setData(res.data))
        }catch(err){
            alert(err)
        }
        
    },[url])

  return {data}
}

export default useFetch