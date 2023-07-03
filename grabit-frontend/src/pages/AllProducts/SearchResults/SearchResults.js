import React from 'react'
import { useNavigate,Link } from 'react-router-dom';
import { useSearch } from '../../../context/search/searchContext';
import { useAuth } from '../../../context/auth/authContext';
import { CartState } from '../../../context/cart/Context';
import { toast } from 'react-hot-toast';


const SearchResults = () => 
{
    const [values,setValues] = useSearch();
    const [auth] = useAuth()
    const {state:{products,cart},dispatch} = CartState()
    const navigate = useNavigate()
    const handleAddToCartWithoutLoggedInUser = ()=>
    {
      toast.error('Please login before adding to cart')
      setTimeout(() => 
      {
        navigate('/login');
      }, 2000);
    }
  return (
    <>
   <section id='bgm' className="container">
     <div id='wd' className="row flex-wrap">
       <h1 id='tagname' className="text-center">Search Results</h1>
       { auth?.user?.email &&  values?.results?.length > 0 ? values?.results?.map((singleProduct)=>
       {
         return  <Link className="col-12 col-md-6 col-lg-3 p-3">
         <div id='shdw' className="card w-100 overflow-hidden text-center">
           <img id='img' src={singleProduct.photo} className="card-img-top" alt="..." />
           <div className="card-body border overflow-y-auto">
           <h4 className="card-title">{singleProduct.name}</h4>
             <h6 className="item-price">&#8377;{singleProduct.price}</h6>
             <p className="card-text text-center">{singleProduct.description}</p>
             {auth?.user?.email && cart.some(product=>product._id===singleProduct._id && product?.addedBy === auth?.user?.email) ? 
             <Link id='addtocart' onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:{product:singleProduct,totalledBy:auth?.user?.email}})} className="btn btn-primary justify-content-center"> 
             <i id='addto' className="fa fa-cart-shopping" />Remove Item</Link> : <Link id='addtocart' onClick={()=>dispatch({type:"ADD_TO_CART",payload:{product:singleProduct,addedBy:auth?.user?.email,totalledBy:auth?.user?.email}})} className="btn btn-primary justify-content-center"><i id='addto' className="fa fa-cart-shopping" />Add To Cart</Link>}
           </div>
         </div>
       </Link>
       
       }):values?.results?.map((singleProduct)=>
       {
        return   <Link className="col-12 col-md-6 col-lg-3 p-3">
        <div id='shdw' className="card w-100 overflow-hidden text-center">
          <img id='img' src={singleProduct.photo} className="card-img-top" alt="..." />
          <div className="card-body border overflow-y-auto">
          <h4 className="card-title">{singleProduct.name}</h4>
            <h6 className="item-price">&#8377;{singleProduct.price}</h6>
            <p className="card-text text-center">{singleProduct.description}</p>
            <Link id='addtocart' onClick={()=>handleAddToCartWithoutLoggedInUser()} className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> 
             <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
          </div>
        </div>
      </Link>
       })}

       {/* ! when the search box is emptied using backspace, once there is nothing left in searchBox, it will redirect to all-product. This gives a feeling of reseting to defaults */}

       {!values?.keyword && navigate('/all-products')}
    
    </div>
  </section>
    </>
  )
}


export default SearchResults