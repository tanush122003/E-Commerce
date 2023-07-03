import React, { useEffect, useState } from 'react'
import './Featured.css'
import axios from 'axios'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast';

const Featured = () => 
{
  const [featuredProducts,setFeaturedProducts] = useState([])
  const getFeaturedProducts = async()=>{
    const {data} = await axios.get('/product/getFeaturedProducts')

    if(data?.featuredProducts)
    {
      setFeaturedProducts(data?.featuredProducts)
    }

    console.log(data)
  }
  const navigate = useNavigate()
  const handleAddToCartWithoutLoggedInUser = ()=>
  {
    toast.error('Please login before adding to cart')

    setTimeout(() => 
    {
      navigate('/login');
    }, 2000);

  }

  useEffect(()=>
  {
    getFeaturedProducts()
  },[])
  return (
   <>
  {/* &lt;&gt; */}
  <section id="largeScreenSlider" class="carousel slide d-none d-md-none d-lg-block p-5" data-ride="carousel">
    <h1 id="tagname" class="text-center">Featured Products</h1>
    <div className="carousel-inner">
      
      <div className="carousel-item active">
        <div className="container">
          <div id="wd" className="row flex-nowrap justify-content-around">
            {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 > 0 && index+1 <=4){
                return <div className="col-12 col-md-6 col-lg-3 p-3">
                {/* ! bootstrap card as one item  */}
                <div className="card w-100 overflow-hidden text-center">
                  <img src={singleProduct.photo} id="img" className="card-img-top" alt="..." />
                  <div className="card-body border overflow-y-auto">
                    <h4 className="card-title">{singleProduct?.name}</h4>
                    <h6 className="item-price">&#8377;{singleProduct?.price}</h6>
                    <p className="card-text text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <Link id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
           
          </div>
        </div>
      </div>

      <div className="carousel-item">
        <div className="container">
          <div className="row flex-nowrap justify-content-around">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 5 && index+1 <=8){
                return <div className="col-12 col-md-6 col-lg-3 p-3">
                {/* ! bootstrap card as one item  */}
                <div className="card w-100 overflow-hidden text-center">
                  <img src={singleProduct.photo} id='img' className="card-img-top" alt="..." />
                  <div className="card-body border overflow-y-auto">
                    <h4 className="card-title">{singleProduct?.name}</h4>
                    <h6 className="item-price">{singleProduct?.price}</h6>
                    <p className="card-text text-center">Lorem ipsum, dolor sit amet consectetur adipisicing elit.</p>
                    <Link id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
            
          </div>
        </div>
      </div>

      <div className="carousel-item">
        <div className="container">
          <div className="row flex-nowrap justify-content-around">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 9 && index+1 <= 13){
                return <div className="col-12 col-md-6 col-lg-3 p-3">
                {/* ! bootstrap card as one item  */}
                <div className="card w-100 overflow-hidden text-center">
                  <img src={singleProduct.photo} id='img' className="card-img-top" alt="..." />
                  <div className="card-body border overflow-y-auto">
                    <h4 className="card-title">{singleProduct?.name}</h4>
                    <h6 className="item-price">{singleProduct?.price}</h6>
                    <p className="card-text text-center">{singleProduct?.description.substring(0,90)}</p>
                    <Link id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
            
          
          </div>
        </div>
      </div>
    </div>
    <a className="carousel-control-prev" data-bs-target="#largeScreenSlider" role="button" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a className="carousel-control-next" data-bs-target="#largeScreenSlider" role="button" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </section>

  {/* ! this carousel will be displayyed on medium devices */}
  <section id="MediumScreenSlider" className="carousel slide d-none d-md-block d-lg-none p-5" data-ride="carousel">
    <h1 id='tagname' className="text-center">Featured products</h1>
    <div className="carousel-inner">
      
      <div className="carousel-item active">
        <div className="container">
          <div className="row flex-nowrap">
           
           
            {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 1 && index+1 <= 2){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden text-center">
                  <img src={singleProduct?.photo} id='img' className="card-img-top" alt="..." />
                  <div className="card-body border border overflow-y-auto">
                    <h4 className="card-title">{singleProduct?.name}</h4>
                    <h6 className="item-price">{singleProduct?.price}</h6>
                    <p className="card-text text-center">{singleProduct?.description}</p>
                    <Link to={`/single-product/${singleProduct._id}`} id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container">
          <div className="row flex-nowrap">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 3 && index+1 <= 4){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden text-center">
                  <img src={singleProduct?.photo} id='img' className="card-img-top" alt="..." />
                  <div className="card-body border overflow-y-auto">
                    <h4 className="card-title">{singleProduct?.name}</h4>
                    <h6 className="item-price">{singleProduct?.price}</h6>
                    <p className="card-text text-center">{singleProduct?.description}</p>
                    <Link to={`/single-product/${singleProduct._id}`} id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
          
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container">
          <div className="row flex-nowrap">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 5 && index+1 <= 6){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden text-center">
                  <img src={singleProduct?.photo} id='img' className="card-img-top" alt="..." />
                  <div className="card-body border overflow-y-auto">
                    <h4 className="card-title">{singleProduct?.name}</h4>
                    <h6 className="item-price">{singleProduct?.price}</h6>
                    <p className="card-text text-center">{singleProduct?.description}</p>
                    <Link to={`/single-product/${singleProduct._id}`} id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
          </div>
        </div>
      </div>
      <div className="carousel-item">
        <div className="container">
          <div className="row flex-nowrap">
          {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
              if(index+1 >= 7 && index+1 <= 8){
                return <div className="col-12 col-md-6 col-lg-3">
                <div className="card w-100 overflow-hidden text-center">
                  <img src={singleProduct?.photo} id='img' className="card-img-top" alt="..." />
                  <div className="card-body border overflow-y-auto">
                    <h4 className="card-title">{singleProduct?.name}</h4>
                    <h6 className="item-price">{singleProduct?.price}</h6>
                    <p className="card-text text-center">{singleProduct?.description}</p>
                    <Link to={`/single-product/${singleProduct._id}`} id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                  </div>
                </div>
              </div>
              }
            })}
          </div>
        </div>
      </div>
    </div>
    <a id='mod' className="carousel-control-prev" data-bs-target="#MediumScreenSlider" role="button" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a id='mod' className="carousel-control-next" data-bs-target="#MediumScreenSlider" role="button" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </section>
  {/* ! this carousel will be displayed on small devices */}
  
  <section id="SmallScreenSlider" className="carousel slide d-block d-md-none d-lg-none p-5" data-ride="carousel">
    <h1 id='tagname' className="text-center ">Featured products</h1>
    <div className="carousel-inner">
    {featuredProducts && featuredProducts.map((singleProduct,index)=>{
              // ! because each row can contain only four cards
          
                return    <div className={`carousel-item ${index+1===1 && 'active'}`}>
                <div className="container">
                  <div className="row flex-nowrap">
                    <div className="col-12 col-md-6 col-lg-3">
                      <div className="card w-100 overflow-hidden text-center">
                        <img src={singleProduct?.photo} id='img' className="card-img-top" alt="..." />
                        <div className="card-body border border overflow-y-auto">
                          <h4 className="card-title">{singleProduct?.name}</h4>
                          <h6 className="item-price">{singleProduct?.price}</h6>
                          <p className="card-text text-center">{singleProduct?.description.substring(0,50)}</p>
                          <Link to={`/single-product/${singleProduct._id}`} id='addtocart' className="btn btn-primary justify-content-center"> <i id='addto' className="fa fa-cart-shopping" /> Add To Cart</Link>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
                
              
            })}
   
     
      
    </div>
    <a id='mod' className="carousel-control-prev" data-bs-target="#SmallScreenSlider" role="button" data-bs-slide="prev">
      <span className="carousel-control-prev-icon" aria-hidden="true" />
      <span className="sr-only">Previous</span>
    </a>
    <a id='mod' className="carousel-control-next" data-bs-target="#SmallScreenSlider" role="button" data-bs-slide="next">
      <span className="carousel-control-next-icon" aria-hidden="true" />
      <span className="sr-only">Next</span>
    </a>
  </section>
</>

  )
}

export default Featured