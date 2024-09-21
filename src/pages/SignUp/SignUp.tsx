import {  useContext, useState } from 'react'
import './SignUp.css'
import { AuthContext } from '../../context/AuthContext'
import { useNavigate } from 'react-router-dom'



export default function SignUp() {

  
 const [email,setEmail] = useState<string>('Arik@gmail.com')
 const [password,setPassword] = useState<string>('Abc!123Abc')
 const [firstName,setFirstName] = useState<string>('Arik')
 const [lastName,setLastName] = useState<string>('Lavi')
 const [phone,setPhone] = useState<string>('0502588455')
 const [country,setCountry] = useState<string>('Israel')
 const [city,setCity] = useState<string>('Haifa')
 const [state,setState] = useState<string>('mercaz')
 const [street,setStreet] = useState<string>('Yam')
 const [houseNumber,setHouseNumber] = useState<string>('15')



 const auth = useContext(AuthContext)
 const Navigate = useNavigate();

   const handleSubmit= async(e:React.FormEvent)=>{
      e.preventDefault();
      console.log(firstName,lastName,phone,password);
      if(auth){
        const userData = {
          name:{
          first:firstName,
          last:lastName,
          },
          email:email,
          password:password,
          address: {
          country:country,
          city:city,
          state:state,
          street:street,
          houseNumber:Number(houseNumber),
        },
          phone:phone,
          image:{
          url:'https://cdn.dribbble.com/users/40756/screenshots/6232646/side-profile-woman_2x_4x.png',
          alt:'picture'
        }
        }
        const isRegistered = await auth?.signUp(userData)
        if(isRegistered){
          Navigate('/SignIn')
          alert('Signed Up Seccessfuly')
        }else{
          return {Error}
        }
       }
   }


  return (
    <>
    <div className='SignUp position-absolute top-50 start-50 translate-middle'>
        <h3>SignUp To Join Us</h3>
        <form onSubmit={handleSubmit} className="row g-2 needs-validation">
  <div className="col-md-6">
    <label htmlFor="validationCustom01" className="form-label">First name</label>
    <input type="text" className="form-control" id="validationCustom01" value={firstName} onChange={(e)=>setFirstName(e.target.value)} required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustom02" className="form-label">Last name</label>
    <input type="text" className="form-control" id="validationCustom02" value={lastName} onChange={(e)=>setLastName(e.target.value)} required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustomUsername" className="form-label">Email</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">@</span>
      <input type="email" className="form-control" id="exampleInputEmail3" aria-describedby="emailHelp" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
      <div className="invalid-feedback">
        Please enter a vaild emil adress using @.
      </div>
    </div>
  </div>
  <div className="col-md-6">
    <label htmlFor="validationCustomUsername" className="form-label">password</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend">*</span>
      <input type="password" className="form-control" id="validationCustomUsername" aria-describedby="inputGroupPrepend" value={password} onChange={(e)=>setPassword(e.target.value)} required/>
      <div className="invalid-feedback">
        The password should contain 8-16 characters with  1 uppercase, one lowercase and one number(1-9).
      </div>
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom03" className="form-label">Country</label>
    <input type="text" className="form-control" id="validationCustom03" value={country} onChange={(e)=>setCountry(e.target.value)} required/>
    <div className="invalid-feedback">
      Please provide a valid adress.
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom03" className="form-label">city</label>
    <input type="text" className="form-control" id="validationCustom04" value={city} onChange={(e)=>setCity(e.target.value)} required/>
    <div className="invalid-feedback">
      Please provide a valid adress.
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom03" className="form-label">State</label>
    <input type="text" className="form-control" id="validationCustom05" value={state} onChange={(e)=>setState(e.target.value)} required/>
    <div className="invalid-feedback">
      Please provide a valid adress.
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom03" className="form-label">Street</label>
    <input type="text" className="form-control" id="validationCustom06" value={street} onChange={(e)=>setStreet(e.target.value)} required/>
    <div className="invalid-feedback">
      Please provide a valid adress.
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom03" className="form-label">HouseNumber</label>
    <input type="text" className="form-control" id="validationCustom07" value={houseNumber} onChange={(e)=>setHouseNumber(e.target.value)} required/>
    <div className="invalid-feedback">
      Please provide a valid adress.
    </div>
  </div>
  <div className="col-md-4">
    <label htmlFor="validationCustom05" className="form-label">Phone Number</label>
    <input type="phone" className="form-control" id="validationCustom08" value={phone} onChange={(e)=>setPhone(e.target.value)} required/>
    <div className="invalid-feedback">
      Please provide a valid Phone Number.
    </div>
  </div>

  <div className="col-12">
    <button className="btn btn-warning" type="submit">Submit</button>
  </div>
</form>
    </div>
    </>
  )
}
