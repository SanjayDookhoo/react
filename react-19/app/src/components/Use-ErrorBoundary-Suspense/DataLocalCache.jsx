import { use, useEffect, useState } from "react";

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

const DataLocalCache = ({ url }) => {
  // const data = use(fetch(url).then(res => res.json()))
  const data = useQuery({ fn: () => fetch(url).then(res => res.json()), key: "url_fetch" });

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default DataLocalCache;
