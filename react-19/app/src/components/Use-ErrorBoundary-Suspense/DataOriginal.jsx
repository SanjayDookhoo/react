import { useEffect, useState } from "react";

const DataOriginal = ({ url }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [data, setData] = useState();

  useEffect(() => {
    setIsError(false);
    setIsLoading(true);
    setData(undefined);

    fetch(url)
      .then((res) => res.json())
      .then(setData)
      .catch(() => setIsError(true))
      .finally(() => setIsLoading(false));
  }, [url]);

  return isLoading ? (
    <h1>Loading ...</h1>
  ) : isError ? (
    <h1>Error</h1>
  ) : (
    <pre>{JSON.stringify(data, null, 2)}</pre>
  );
}

export default DataOriginal;
