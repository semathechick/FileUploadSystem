import { Route, Routes } from 'react-router-dom'
import './App.css'
import Layout from './Layout'
import Register from './pages/Register'
import Login from './pages/Login'

function App() {
  return (
    <>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route path='register' element={<Register />} />
          <Route path='login' element={<Login />} />
        </Route>
      </Routes>
    </>
  )
}

export default App
