import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthenticationPage from './pages/AuthenticationPage'

function App() {
 let routes=createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path:"/auth",
    element:<AuthenticationPage/>
  }
 ])

  return (
    <>
     <RouterProvider router={routes}/>
    </>
  )
}

export default App
