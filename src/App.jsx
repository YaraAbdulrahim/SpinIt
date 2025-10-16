import { useState } from 'react'
import Roulette from './components/Roulette'

function App() {
  const [count, setCount] = useState(0)

  return (

<div className="bg-gradient-to-r from-white via-blue-200 to-white min-h-screen w-full flex items-center justify-center">

<Roulette/>
</div>
  )
};

export default App;
