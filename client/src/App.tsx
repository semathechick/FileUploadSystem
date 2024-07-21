import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Register from './pages/Register'
import Login from './pages/Login'
import Home from './pages/Home'

function App() {
  return (
    <>
      <Routes>
        <Route path='register' element={<Register />} />
        <Route path='login' element={<Login />} />

        <Route path='/' element={<Layout />}>
          <Route path='home' element={<Home />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
