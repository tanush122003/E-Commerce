import React, { useEffect,useState } from 'react'
import '../AllProducts/AllProductsPublic.css'
import axios from 'axios'
import { useSearch } from '../../context/search/searchContext'
import { Link, useNavigate } from 'react-router-dom'
import { CartState } from '../../context/cart/Context'
import { useAuth } from '../../context/auth/authContext'
import {toast} from 'react-hot-toast'
import Rating from '../../components/Rating/Rating'

const AllProductsPublic = () => 
{
 const {state:{products,cart},dispatch} = CartState()
 const [auth,setAuth] = useAuth()
 const navigate = useNavigate()

 const TOTAL_ITEMS_PER_PAGE = 8
  
  const [values,setValues] = useSearch();

  const [filteredProducts,setFilteredProducts] = useState([])
  const [totalPages,setTotalPages] = useState()  
  
  const setThePageUp = ()=>
  {
    const filterProducts = products.slice(0,TOTAL_ITEMS_PER_PAGE)
    setFilteredProducts(filterProducts)
    setTotalPages(Math.ceil(products.length/TOTAL_ITEMS_PER_PAGE))
  }

  useEffect(()=>
  {
    setThePageUp()
  },[products])

  const handlePageButtonClick = (pageNumber) => 
  {
    // 1-20, 21-40, 41-60, 61-80
    const startOffset = TOTAL_ITEMS_PER_PAGE * pageNumber - TOTAL_ITEMS_PER_PAGE;
    const endOffset = TOTAL_ITEMS_PER_PAGE * pageNumber;
    const filterProducts = products.slice(startOffset, endOffset);
    setFilteredProducts(filterProducts);
  };
 
  const handleAddToCartWithoutLoggedInUser = ()=>
  {
    toast.error('Please login before adding to cart')

    setTimeout(() => 
    {
      navigate('/login');
    }, 2000);

  }
  
  console.log(auth)
  return (
    <>
   
   <section id='bgm' className="container">
     <div id='wd' className="row flex-wrap">
     <h1 id='tagname' className="text-center">All Products</h1>
     <div className='pagination' style={{ display: "flex", gap: "8px", justifyContent: "center",marginTop:"20px",marginBottom:"20px" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button id='pagi' onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>

       { auth?.user?.email &&  filteredProducts ? filteredProducts.map((singleProduct)=>{
         return  <div className="col-12 col-md-6 col-lg-3 p-3">
         <div id='shdw' className="card w-100 overflow-hidden text-center">
           <img src={singleProduct.photo} id='img' className="card-img-top" alt="..." />
           <div className="card-body border overflow-y-auto">
             <h4 className="card-title">{singleProduct.name}</h4>
             <h6 className="item-price">&#8377;{singleProduct.price}</h6>
             <p className="card-text text-center">{singleProduct.description}</p>

             {
              auth?.user?.email && 
             cart.some(product=>product._id===singleProduct._id && product?.addedBy === auth?.user?.email) 
             ? 
             <Link id='addtocart' onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:{product:singleProduct,totalledBy:auth?.user?.email}})} className="btn btn-primary justify-content-center"> 
             <i id='addto' className="fa fa-cart-shopping" />Remove Item</Link>
              : 
              <Link onClick={()=>dispatch({type:"ADD_TO_CART",payload:{product:singleProduct,addedBy:auth?.user?.email,totalledBy:auth?.user?.email}})} id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" />Add To Cart</Link>  
            }
           
           </div>
         </div>
       </div>
       
       }):filteredProducts.map((singleProduct)=>
       {
        return   <div className="col-12 col-md-6 col-lg-3 p-3">
        <div id='shdw' className="card w-100 overflow-hidden text-center">
          <img src={singleProduct.photo} id='img' className="card-img-top" alt="..." />
          <div className="card-body border overflow-y-auto">
            <h4 className="card-title">{singleProduct.name}</h4>
            <h6 className="item-price">&#8377;{singleProduct.price}</h6>
            <p className="card-text text-center">{singleProduct.description}</p>
            <Link id='addtocart' onClick={()=>handleAddToCartWithoutLoggedInUser()} className="btn btn-primary justify-content-center"> 
             <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
          
          </div>
        </div>
      </div>
       })}
    
    <div className='pagination' style={{ display: "flex", gap: "8px", justifyContent: "center",marginTop:"30px" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button id='pagi' onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>
    </div>
    
  </section>
    </>
  )
}


export default AllProductsPublic