// import React, { useEffect, useState } from 'react'
// import { api } from '../Api/Api'

// function useFetch(url, reload) {
//   const [data, setData] = useState([]);

//   useEffect(() => {
//     api.get(url)
//       .then((res) => setData(res.data))
//       .catch((err) => alert(err))
//   }, [url, reload])

//   return { data }
// }
// export default useFetch

import { useEffect, useState } from "react";
import { api } from "../Api/Api";

function useFetch(url, reload) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let isMounted = true; // Prevent state update after unmount
    setLoading(true);

    api
      .get(url)
      .then((res) => {
        if (isMounted) {
          setData(res.data);
          setError(null);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setError(err);
        }
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, [url, reload]);

  return { data, loading, error };
}

export default useFetch;