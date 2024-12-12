import { useEffect, useState } from "react"



interface IMeal {
  _id:string
  name:string
  description:string
  image:{url:string, alt:string}
  price:number
  type:string
}

export default function Asian() {

  const [meals, setmeals] = useState<null|IMeal[]>(null)
  const [error, setError] = useState<null|string>(null)

  //get all the meals
  useEffect( ()=> {
    const fetchAllmeals = async()=>{
      try{
        const response = await fetch('https://a8387dd7fa2324cfbb1b06b37d43f98a-2055398039.eu-central-1.elb.amazonaws.com/api/meals', {
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
          meals?.filter(meals => meals.type=='Asian').map((meals)=>
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
