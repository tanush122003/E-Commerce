import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/authContext'
import { CartState } from '../../context/cart/Context'
import './CartPage.css'
import { toast } from 'react-hot-toast'

const CartPage = () => 
{
  const {state:{cart,total,totalledBy},dispatch} = CartState()
  const [shipping,setShipping] = useState(40)
  const [cartFromBackend,setCartFromBackend] = useState([])
  const [isUserAddressPresent,setIsUserAddressPresent] = useState(false)
  const totalCartAmount = JSON.parse(localStorage.getItem('cartItems'))
  const navigate = useNavigate()
  const [auth,setAuth] = useAuth()
  const loggedInUserCartItems = JSON?.parse(localStorage?.getItem('cartItems')) && JSON?.parse(localStorage?.getItem('cartItems')).map((singleProduct)=>{
     if(singleProduct?.addedBy===auth?.user?.email)
     {
      return singleProduct
      }
  }).filter((x)=>
  {
    return x!==undefined
  })

  console.log(loggedInUserCartItems)
  console.log(cartFromBackend)

  const sendUserCartItemsToBackend = async()=>
  {
    const {data} = await axios.post(`/product/${auth?.user?.email}/cart`,loggedInUserCartItems)
    console.log(data)
    getCartItems()
    
  }
  
  const getCartItems = async()=>
  {
    const {data} = await axios.get(`/product/${auth?.user?.email}/cart`)
    console.log(data)
    console.log(data?.cart,'cart from backend',data?.cart?.length)
    setCartFromBackend(data?.cart)

  }

  const verifyIfUserAddressPresent=async()=>{
    const {data} = await axios.get('/user/getUserAddressBeforePlacingOrder')

    if(data?.address){
      setIsUserAddressPresent(true)
    }else{
      setIsUserAddressPresent(false)

    }
  }

  console.log(isUserAddressPresent)

  useEffect(()=>
  {
    verifyIfUserAddressPresent()
  },[cart])
 
useEffect(()=>
{ 
  sendUserCartItemsToBackend()
  getCartItems()

},[cart])


console.log(cartFromBackend)
  

  useEffect(()=>
  {  
    console.log(JSON.parse(localStorage.getItem('cartItems')),'from localstorage')
    if(localStorage.getItem('cartItems')){
      dispatch({
        type:'LOAD_CART_ITEMS_FROM_LOCALSTORAGE',
        payload:{products:JSON.parse(localStorage.getItem('cartItems')).filter((p)=>{
          return p?.addedBy === auth?.user?.email 
        })
        ,totalledBy:auth?.user?.email },
      })
    }
    
  },[total])

 
  return (
    <>
    <section class="cart">
    <div class="container">
        <div class="row justify-content-between align-items-start">
            <div class="col-12 col-md-9 col-lg-9 cart-items-left-side d-flex flex-column">
                <h2 class="text-center section-title text-bg-dark bg-transparent">Items in Cart</h2>
                
               {cartFromBackend.length > 0 ? (cartFromBackend.map((singleProduct)=>{
        
            return  <div class="row mt-3 cart-item d-flex">
            <div class="col-4">
                <img src={singleProduct.photo} alt=""/>
            </div>
            <div class="col-4 mt-lg-4 d-flex justify-content-around flex-column align-items-center middle-section">
                <h6 class="item-name">{singleProduct.name}</h6>
                <span class="text-center item-price">₹{singleProduct.price}</span>
                <span class="delete-icon" onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:{product:singleProduct,totalledBy:auth?.user?.email}})}><i class="fa fa-trash"></i></span>

            </div>
            <div class="col-4 increase-decrease d-flex flex-lg-row-reverse gap-md-2 flex-sm-column flex-md-column gap-lg-5 align-items-center justify-content-lg-center justify-content-md-center justify-content-sm-around mt-lg-4">
                <span class="plus" onClick={(e)=>dispatch({type:"INCREMENT_QUANTITY",payload:{
                  id:singleProduct._id,
                  qty:singleProduct.qty,
                  addedBy:auth?.user?.email ,
                  totalledBy:auth?.user?.email 
                }})}>+</span>
                {/* <!-- ! if the value will be some number then it will be given that value but if value is an empty string, it will be defaulted to 0 --> */}
                <input type="number" class="increase-decrease-input-box" value={singleProduct.qty} />
                <span class="minus" onClick={(e)=>dispatch({type:"DECREMENT_QUANTITY",payload:{
                  id:singleProduct._id,
                  qty:singleProduct.qty,
                  addedBy:auth?.user?.email,
                  totalledBy:auth?.user?.email 
                }})}>-</span>
            </div>
            
        </div>
               })) : ""} 

            </div>
            <div id='right' class="col-12 col-md-3 col-lg-3 cart-summary d-flex flex-column border border-dark summary">
                <h2 class="text-center section-title">Summary</h2>

                    <div class="cost-n-shipping">
                        <div class="cost w-100 justify-content-around d-flex justify-content-lg-between justify-content-md-around">
                            <span class="span cost-text">Cost</span>
                            <span class="cost-number">₹{totalledBy===auth?.user?.email ?  total : 0}</span>
                        </div>
                        <div class="shipping w-100 d-flex justify-content-around justify-content-lg-between justify-content-md-around">
                            <span class="span shipping-text">Shipping</span>
                            <span class="shipping-price">₹{cart.length ? shipping : 0}</span>
                        </div>
                    </div>
                    <hr />
                    <div class="total w-100 border-dark d-flex justify-content-around justify-content-lg-between justify-content-md-around">
                        <span class="total checkout-text">Total</span>
                        <span class="checkout-total-price">₹{totalledBy===auth?.user?.email ? total+(cart.length ? shipping : 0) : 0}</span>
                        
                    </div>
                   

                     {cartFromBackend.length > 0 ?    <button class="checkout-btn" onClick={()=>!isUserAddressPresent ? toast.error('please add an address to deliver to') && setTimeout(() => {
                          navigate('/dashboard/user/account-details') 
                        }, 1500) : navigate('checkout')}>Checkout</button>:
                        <button class="checkout-btn">Cart Empty!</button>}    
                </div>
            </div>
        </div>
  </section>
  </>
  )
}

export default CartPage