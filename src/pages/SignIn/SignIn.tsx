
import { useContext, useState } from 'react'
import './SignIn.css'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'


export default function SignIn() {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string|null>(null)

  const auth = useContext(AuthContext)
  const Navigate = useNavigate();

  const handleSubmit = async (e:React.FormEvent) => {
    e.preventDefault();
    if(auth){
     const errMessage = await auth.signIn(email,password)
     if(!errMessage){
      Navigate('/')
     }
     else{
      setError(errMessage)
     }
    }
  }

  return (
    <>
    <div className='SignIn position-absolute top-50 start-50 translate-middle'>
      <h3>Sign In</h3>
        <form onSubmit={handleSubmit}>
  <div className="mb-3">
    <label htmlFor="exampleInputEmail1" className="form-label">Email address</label>
    <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
  </div>
  <div className="mb-3">
    <label htmlFor="exampleInputPassword1" className="form-label">Password</label>
    <input type="password" value={password} onChange={(e)=>setPassword(e.target.value)} required className="form-control" id="exampleInputPassword1"/>
  </div>
  <button type="submit" className='btn btn-warning'> signIn </button>

  {
    (error) && <p style={{color:'red'}}>{error}</p>
  }
</form>
    </div>
    </>
  )
}
