import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StaleClosure from './components/StaleClosure'
import ConditionalRefUsage from './components/ConditionalRefUsage'
import ExampleUseLayoutEffect from './components/ExampleUseLayoutEffect'
import PrevValuesWithUseEffect from './components/PrevValuesWithUseEffect'
import ExampleUseId from './components/ExampleUseId'
import ExampleUse from './components/Use-ErrorBoundary-Suspense/ExampleUse'

function App() {
  return (
    <>
      <ExampleUse />
      {/* <ExampleUseId />
      <ExampleUseId /> */}
      {/* <StaleClosure /> */}
      {/* <ConditionalRefUsage /> */}
      {/* <ExampleUseLayoutEffect /> */}
      {/* <PrevValuesWithUseEffect /> */}
    </>
  )
}

export default App
