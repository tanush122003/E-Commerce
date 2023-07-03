import axios from 'axios';
import React, { createContext, useContext, useEffect, useReducer, useState } from 'react'
import { cartReducer } from './Reducers';


const Cart = createContext()

const Context = ({children}) => 
{
    const [products,setProducts] = useState([]);
    const [fixedShipping,setFixedShipping] = useState(40)
    const [localStorageCartItems,setLocalStorageCartItems] = useState(null)
    function shuffle(array) 
    {
      let currentIndex = array.length,  randomIndex;
  
      while (currentIndex != 0) 
      {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex--;
        [array[currentIndex], array[randomIndex]] = [
          array[randomIndex], array[currentIndex]];
      }
    
      return array;
    }

    const loadProducts = async()=>
    {
        const {data} = await axios.get('/product/getAllProducts')
        setProducts(data)
       
        dispatch
        ({
            type:"POPULATE_PRODUCTS",
            payload:data
        })
    }
      
    const [state,dispatch] = useReducer(cartReducer,
    {
      products:products,
      cart : localStorageCartItems ? localStorageCartItems : []
    })

    console.log(state)
     

    useEffect(()=>
    {
      if(JSON.parse(localStorage.getItem('cartItems')))
      {
        setLocalStorageCartItems(JSON.parse(localStorage.getItem('cartItems')))
      }
        loadProducts()
    },[])

    return <Cart.Provider value={{state,dispatch,loadProducts,fixedShipping,shuffle}}>{children}</Cart.Provider>
  
}


export const CartState =()=>
{
    return useContext(Cart)
}

export default Context