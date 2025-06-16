import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StageStories from './components/StageStories'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <StageStories />
    </>
  )
}

export default App
