import { useEffect, useState } from 'react'
import './CardPage.css'
import { useParams } from 'react-router-dom'




interface IMeal {
  _id:string
  name:string
  description:string
  image:{url:string, alt:string}
  price:number
  type:string
}


export default function CardPage() {

    const {cardId} = useParams()
    const [meal, setMeal] = useState<null|IMeal[]>(null)
    const [error, setError] = useState<null|string>(null)
    
    useEffect(() => {
      const fetchCard = async () => {
        try {
          const response = await fetch(`http://127.0.0.1:3000/api/meals/${cardId}`, {
            method: 'GET',
            headers: { 'Content-Type': 'application/json' },
          });
          const data = await response.json()
          if (!response.ok) throw new Error(data)
          setMeal(data)
        } catch (err) {
          const errMessage = (err as Error).message
          setError(errMessage)
        }
      };
      fetchCard();
    },[cardId])



  return (
    <div className='CardPage'>
        <h1>Card View</h1>
        {(error) && <p>Error getting cards! <br />{error}</p>}
        <div className='container'>
        {
          (meal)?
          <div className="card">
          <img src={meal.image.url} className="card-img-top" alt={meal.image.alt}/>
         <div className="card-body text-bg-light">
         <h5 className="card-title">{meal.name}</h5>
         <h5 className="card-title">{meal.type}</h5>
         <p className="card-text">{meal.description}</p>
         <p className="card-text">{meal.price} $</p>
          </div>
         </div>
          :
          'No cards'
        }
      </div></div>
  )
}
