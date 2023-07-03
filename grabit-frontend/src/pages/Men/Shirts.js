import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/auth/authContext';
import { CartState } from '../../context/cart/Context'
import { toast } from 'react-hot-toast';

const Hoodies = () => 
{

  const {state:{products,cart},dispatch,shuffle} = CartState();
  const [auth] = useAuth()
  const [allWomenProducts,setAllWomenProducts] = useState([])
  const [shirts,setShirts] = useState([])
  const [selectOption,setSelectionOption] = useState()
  const location = useLocation()
  const TOTAL_ITEMS_PER_PAGE = 7
  
  const [filteredProducts,setFilteredProducts] = useState([])
  const [totalPages,setTotalPages] = useState()
  const navigate = useNavigate()

  const setThePageUp = ()=>
  {
    const filterProducts = shirts.slice(0,TOTAL_ITEMS_PER_PAGE)
    setFilteredProducts(filterProducts)
    setTotalPages(Math.ceil(shirts.length/TOTAL_ITEMS_PER_PAGE))
  }

 useEffect(()=>
 {
   setThePageUp()
 },[shirts])

 const handlePageButtonClick = (pageNumber) => 
 {
   const startOffset = TOTAL_ITEMS_PER_PAGE * pageNumber - TOTAL_ITEMS_PER_PAGE;
   const endOffset = TOTAL_ITEMS_PER_PAGE * pageNumber;
   const filterProducts = shirts.slice(startOffset, endOffset);
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
 

  useEffect(()=>{
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
        console.log(shuffle(shirts),'shuffle womenPants')
        setFilteredProducts(shuffle(filteredProducts))
       
      }
      if(selectOption==='Random')
      {
        console.log(shuffle(shirts),'shuffle womenPants')
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
    setShirts(products.filter(p=>p.category.slug==='men-shirts'))
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
  

  return (
    <>

    <section id='bgm' className="container">
     <div id='wd' className="row flex-wrap">
     <h1 id='tagname' className="text-center">Shirts</h1>

      <div className='pagination' style={{ display: "flex", gap: "8px", justifyContent: "center",marginTop:"20px",marginBottom:"20px" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button id='pagi' onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>

        { auth?.user?.email &&  filteredProducts ? filteredProducts.map((singleProduct)=>{
         return  <div className="col-12 col-md-6 col-lg-3 p-3">
         <div className="card w-100 overflow-hidden text-center">
           <img id='img' src={singleProduct.photo} className="card-img-top" alt="..." />
           <div id='shdw' className="card-body border overflow-y-auto">
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
        return   <div  className="col-12 col-md-6 col-lg-3 p-3">
        <div className="card w-100 overflow-hidden text-center">
          <img src={singleProduct.photo} id='img' className="card-img-top" alt="..." />
          <div id='shdw' className="card-body border overflow-y-auto">
             <h4 className="card-title">{singleProduct.name}</h4>
             <h6 className="item-price">&#8377;{singleProduct.price}</h6>
             <p className="card-text text-center">{singleProduct.description}</p>

            <Link id='addtocart' onClick={()=>handleAddToCartWithoutLoggedInUser()} className="btn btn-primary justify-content-center"> 
             <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
          
          </div>
        </div>
      </div>
       })}
    
      </div>
      {totalPages > 1 &&  <div className='pagination' style={{ display: "flex", gap: "8px", justifyContent: "center",marginTop:"30px" }}>
        {[...Array(totalPages)].map((x, i) => (
          <button id='pagi' onClick={() => handlePageButtonClick(i + 1)}>{i + 1}</button>
        ))}
      </div>}
   
      </section> 
      </>
  )
}

export default Hoodies