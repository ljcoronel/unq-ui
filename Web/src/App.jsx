import { useState } from 'react'
import './App.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import FormField from './components/atoms/formField'

function App() {
  const [count, setCount] = useState(0)

  return (
    <BrowserRouter>
      <Routes>
        <Route path="register" element={<FormField labelText="EMAIL"/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App
