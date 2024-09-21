import { useContext } from "react"
import { AuthContext } from "../../context/AuthContext"
import { Link } from "react-router-dom"

export default function AdminUser() {

    const auth = useContext(AuthContext)

  return (
    <div className="AdminUser">
        <h3>Admin Panel</h3>
        <br />
        {
          (auth?.isSignedIn && auth.isAdmin) ?
          <>
          <p>Welcome Admin</p>
          <Link to="/createCard">create a meal</Link>
          <br />
          <Link to="/UpdateScrean">updatae a meal</Link>
          <br />
          <Link to='/DeleteMeal'>delete meal</Link>
          <br />
          <Link to='/AllMeals'> browse meals</Link>
          </>
          :
          <>
          <p>You have to sign in to see this page, please sign in or sign up</p>
          <Link to="/signIn">sign-in</Link>
          <Link to="/signUp">sign-Up</Link>
          </>
        }
    </div>
  )
}
