



import { createContext, useState } from "react"


interface CartContextType {
    item: {
        _id:string|undefined,
        price:number|undefined,
        mealname:string|undefined,
        image:{
            url:string|undefined,
            alt:string
        }
    },
    cart:[]|string
    setCart:[]|string
}


export const CartContext = createContext<CartContextType>({item:{_id:'',price:0,mealname:'',image:{url:'', alt:''}},cart:[],setCart:[]})

  let alt = ''
  
export default function CartProvider({children}:{children:React.ReactNode}) {
  const [cart,setCart] = useState<[]|{}>([])
  const [_id, set_id]  = useState<undefined|string>(undefined)
  const [price, setPrice]  = useState<undefined|number>(undefined)
  const [mealname, setMealName]  = useState<undefined|string>(undefined)
  const [url, setUrl]  = useState<undefined|string>(undefined)


  return (
    <CartContext.Provider value={{item:{_id,price,mealname,image:{url,alt}},cart:[],setCart:[]}}>{children}</CartContext.Provider>
  )
}
