import './App.css'
import { Routes, Route } from 'react-router-dom'
import { Register, Login, Todos } from './components'

function App() {

  return (
    <main className='App'>
      <Routes>
        <Route path='/' element={<Register />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/todos" element={<Todos />} />
      </Routes>
    </main>
  )
}

export default App
