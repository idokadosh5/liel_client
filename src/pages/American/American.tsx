import { useEffect, useState } from "react"



interface IMeal {
  _id:string
  name:string
  description:string
  image:{url:string, alt:string}
  price:number
  type:string
}

export default function American() {

  const [meals, setmeals] = useState<null|IMeal[]>(null)
  const [error, setError] = useState<null|string>(null)

  //get all the meals
  useEffect( ()=> {
    const fetchAllmeals = async()=>{
      try{
        const response = await fetch('http://a939c68d0986f4fdd843124d40a78e86-1609853690.eu-central-1.elb.amazonaws.com:3000/api/meals', {
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

  return (
    <>
    <>
    <div className='container'>
      {(error) && <p>Error getting meals! <br />{error}</p>}
        {
          (meals)?
          meals?.filter(meals => meals.type=='American').map((meals)=>
          <div className="card" key={meals._id}>
          <img src={meals.image.url} className="card-img-top" alt={meals.image.alt}/>
         <div className="card-body text-bg-dark">
         <h5 className="card-title">{meals.name}</h5>
         <p className="card-text">{meals.description}</p>
         <p className="card-text">{meals.price}</p>
        </div>
      </div>
          )
          :
          'No meals'
        }
      </div>
      </>
    </>
  )
}
