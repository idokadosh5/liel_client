import { Link } from "react-router-dom";
import { FaCartPlus } from "react-icons/fa";


export default function CategoriesNav() {
  return (
      <nav className=" navbar navbar-expand-lg bg-body-tertiary navbar-light" >
        <div className="container-fluid Home Page bg-warning mb-0">
      <ul className="nav d-flex justify-content-center bg-warning text-light">
      <li className="nav-item">
      <Link  to={'/Italian'} className="nav-link link-light" aria-current="page" >Italian</Link>
      </li>
      <li className="nav-item">
      <Link  to={'/American'} className="nav-link link-light" aria-current="page" >American</Link>
      </li>
      <li className="nav-item">
      <Link  to={'/Asian'} className="nav-link link-light" aria-current="page" >Asian</Link>
      </li>
      <li className="nav-item">
      <Link  to={'/Vegeterian'} className="nav-link link-light" aria-current="page" >Vegeterian</Link>
      </li>
      </ul>
      <ul className="nav d-flex justify-content-center bg-warning text-light">
      <Link to={'/Cart'} className="nav-item me-5 " >
      <FaCartPlus  />
      </Link>  
      </ul>      
      </div>
      </nav>

  )
}
