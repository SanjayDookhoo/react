import React, { useCallback, useMemo, useState } from "react"
import Rerender from "./Rerender/Rerender"

const Render = () => {
    const [count, setCount] = useState(0)
    const [random, setRandom] = useState(Math.random())

    const log = () => {
        console.log('test')
    }

    const element = useMemo(() => <p>Test</p>, [])
    const fn = useCallback(log, [])

    const child = useMemo(() => <TestChild />, []);
    
    const props = {
        count
    }

    return (<>
        <button onClick={() => setCount(count => count + 1)}>Increment {count}</button>
        <button onClick={() => setRandom(Math.random())}>Ramdon {random}</button>

        {/* <Rerender prop={random}/>  */}
        {/* does not rerender, fallback is fine */}
        {/* <Rerender prop={random ?? 0}/> */}

        {/* Will rerender because the jsx is recreated as a react.createElement new object */}
        {/* <Rerender prop={<p>Test</p>}/> */}
        {/* Will not rerender because of useMemo */}
        {/* <Rerender prop={element}/> */}
        
        {/* despite props being recreated, because it is being spread with the js rest operator, the actual value of count is checked to see if it changes */}
        {/* <Rerender {...props} /> */}

        {/* will rerender, the function is being recreated */}
        {/* <Rerender prop={log} /> */}
        {/* will not rerender, because of useCallback */}
        {/* <Rerender prop={fn} /> */}

        {/* will rerender if either count or random is changed, because the object is being recreated */}
        {/* <Rerender prop={{count}} /> */}

        {/* This will rerender */}
        {/* <Rerender>
            <TestChild />
        </Rerender> */}
        {/* This on the other hand will not rerender */}
        {/* <Rerender>
            {child}
        </Rerender> */}
    </>)}

export default Render

const TestChild = React.memo(() => {
    return <p>Test</p>
})