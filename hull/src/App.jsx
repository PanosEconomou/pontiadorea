import { useState } from 'react'
import MapChart from './MapChart'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <MapChart />
    </>
  )
}

export default App
