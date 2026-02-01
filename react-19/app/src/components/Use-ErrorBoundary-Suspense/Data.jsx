import { use, useEffect, useState } from "react";

// const Data = ({ url }) => {
//   const [isLoading, setIsLoading] = useState(true);
//   const [isError, setIsError] = useState(false);
//   const [data, setData] = useState();

//   useEffect(() => {
//     setIsError(false);
//     setIsLoading(true);
//     setData(undefined);

//     fetch(url)
//       .then((res) => res.json())
//       .then(setData)
//       .catch(() => setIsError(true))
//       .finally(() => setIsLoading(false));
//   }, [url]);

//   return isLoading ? (
//     <h1>Loading ...</h1>
//   ) : isError ? (
//     <h1>Error</h1>
//   ) : (
//     <pre>{JSON.stringify(data, null, 2)}</pre>
//   );
// }


// this logic is better replaced with the tanstack if the request needs to happen on the frontend only?
const promiseCache = {}
function useQuery({fn,key}){
  if(!promiseCache[key]){
    promiseCache[key] = fn()
  }
  const promise = promiseCache[key]
  const result = use(promise)
  console.log(result)
  return result
}

const Data = ({ url }) => {
  // const data = use(fetch(url).then(res => res.json()))
  const data = useQuery({ fn: () => fetch(url).then(res => res.json()), key: "url_fetch" });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default Data;
