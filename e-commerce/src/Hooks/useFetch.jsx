import React, { useEffect, useState } from 'react'
import { api } from '../Api/Api'

function useFetch(url, reload) {
  const [data, setData] = useState([]);

  useEffect(() => {
    api.get(url)
      .then((res) => setData(res.data))
      .catch((err) => alert(err))
  }, [url, reload])

  return { data }
}



export default useFetch