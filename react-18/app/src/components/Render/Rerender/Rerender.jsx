import React from 'react'

const Rerender = React.memo(({prop, children}) => {
    console.log('Rerender')
    return (<></>)
})

export default Rerender