
import { useEffect, useState } from "react"
import {  useNavigate, useParams } from "react-router-dom"

interface IMeal {
    _id:string
    name:string
    description:string
    image:{url:string, alt:string}
    price:number
    type:string
  }
  


export default function UpdateScreen() {

const {cardId} = useParams()  
const navigate = useNavigate()

const [meals, setmeals] = useState<null|IMeal[]>(null)
const [error, setError] = useState<null|string>(null)

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
        navigate(`/UpdateCard/${cardId}`, { state: { cardId: cardId } })
      }

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
        <p className="card-text">{meal.description}</p>
        <h4 className="card-text">{meal.type}</h4>
        <p className="card-text">price: {meal.price} $</p>
        <button  onClick={() => goToCardDetails(meal._id)} className="btn btn-warning" >Edit</button>
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
