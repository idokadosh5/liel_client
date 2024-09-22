import { jwtDecode } from "jwt-decode"
import { createContext, useState } from "react"

interface AuthContextType{
    email:string|null
    isBusiness:boolean
    isAdmin:boolean
    isSignedIn:boolean
    UserDetails:UserIdType|undefined
    getToken:()=> Promise<string|null>
    signIn:(email:string, password:string) => Promise<void|string>
    signOut:() => void
    signUp: ({}:IUserDetails) => Promise<string|undefined>
    loadUserFromLS: ()=> void
}

interface CustomJwtPayLoad {
  _id:string
  isBusiness:boolean
  isAdmin:boolean
  iat:number
}

interface UserIdType {
  name:{
    first:string
    middle:string
    last:string
  }
  phone:number
  image:{
    url:string
    alt:string
  }
  address:{
    state:string
    country:string
    city:string
    street:string
    houseNumber:number
    zip:number
  }
  isBusiness:boolean
  isAdmin:boolean
  _id:string
  iat:number
  createdAt:string
}

interface IUserDetails{
name:{
  first:string,
  last:string,
}
email:string;
password:string,
address:{
  country:string,
city:string,
state:string,
street:string,
houseNumber:number,
}
phone:string,
image:{
  url:string,
  alt:string,
},
_id:string
}


export const AuthContext = createContext<AuthContextType|undefined>(undefined);

export default function AuthProvider({children}:{children:React.ReactNode}) {
  
    const [email,setEmail] = useState<null|string>(null)
    const [isBusiness,setIsBusiness] = useState<boolean>(false)
    const [isAdmin,setIsAdmin] = useState<boolean>(false)
    const [_id,setId] = useState<string>('')
    const [isSignedIn, setIsSignedIn] = useState(false)
    const [UserDetails, setUserDetails] = useState<UserIdType|undefined>(undefined)

    const getUserById = async (_id:string) => {
      const token = localStorage.getItem('userToken')
      
        try{
          const response = await fetch(`http://a939c68d0986f4fdd843124d40a78e86-1609853690.eu-central-1.elb.amazonaws.com:3000/api/users/${_id}`, {
            method:'GET',
            headers:{
            'Content-Type': 'application/json',
            'x-auth-token':`${token}`
          }
          })
          const data:UserIdType = await response.json()
          setUserDetails(data)
          console.log(_id);
        }catch(err){
          const errMessage = (err as Error).message
        return errMessage
        }
    }
    
    const signIn = async (email:string, password:string) => {
      try{
        const response = await fetch('http://a939c68d0986f4fdd843124d40a78e86-1609853690.eu-central-1.elb.amazonaws.com:3000/api/auth/login', {
          method:'POST',
          headers:{'Content-Type': 'application/json'},
          body:JSON.stringify({email,password})
        })
        const data = await response.text()
        if (!response.ok) throw new Error(data)
        const decoded = jwtDecode<CustomJwtPayLoad>(data)
        setEmail(email)
        setIsSignedIn(true)
        setIsAdmin(decoded.isAdmin)
        localStorage.setItem('userToken', data)
        setId(decoded._id)
        getUserById(_id)
      }catch(err){
        const errMessage = (err as Error).message
        return errMessage
      }
    }

    const signOut = () => {
      setEmail(null)
      setIsSignedIn(false)
      setIsAdmin(false)
      setIsBusiness(false)
      localStorage.removeItem('userToken')
    }

    const signUp = async (userSignupDetails:IUserDetails) => {
      try{
        const response = await fetch('http://a939c68d0986f4fdd843124d40a78e86-1609853690.eu-central-1.elb.amazonaws.com:3000/api/auth/register', {
        method:'POST',
        headers:{'Content-Type': 'application/json'},
        body:JSON.stringify(userSignupDetails)
      })
      const data = await response.json()
      setUserDetails(data)
      if(response.ok){
      }
      if(!response.ok) return data
      console.log(data);
      return {error:undefined}
      }catch(err){
        const errMessage = (err as Error).message
        return {error:errMessage}
      }
    }

    const loadUserFromLS = ()=>{
      const userToken = localStorage.getItem('userToken')
      if(!userToken) return null
      const user = jwtDecode<CustomJwtPayLoad>(userToken)
      setIsSignedIn(true)
      setIsAdmin(user.isAdmin)
    }
   
    const getToken = async():Promise<string|null> =>{
      const token = localStorage.getItem('userToken')
      if(token){
        return token
      }else{
        return null
      }
    }

    
    

    return (
    <AuthContext.Provider value={{ isSignedIn, email, isBusiness, isAdmin,UserDetails ,signIn,signOut, signUp, loadUserFromLS, getToken}}>
    {children}
    </AuthContext.Provider>
  )
}
