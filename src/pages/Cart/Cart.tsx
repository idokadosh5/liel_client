
import { useContext } from 'react';
import { CartContext } from '../../context/CartProvider'


export default function Cart() {

  const item = useContext(CartContext)
  const {cart} = useContext(CartContext)
  console.log(cart);


  return (
    <div className='Cart Page Home'>
    <h1>Cart</h1>
    {
      (cart)? 
      <>
      <ul className="list" key={item.item._id}>
        <h5>Cart Items:</h5>
            {cart}
        </ul>
      </> 
      : 
      <>
      <h5>cart is empty</h5>
      </>
    }
    </div>
  )
}
