
import { useEffect, useState } from "react"
import { useNavigate } from 'react-router-dom'

interface IMeal {
    _id:string
    name:string
    description:string
    image:{url:string, alt:string}
    price:number
    type:string
  }

export default function DeleteMeal() {

const Navigate = useNavigate();
const [meals, setmeals] = useState<null|IMeal[]>(null)
const [error, setError] = useState<null|string>(null)
const [_id, set_id]  = useState('')

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
    },[meals]
    )

    const handleDeleteButton = async (_id:string)=>{
        try {
            const response = await fetch(`http://server:3000/api/meals/${_id}`, {
                method:'DELETE',
                headers:{'Content-Type': 'application/json'}
              })
              const data = await response.json()  
              setmeals(data)
              if(data){
                Navigate('/AllMeals')
              alert('Your meal had been deleted, you are transferred back to all meals page')
              }
        } catch (err) {
            const errMessage = (err as Error).message
        setError(errMessage)
        }
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
        <h4 className="card-text">{meal.type}</h4>
        <p className="card-text">price: {meal.price} $</p>
        <button className='btn btn-warning' onClickCapture={()=>{set_id(meal._id)}}  onClick={()=> handleDeleteButton(_id)}>
          Delete Meal
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
