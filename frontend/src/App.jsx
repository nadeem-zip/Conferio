import {createBrowserRouter,RouterProvider} from 'react-router-dom'
import './App.css'
import LandingPage from './pages/LandingPage'
import AuthenticationPage from './pages/AuthenticationPage'
import { AuthProvider } from './context/AuthContext'
import VideoMeet from './pages/VideoMeet'
import HomeComponent from './pages/HomeComponent'
import History from './pages/History'

function App() {
 let routes=createBrowserRouter([
  {
    path:"/",
    element:<LandingPage/>
  },
  {
    path:"/auth",
    element:(
      <AuthProvider>
        <AuthenticationPage/>
      </AuthProvider>
    )
  },
  {
    path:"/home",
    element:(<AuthProvider>
      <HomeComponent />
    </AuthProvider>)
  },
  {
    path:"/history",
    element:(<AuthProvider>
      <History />
    </AuthProvider>)
  },
  {
    path:"/:url",
    element:(
      <AuthProvider>
        <VideoMeet />
      </AuthProvider>
    )
  }
 ])

  return (
    <>
     <RouterProvider router={routes}/>
     
    </>
  )
}

export default App
