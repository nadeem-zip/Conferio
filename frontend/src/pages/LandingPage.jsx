import React from 'react'
import {Link} from 'react-router-dom'
let LandingPage = () => {
  return (
    <div className='landingPageContainer'>
      <nav>
        <div className="navHeader">
          <img src='../public/images/Logo.png' alt="Logo" />
        </div>
        <div className="navList">
          <div role='button' className="guest">
            <p>Join as guest</p>
          </div>
          <div role='button' className="register">
            <p>Register</p>
          </div>
          <div role='button' className="login">
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
          <img src="./public/images/hero.png" alt="hero image" />
        </div>
      </div>
    </div>
  )
}

export default LandingPage