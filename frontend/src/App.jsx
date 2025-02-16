import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import { SignupFormDemo } from './components/Signform'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <SignupFormDemo/>
    </>
  )
}

export default App
