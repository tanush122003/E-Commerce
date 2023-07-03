import axios from 'axios'
import React, { useEffect, useState } from 'react'
import moment from 'moment'
import { Link } from 'react-router-dom'
import { useAuth } from '../../../../context/auth/authContext'
import './Order.css'

const UserOrders = () => 
{
  const [orders,setOrders] = useState([])
  const [auth] = useAuth()
  const [productReviewsByThisUser,setProductReviewsByThisUser] = useState()
  const getUserOrders = async()=>
  {  
    const {data} = await axios.get('/user/getUserOrders')
    console.log(data)
    if(data?.userOrders)
    {
      setOrders(data?.userOrders)
    }
  }
  const getUserReviews =async()=>
  {
    const {data} = await axios.get(`/product/getUserReviews`);
    console.log(data?.reviewedProductIDs)
    setProductReviewsByThisUser(data?.reviewedProductIDs)
  }

  useEffect(()=>
  {
    getUserOrders()
    getUserReviews()
  },[])
  
  return (  
   <div class="container">
    <div class="row d-flex justify-content-between " style={{maxHeight:"30rem", overflowY:'scroll'}}>
      <div class="col-5 mb-3 d-flex flex-column" >
      <h3 style={{color:"white"}} className='text-center fw-bold mb-4'>
            Pending Orders
          </h3> 
        {
        orders.length > 0 && orders.map((singleOrder,index)=>
        {
          if(singleOrder.delivery_status==='pending')
          {  
            return   <div class="accordion mb-5" id="accordionExample">
            <div class="accordion-item custom-accordion">
              <h2 class="accordion-header" id={`#heading${index+1}`}>
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index+1}`} aria-expanded="false" aria-controls={`#collapse-${index+1}`} >
                  Order No. {index+1} <span className='ms-auto'>{singleOrder?.products?.length} Product(s)</span>
                 
                   <span className='ms-auto'> Rs.{singleOrder.amount}</span>
                   <span className='ms-auto'>  {moment(singleOrder?.delivery_date).endOf('day').fromNow()}</span>
                </button>
              </h2>
              <div id={`collapse-${index+1}`}  class="accordion-collapse collapse show" aria-labelledby={`#collapse-${index+1}`} data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <div class='d-flex justify-content-around'> 
            <div class='d-flex flex-column  w-100'>
              {singleOrder.products.map((singleProduct)=>{
              return <div className='d-flex justify-content-between align-items-center p-3' style={{width:"100% !important" }}>
                <span className='product-name-in-accordion'>{singleProduct?.name}</span> 
                <span className='product-category-in-accordion'  style={{fontSize:"0.8rem",borderRadius:"5px",border:"1px solid lightgoldenrodyellow",padding:"0.5rem"}}>
                {singleProduct?.category?.name === 'Women-Dresses' && 'Women Dress'}
                  {singleProduct?.category?.name === 'Women-Pants' && 'Women Pant'}
                  {singleProduct?.category?.name === 'Women-Skirts' && 'Women Skirt'}
                  {singleProduct?.category?.name === 'Men-Hoodies' && 'Men Hoodie'}
                  {singleProduct?.category?.name === 'Men-Pants' && 'Men Pant'}
                  {singleProduct?.category?.name === 'Men-Shirts' && 'Men Shirts'}
                  {singleProduct?.category?.name === 'Kids' && 'Kids'}
                  </span>
                </div>
            })} </div>
            </div>
                </div>
              </div>
            </div>
            </div>
          }
        })
      }</div>
      
      <div class="col-5 mb-3"><div>
        <h3 style={{color:"white"}} className='text-center mb-4 fw-bold'>
          Delivered Orders
        </h3>
        
        {
        orders.length > 0 && orders.map((singleOrder,index)=>{
          if(singleOrder.delivery_status==='delivered'){
            return <div class="accordion mb-5" id="accordionExample">
            <div class="accordion-item custom-accordion">
              <h2 class="accordion-header" id={`#heading${index+1}`}>
                <button class="accordion-button" id='bt' type="button" data-bs-toggle="collapse" data-bs-target={`#collapse-${index+1}`} aria-expanded="false" aria-controls={`#collapse-${index+1}`} >
                  Order No. {index+1} <span className='ms-auto'>{singleOrder?.products?.length} Product(s)</span>
                 
                   <span className='ms-auto'> Rs.{singleOrder.amount}</span>
                </button>
              </h2>
              <div id={`collapse-${index+1}`}  class="accordion-collapse collapse show" aria-labelledby={`#collapse-${index+1}`} data-bs-parent="#accordionExample">
                <div class="accordion-body">
                <div class='d-flex justify-content-around'> 
            <div class='d-flex flex-column w-100'>
              {singleOrder.products.map((singleProduct)=>{
              return <div className='d-flex justify-content-between align-items-center p-3' style={{width:"100% !important" }}>
                <span className='product-name-in-accordion'>{singleProduct?.name}</span> 
                <span className='product-category-in-accordion'  style={{fontSize:"0.8rem",borderRadius:"5px",border:"1px solid lightgoldenrodyellow",padding:"0.5rem"}}>
                  {singleProduct?.category?.name === 'Women-Dresses' && 'Women Dress'}
                  {singleProduct?.category?.name === 'Women-Pants' && 'Women Pant'}
                  {singleProduct?.category?.name === 'Women-Skirts' && 'Women Skirt'}
                  {singleProduct?.category?.name === 'Men-Hoodies' && 'Men Hoodie'}
                  {singleProduct?.category?.name === 'Men-Pants' && 'Men Pant'}
                  {singleProduct?.category?.name === 'Men-Shirts' && 'Men Shirts'}
                  {singleProduct?.category?.name === 'Kids' && 'Kids'}
                  </span>
                </div>
            })} </div>
            </div>
                </div>
              </div>
            </div>
            </div>
           
      
          }
        })
      }
      </div>
      </div>
    </div>
   </div>
   
  
    )
  }


export default UserOrders