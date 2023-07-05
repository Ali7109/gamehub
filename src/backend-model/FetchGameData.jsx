import React from 'react'

const FetchGameData = () => {
  return (
    <div>FetchGameData</div>
  )
}

export default FetchGameData


// import { useEffect } from 'react';

// const FetchGameData = (url, options, onDataFetched, onError) => {
//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(url, options);
//         if (!response.ok) {
//           throw new Error('Failed to fetch data');
//         }
//         const data = await response.json();
//         onDataFetched(data);
//       } catch (error) {
//         onError(error);
//       }
//     };

//     fetchData();
//   }, [url, options, onDataFetched, onError]);
// };

// export default FetchGameData;
