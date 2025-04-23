import React from 'react'
import {Link, useNavigate} from 'react-router-dom'
let LandingPage = () => {
  const router = useNavigate();
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className="navHeader">
          <img src='/Logo.png' alt="Logo" />
        </div>
        <div className="navList">
          <div role='button' className="guest">
            <p onClick={() => {
                        router("/aljk2344")
                    }}>Join as guest</p>
          </div>
          <div  onClick={() => {
                        router("/auth")

                    }} role='button' className="register">
            <p>Register</p>
          </div>
          <div onClick ={()=>{
            router("/auth")
          }} role='button' className="login">
            <p>Login</p>
          </div>
        </div>
      </nav>
      <div className="landingMainContainer">
        <div className="content">
          <h1><span style={{color:"#0f7eed"}}>connect</span> with your loved once</h1>
          <p>cover  your distance by conferio</p>
          <div className="getStarted" role='button'>
          <Link to={"/auth"} className='linkGetStarted'> <p style={{color:"white"}}>Get Started <i class="fa-solid fa-arrow-right" style={{paddingLeft:"0.2rem"}}></i> </p></Link>
          </div>
        </div>
        <div className="image">
          <img src="./hero.png" alt="hero image" />
        </div>
      </div>
    </div>
  )
}

export default LandingPage