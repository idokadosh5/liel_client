
import { useEffect, useState } from "react"
import './AllMeals.css'
import {  useNavigate, useParams } from "react-router-dom"
import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider'



interface IMeal {
  _id:string
  name:string
  description:string
  image:{url:string, alt:string}
  price:number
  type:string
}


export default function AllMeals() {

const {cardId} = useParams()  
const navigate = useNavigate()

const [meals, setmeals] = useState<null|IMeal[]>(null)
const [error, setError] = useState<null|string>(null)
const [_id, set_id]  = useState('')
const [price, setPrice]  = useState<undefined|number>(undefined)
const [mealname, setMealName]  = useState<undefined|string>(undefined)
const [url, setUrl]  = useState<undefined|string>(undefined)


  
  useEffect( ()=> {
    const fetchAllmeals = async()=>{
      try{
        const response = await fetch('http://server:3000/api/meals', {
          method:'GET',
          headers:{'Content-Type': 'application/json'}
        })
        const data = await response.json()  
        setmeals(data)
      }catch(err){
        const errMessage = (err as Error).message
        setError(errMessage)
      }
    }
    fetchAllmeals()
    },[]
    )
     

    const goToCardDetails = (cardId: string) => {
      navigate(`/CardPage/${cardId}`, { state: { cardId: cardId } })
    }

    const [cart,setCart] = useState<[]|{}|string>([])

    let item = useContext(CartContext)
  
    const handleAddCard = () => {
     setCart((prevCards) => [...prevCards, [mealname,'-',price,'$',',',]]);
     item.cart = cart
     console.log(cart)
   };
   

  return (
    <>
    <div className='container'>
      {(error) && <p>Error getting meals! <br />{error}</p>}
        {
          (meals)?
          meals.map((meal)=>
        <div className="card" key={meal._id}>
        <img src={meal.image.url} className="card-img-top" alt={meal.image.alt}/>
        <div className="card-body">
        <h4 className="card-text">{meal.name}</h4>
        <h4 className="card-text">{meal.type}</h4>
        <p className="card-text">price: {meal.price} $</p>
        <button  onClick={() => goToCardDetails(meal._id)} className="btn btn-light" >See Details</button>
        <br />
        <button className='btn btn-warning' onClickCapture={()=>{set_id(meal._id),setPrice(meal.price),setMealName(meal.name),setUrl(meal.image.url)}}  onClick={()=> handleAddCard()}>
          ADD TO CART
         </button>
      </div>
    </div>
          )
          :
          'No meals'
        }
      </div>
      </>
  )
}
