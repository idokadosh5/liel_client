
import { useState } from 'react'
import './createCard.css'
import { useNavigate } from 'react-router-dom'

interface CardCreation {
  name:string,
  description:string,
  image:{
  url:string,
  alt:string,
  },
  price:string,
  type:string,
}

export default function CreateCard(props:CardCreation) {

  const Navigate = useNavigate();
  const [name,setname] = useState<string>('Pancakes')
  const [description,setDescription] = useState<string>('A stack of pancakes with maple souce')
  const [url,setUrl] = useState<string>('https://thumbs.dreamstime.com/z/freshly-baked-5968725.jpg')
  const [alt,setAlt] = useState<string>('pancakes picture')
  const [price,setPrice] = useState<string>('10.99')
  const [type,setType] = useState<string>('American')
  const [newcardDetails,setNewCardDetails] = useState<CardCreation|undefined>(undefined)

 
  const handleSubmit = async(e:React.FormEvent)=>{
    e.preventDefault();
    if(props){
      const newCardData = {
        name:name,
        image:{
        url:url,
        alt:alt,
      },
      price:price,
      type:type,
      description:description
      }
      const isCreated = newcardDetails
      fetchNewcard(newCardData)
      console.log(isCreated);
      if(isCreated){
        Navigate('/AllMeals')
      alert('Your meal created Seccessfuly')
      }
      }else{
        return {Error}
      }
     }
    


  const fetchNewcard = async(props:CardCreation)=>{
    try{
      const response = await fetch('http://a14cc540c6ce647b4b7261bf6ee8328f-1615012765.eu-central-1.elb.amazonaws.com:3000/api/meals', {
      method:'POST',
      headers:{'Content-Type': 'application/json',
    },
      body:JSON.stringify(props)
    })
    const data = await response.json()

    if(response.ok){
      setNewCardDetails(data)
    }
    if(!response.ok) return data
    return {error:undefined}
    }catch(err){
      const errMessage = (err as Error).message
      return {error:errMessage}
    }
  }


  return (
    <>
    <div className="CreateCard" style={{width:'60%',}}>
        <h4>Create a Card</h4>
        <form onSubmit={handleSubmit} className="row g-2 needs-validation">
  <div className="col-md-12">
    <label htmlFor="validationCustom01" className="form-label">Pictre url</label>
    <input type="url" className="form-control" id="validationCustom01" value={url} onChange={(e)=>setUrl(e.target.value)} required/>
  </div>
  <div className="col-md-12">
    <label htmlFor="validationCustom01" className="form-label">Alt</label>
    <input type="text" className="form-control" id="validationCustom01" value={alt} onChange={(e)=>setAlt(e.target.value)} required/>
  </div>
  <div className="col-md-12">
    <label htmlFor="validationCustom01" className="form-label">name</label>
    <input type="text" className="form-control" id="validationCustom01" value={name} onChange={(e)=>setname(e.target.value)} required/>
    <div className="valid-feedback">
      Looks good!
    </div>
  </div>
  <div className="col-md-12">
    <label htmlFor="validationCustomUsername" className="form-label">Description</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend"></span>
      <input type="text" className="form-control" id="exampleInputEmail3" value={description} onChange={(e)=>setDescription(e.target.value)} required/>
    </div>
  </div>
  <div className="col-md-12">
    <label htmlFor="validationCustomUsername" className="form-label">type</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend"></span>
      <input type="text" className="form-control" id="exampleInputEmail3" value={type} onChange={(e)=>setType(e.target.value)} required/>
    </div>
  </div>
  <div className="col-md-12">
    <label htmlFor="validationCustomUsername" className="form-label">price</label>
    <div className="input-group has-validation">
      <span className="input-group-text" id="inputGroupPrepend"></span>
      <input type="text" className="form-control" id="exampleInputEmail3" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
    </div>
  </div>
  <div className="col-12">
    <button className="btn btn-warning" type="submit">Save</button>
  </div>
</form>
</div>
</>
  )
}
