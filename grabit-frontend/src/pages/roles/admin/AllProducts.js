import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useAuth } from '../../../context/auth/authContext';
import {Link, useNavigate} from 'react-router-dom'
import { toast } from 'react-hot-toast';

const AllProducts = () => 
{
  const [auth,setAuth] = useAuth();
  const [products,setProducts] = useState([])
  const navigate = useNavigate()
  const loadProducts = async()=>
  {
    const {data} = await axios.get('/product/getAllProducts')
    console.log(data)
    setProducts(data)
  }

  const sendDeleteRequestToBackendToDeleteProduct = async(productId)=>
  {
    let answer = window.confirm('Do you really want to delete this product?');
    if(!answer)
    {
      return;
    }

    try 
    {
      const {data} = await axios.delete(`/product/deleteProduct/${productId}`);
      toast.success(`product deleted successfully`);
      navigate('/dashboard/admin/all-products');
      loadProducts()
      window.location.reload(true)
      
    } 
    catch (error) 
    {
      console.log(error);
      toast.error('delete failed. try again')
    }
  }

  useEffect(()=>
  {
    loadProducts()
  },[])
  return (
    <>
    <h2 style={{color:"white"}} className='text-center'>All Products : {products.length}</h2>
    <div id='bgmi' className='text-center' style={{overflowY:"scroll"}}>
    {products?.map((singleProduct)=>{
      return <div><Link to={`/dashboard/admin/product/${singleProduct._id}`}>
        
       <div>
            <div style={{width:"4rem",marginLeft:"46.5%"}}>
              <img className='img-fluid' src={singleProduct.photo} style={{width:"100%"}}/>
            </div>
       </div>
       <div id='detail' style={{marginLeft:"42.4%"}} className='mt-2'>
            Product details
       </div>
       </Link>
       <button id='dele' className='mb-5' onClick={()=>sendDeleteRequestToBackendToDeleteProduct(singleProduct._id)}>Delete Product</button>

      </div>
    })
    
    }
    </div>

    </>
  )
}

export default AllProducts

