
import './Home.css'
import { Link } from 'react-router-dom'


export default function Home() {
  
  return (
    <>
    <div className='Home Page mt-0'>
      <img src="public\_ FoodDeliveryBanner.png" alt="foodDeliveryBanner" style={{width: "100vw", height:"40vh"}}/>
      </div>
      <div>
        <h1>Food Delivery</h1>
        <h3>From our kitchen to your home</h3>
        <p>Get your favotite food from variouse cusines everywhere you are with ease
          <br />
          Sign in to Order now
        </p>
        <button className="btn btn-warning">
        <Link  to={'/AllMeals'} className="btn btn-warning" aria-current="page" >Order Now</Link>
        </button>
      </div>
  </>
  )
}
