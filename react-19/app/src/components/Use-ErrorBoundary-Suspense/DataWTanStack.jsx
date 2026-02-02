import { useEffect, useState } from "react";
import {useSuspenseQuery} from "@tanstack/react-query"

const get = async (url) => {
  const response = await fetch(url)
  return await response.json()
}

const commentsURL = 'https://jsonplaceholder.typicode.com/comments'
const getComments = async () => {
  const response = await fetch(commentsURL)
  return await response.json()
}

const DataWTanStack = ({ url }) => {
  // TODO: explore this more with options to allow for better reusability and no errors trying to get the queryKey always exact
  const {data} = useSuspenseQuery({
    queryKey: ["url_fetch"],
    queryFn: getComments
    // queryFn: async () => await get(url) // dont call the function here, hence why it was done as an anonymous function
  })

  return <pre>{JSON.stringify(data, null, 2)}</pre>;
};

export default DataWTanStack;
