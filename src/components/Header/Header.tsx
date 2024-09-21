import { Link } from 'react-router-dom'
import './Header.css'
import { TbSunOff } from "react-icons/tb";
import { FaCircleUser } from "react-icons/fa6";
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../../context/AuthContext';


const elmDocument = document.querySelector('html') as HTMLElement


export default function Header() {

    const [theme, setTheme] =useState('light')

    const toggleTheme = () => {
       const newTheme = theme === 'light' ? 'dark' : 'light'
       setTheme(newTheme)
       elmDocument.setAttribute('data-bs-theme', newTheme)
       localStorage.setItem('theme', newTheme)
  }

  const auth = useContext(AuthContext)

  useEffect(()=>{
    const LsTheme = localStorage.getItem('theme')
    if(LsTheme){
      elmDocument.setAttribute('data-bs-theme', LsTheme)
      setTheme(LsTheme)
    }else{
      localStorage.setItem('theme','light')
      elmDocument.setAttribute('data-bs-theme', 'light')
      setTheme('light')
    }
  },[])

  useEffect(()=>{
    auth?.loadUserFromLS()
  },[auth?.isSignedIn]
  )

  return (
    <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary navbar-light fixed-top ">
  <div className="container-fluid ">
    <Link to={'/Home'} className="navbar-brand text-warning">Food Delivery</Link>
    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link to={'/About'} className="nav-link">About</Link>
        </li>
        {
          (auth?.isSignedIn) && (auth?.isAdmin) ?
          <Link to='/AdminUser' className='nav-link'>Admin Panel</Link>
          :
          <></>
        }
        </ul>
        <ul className="navbar-nav mx-auto p-2">
      <form className="d-flex" role="search">
        <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search"/>
        <button className="btn btn-outline-warning" type="submit">Search</button>
      </form>
      </ul>
      <ul className="navbar-nav e-auto">
      {(!auth?.isSignedIn) ?
      <>
        <li className="nav-item">
          <Link  to={'/SignUp'} className="nav-link active" aria-current="page" >SignUp</Link>
        </li>        
        <li className="nav-item">
          <Link  to={'/SignIn'} className="nav-link active" aria-current="page" >SignIn</Link>
        </li>
        </>
        :
        <> 
        <li className='nav-link'>
            <FaCircleUser className={`user-icon ${auth?.isSignedIn && 'signed-in'}`} size={24}/>
        </li> 
        <li className='nav-link' style={{cursor:'pointer', color:'red'}} onClick={()=>auth.signOut()}> Sign-out</li>
        </>
        }
      <button onClick={() => {toggleTheme()}}> 
      <TbSunOff size={30}/>
      </button>
      </ul>
    </div>
  </div>
</nav>
    </>
  )
}
