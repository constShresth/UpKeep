import { useState } from 'react'
import { createBrowserRouter, RouterProvider,Link } from 'react-router-dom'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import StudentHomePage from './pages/StudentHomePage'
import StaffHomePage from './pages/StaffHomePage'
import AdminHomePage from './pages/AdminHomePage'


function App() {

  const router = createBrowserRouter([
    {
      path:"/",
      element:<div>
      <ul>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/student/home">Student</Link></li>
        <li><Link to="/staff/home">Staff</Link></li>
        <li><Link to="/admin/home">Admin</Link></li>
      </ul>
      </div>
    },
    {
      path:"/student/home",
      element:<StudentHomePage/>
    },
    {
      path:"staff/home",
      element:<StaffHomePage/>
    },
    {
      path:"admin/home",
      element:<AdminHomePage/>
    }
  ])

  const [count, setCount] = useState(0)


  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
