import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"


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


export default function UpdateCard(props:CardCreation) {

  const { cardId } = useParams()
  const Navigate = useNavigate();
  const [name,setname] = useState<string>('updated')
  const [description,setDescription] = useState<string>('meal')
  const [url,setUrl] = useState<string>('https://previews.123rf.com/images/saddako/saddako1101/saddako110100018/8645204-ravioli-pasta-with-tomato-sauce.jpg')
  const [alt,setAlt] = useState<string>('updated picture')
  const [price,setPrice] = useState<string>('22.50')
  const [type, setType] = useState<string>('Italian')
  const [newcardDetails,setNewCardDetails] = useState<CardCreation|undefined>(undefined)



  const handleSubmitEdit = async(e:React.FormEvent)=>{
    e.preventDefault();
    if(props){
      const newCardData = {
        name:name,
        description: description,
        price:price,
        type:type,
        image:{
        url:url,
        alt:alt,
        _id:cardId
      },
      }
      
      const isCreated = newcardDetails
      fetchEditedcard(newCardData)
      if(isCreated){
      console.log(newCardData);
      Navigate('/UpdateScrean')
      alert('Your card Updated Seccessfuly')
      }else{
        return {Error}
      }
     }
  }


  const fetchEditedcard = async(props:CardCreation)=>{
    try{
      const response = await fetch(`http://a14cc540c6ce647b4b7261bf6ee8328f-1615012765.eu-central-1.elb.amazonaws.com:3000/api/meals/${cardId}`, {
      method:'PATCH',
      headers:{'Content-Type': 'application/json',
    },
      body:JSON.stringify(props)
    })
    const data = await response.json()
      setNewCardDetails(data)
    }catch(err){
      const errMessage = (err as Error).message
      return {error:errMessage}
    }
  }

  return (
    <>
    <div className="UpdateMeal Home" style={{width:'60%'}}>
        <h4>Edit Meal</h4>
        <form onSubmit={handleSubmitEdit} className="row g-2 needs-validation">
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
      <input type="price" className="form-control" id="exampleInputEmail3" value={price} onChange={(e)=>setPrice(e.target.value)} required/>
    </div>
  </div>
  <div className="col-12">
    <button className="btn btn-warning" type="submit" >Save</button>
  </div>
</form>
</div>
</>
  )
}
