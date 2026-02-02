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
import TodoApp from './components/TodoApp/TodoApp'
import ActivityExample from './components/ActivityExample/ActivityExample'

function App() {
  return (
    <>
      <ActivityExample />
      {/* <TodoApp /> */}
      {/* <ExampleUse /> */}
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
