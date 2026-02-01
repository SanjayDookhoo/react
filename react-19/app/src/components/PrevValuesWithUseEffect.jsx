import { useEffect, useRef, useState } from "react"

// Similarly also compares React 16 Class Component LifeCycle Methods
const PrevValuesWithUseEffect = () => {
  const [number, setNumber] = useState(null)
  const prevNumber = useRef(null) 
  // useRef was used
  // A regular JS variable resets on every render
  // Persists across renders
  // Does NOT cause a re-render (like if a useState was used, it is unnecessary)
  // generally <ref>.current is the convention, and should be used. it technically can have other properties mutating it after, but avoid it
  /*
  const ref = useRef({
    retries: 0,
    lastError: null,
    isConnected: false
  });
  ref.current.retries++;
  ref.current.isConnected = true;
  */

  useEffect(() => {
    console.log('componentDidMount')

    return () => {
      console.log('componentWillUnmount')
    }
  }, [])

  useEffect(() => {
    console.log('componentDidUpdate')

    console.log('prev state:', prevNumber.current)
    console.log('current state:', number)

    prevNumber.current = number
  }, [number])

  const changeNumber = () => {
    const num = Math.trunc(Math.random() * 10)
    setNumber(num)
  }

  return <>
    <button onClick={changeNumber}>Change Number</button>
  </>
}

export default PrevValuesWithUseEffect