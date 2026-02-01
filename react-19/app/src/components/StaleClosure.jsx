import { useEffect, useRef, useState } from "react"

const StaleClosure = () => {
    const [count, setCount] = useState(0)
    const countRef = useRef(count)

    // // this will not work correctly, because count will always be the value this function was first initialized with
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         setCount(count + 1)
    //     }, 1000)

    //     return () =>  clearInterval(id)
    // }, [])

    // // this will work on the other hand, but still not the best approach, will be better to do a  "Functional state update"
    // useEffect(() => {
    //     const id = setInterval(() => {
    //         const newValue = countRef.current + 1
    //         countRef.current = newValue
    //         setCount(newValue)
    //     }, 1000)

    //     return () =>  clearInterval(id)
    // }, [])

    // "Functional state update"
    useEffect(() => {
        const id = setInterval(() => {
            setCount(prev => prev + 1);
        }, 1000);

        return () => clearInterval(id);
    }, []);

    return <>
        <div>{count}</div>
    </>
}

export default StaleClosure