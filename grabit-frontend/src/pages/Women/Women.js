import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate,NavLink } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import { CartState } from '../../context/cart/Context'
import { toast } from 'react-hot-toast';
import '../AllProducts/MenWomenKidsCSS/Styles.css'

const Women = () => 
{
  const {state:{products,cart},dispatch,shuffle} = CartState();
  const [auth] = useAuth()
  const [allWomenProducts,setAllWomenProducts] = useState([])
  const [selectOption,setSelectionOption] = useState()
  const location = useLocation()
  const navigate = useNavigate()

 const TOTAL_ITEMS_PER_PAGE = 7  

 const [filteredProducts,setFilteredProducts] = useState([])
 const [totalPages,setTotalPages] = useState()

 const setThePageUp = ()=>
 {
   const filterProducts = allWomenProducts.slice(0,TOTAL_ITEMS_PER_PAGE)
   setFilteredProducts(filterProducts)
   setTotalPages(Math.ceil(allWomenProducts.length/TOTAL_ITEMS_PER_PAGE))
 }

 useEffect(()=>
 {
   setThePageUp()
 },[allWomenProducts])

 const handlePageButtonClick = (pageNumber) => 
 {
   const startOffset = TOTAL_ITEMS_PER_PAGE * pageNumber - TOTAL_ITEMS_PER_PAGE;
   const endOffset = TOTAL_ITEMS_PER_PAGE * pageNumber;
   const filterProducts = allWomenProducts.slice(startOffset, endOffset);
   setFilteredProducts(filterProducts);
 };
 

  useEffect(()=>
  {
    if(filteredProducts && selectOption)
    {
      console.log('from useEffect')
      if(selectOption==='lowest-to-highest')
      {
        setFilteredProducts(filteredProducts.sort((a,b)=>
        {
          return a.price - b.price
        }))
      }
      if(selectOption==='random')
      {
        console.log(shuffle(allWomenProducts),'shuffle womenPants')
        setFilteredProducts(shuffle(filteredProducts))
       
      }
      if(selectOption==='Random')
      {
        console.log(shuffle(allWomenProducts),'shuffle womenPants')
        setFilteredProducts(shuffle(filteredProducts))
      }
      if(selectOption==='highest-to-lowest')
      {
        setFilteredProducts(filteredProducts.sort((a,b)=>
        {
          return b.price - a.price
        }))
      }
    }
    setSelectionOption('')
  },[selectOption,filteredProducts])


  useEffect(()=>
  {
    setAllWomenProducts(products.filter(p=>p.category.slug==='women-skirts' || p.category.slug==='women-pants' || p.category.slug==='women-dresses' || p.category.slug==='women-all'))
  },[products])


  const handleSelectChange = (e)=>
  {
    if(selectOption==='random')
    {
      console.log('here')
      setSelectionOption('Random')
    }

    if(selectOption==='Random')
    {
      setSelectionOption('random')
    }
    console.log(e.target.value)

    setSelectionOption(e.target.value)
  }

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
     <h1 id='tagname' className="text-center">All Women Products</h1>
     
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
             <Link id='addtocart' onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:{product:singleProduct,totalledBy:auth?.user?.email}})} className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> 
             <i id='addto' className="fa fa-cart-shopping" />Remove Item</Link>
              : 
              <Link id='addtocart' onClick={()=>dispatch({type:"ADD_TO_CART",payload:{product:singleProduct,addedBy:auth?.user?.email,totalledBy:auth?.user?.email}})} className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>  
            }
           
           </div>
         </div>
       </div>
       
       }):filteredProducts.map((singleProduct)=>{
        return   <div className="col-12 col-md-6 col-lg-3 p-3">
        <div id='shdw' className="card w-100 overflow-hidden text-center">
          <img src={singleProduct.photo} id='img' className="card-img-top" alt="..." />
          <div className="card-body border overflow-y-auto">
            <h4 className="card-title">{singleProduct.name}</h4>
            <h6 className="item-price">&#8377;{singleProduct.price}</h6>
            <p className="card-text text-center">{singleProduct.description}</p>
            <Link id='addtocart' onClick={()=>handleAddToCartWithoutLoggedInUser()} className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> 
             <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
          
          </div>
        </div>
      </div>
       })}
      <div className='pagination' style={{ display: "flex", gap: "8px", justifyContent: "center",marginTop:"30px" }}>
        {[...Array(totalPages)].map((x, i) => (
          
          <NavLink 
          
          className={({ isActive }) => (isActive ? 'activelink' : 'inactive')}
          onClick={() => handlePageButtonClick(i + 1)}>
          <button id='pagi'>
          {i + 1}
         
        </button>
          </NavLink>
        ))}
      </div>
      </div>
   
      </section> 
      </>
  )
}

export default Women