import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import { CartState } from '../../context/cart/Context'

const CheckoutSecondVersion = () => 
{
    const {state:{cart,total},fixedShipping,dispatch} = CartState();
    const [auth] = useAuth()
    const [cartDetailsFromBackend,setCartDetailsFromBackend] = useState()
    const [finalOrder,setFinalOrder] = useState()
    const [boolSwitch,setBoolSwitch] = useState(false)
    const navigate = useNavigate();
    const [count,setCount] = useState(0)
   
    const handleNo = () =>
    {
        toast.success('Please continue your shopping')
        navigate('/all-products')
    }

    const createOrder = (total,shipping)=>
    {
     console.log('createOrder')
     const order = 
     {
        user:auth?.user?.email,
        cart : cartDetailsFromBackend,
        amount : total + shipping
     }

     console.log(order)

     setFinalOrder(order)     
  
    }
    
    const sendRequestToBackendToPlaceOrder = async(final_order)=>
    {
        if(!final_order)
        {
            return
        }
    
       try 
       {
        const {data} = await axios.post(`/user/placeOrder/${auth?.user?.email}`,final_order)
        console.log(data)

        if(!data?.orderPlaced)
        {
           return toast.error('an error occured please try later');
        }
        else
        {
            toast.success('Your order has been placed successfully');
           
           
            dispatch
            ({
                type:"REMOVE_ALL_CART_ITEMS",
                payload:JSON.parse(localStorage.getItem('cartItems')).filter((singleProduct)=>{
                    return singleProduct?.addedBy!==auth?.user?.email && singleProduct
                }).filter((x)=>{
                    return x!==undefined
                  })
            })
            setTimeout(() => {
                navigate('/dashboard/user/orders')
            }, 2000);
        }
       } 
       catch (error) 
       {
        console.log(error)
       }
       setFinalOrder(null)
    }

    const getCurrentUserCartDetails = async()=>
    {
        const {data} = await axios.get(`/user/getCartDetails/${auth?.user?.email}`)

        if(!data?.error)
        {
            setCartDetailsFromBackend(data?.cart)
            return data
        }
        else
        {
            console.log(data?.error)
        }
        
    }
    
    console.log(cartDetailsFromBackend,'cartDetails from backend')
    
    useEffect(()=>
    {
        getCurrentUserCartDetails()
    },[cart])

    
    const placeOrder = (total,shipping)=>
    {
         getCurrentUserCartDetails()
         createOrder(total,shipping)   
    }
    

    useEffect(()=>
    {
        sendRequestToBackendToPlaceOrder(finalOrder)
    },[finalOrder])
    
  return (
    <>
    <div id='bgm' className='d-flex flex-column justify-content-center gap-3 fs-3 p-5'>
        <button id="select"  style={{width:"30%",margin:"0 auto"}} onClick={()=>placeOrder(total,fixedShipping)}>Place Order</button>
        <button id="select"  style={{width:"30%",margin:"0 auto"}} onClick={()=>navigate('/dashboard/cart')} >Edit Cart</button>
        <button  id="select" style={{width:"30%",margin:"0 auto"}} onClick={handleNo} >No. I want to keep shopping!</button>
    </div>
    </>
  )
}

export default CheckoutSecondVersion