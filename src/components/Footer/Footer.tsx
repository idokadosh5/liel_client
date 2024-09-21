import './Footer.css'
import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <div className='Footer bg-light w-100 fixed-bottom '>
    <ul className="nav nav-underline">
      <li className="nav-item">
          <Link to={'/Home'} className="nav-link text-warning" aria-current="page">Home</Link>
      </li>
      <li className="nav-item">
          <Link to={'/About'} className="nav-link text-warning">About</Link>
      </li>
      <li className="nav-item">
          <Link to={'/'} className="nav-link text-warning" aria-current="page">Copyright © BCards, 2024</Link>
      </li>
    </ul>
  </div>
    
  )
}
