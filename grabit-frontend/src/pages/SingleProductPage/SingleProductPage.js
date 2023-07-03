import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import './SingleProductPage.css'
import { toast } from 'react-hot-toast';
import Rating from '../../components/Rating/Rating';
import { useAuth } from '../../context/auth/authContext';
import { CartState } from '../../context/cart/Context';


const SingleProductPage = () => 
{
    const params = useParams();
    const {state:{cart},dispatch} = CartState()
    const [singleProduct, setSingleProduct] = useState({})
    const [auth] = useAuth();
    const [thisProductReviews, setThisProductReviews] = useState([])
    const id = params.id;
    const location = useLocation()
    const loadSingleProduct = async () => 
    {
        const { data } = await axios.get(`/product/getSingleProduct/${id}`)
        console.log(data)
        setSingleProduct(data)
    }

    const navigate = useNavigate()

    const getSingleProductReviews = async () => 
    {
        const { data } = await axios.get(`/product/getSingleProductReviews/${id}`);
        console.log(data)
        if (data?.reviews) 
        {
            setThisProductReviews(data?.reviews)
        }
        else
        {
            toast.info("This Product has no reviews")
        }
    }

    useEffect(() => 
    {
        loadSingleProduct()

    }, [])

    useEffect(() =>
    {
        loadSingleProduct()

    }, [])

    const handleAddToCartWithoutLoggedInUser = ()=>
    {
        toast.error('Please login before adding to cart')
        setTimeout(() => 
        {
          navigate('/login',{state:location.pathname});
        }, 2000);
    
      }


    useEffect(() => 
    {
        getSingleProductReviews()
    }, [singleProduct])
    
    return (
        <div className='container'>
            <div class="row">
                <div class="col-12 col-md-4 col-lg-4 text-center">
                    <div class="single-product-img-container">
                        <img src={singleProduct?.photo} alt="" className='w-100' />
                    </div>
                </div>
                <div class="col-12 col-md-4 col-lg-4 text-center d-flex flex-column justify-content-center">

                    <p className='product-name'>{singleProduct?.category?.name}</p>
                    <p className='product-name'>{singleProduct?.name}</p>
                    <p>{singleProduct?.description}</p>
                </div>
                <div class="col-12 col-md-4 col-lg-4 text-center d-flex flex-column justify-content-center border border-dark"  >
                    {singleProduct?.name}

                    {thisProductReviews && thisProductReviews.map((singleReview) => {
                        return <div style={{ "overflowY": "scroll", maxHeight: "20rem" }} >
                            <div className='d-flex justify-content-between w-100 border border-dark mx-auto'  >
                                <span className='fw-bold fs-5'>{singleReview?.addedBy?.name}</span>
                                <span className='border border-dark'> <Rating rating={singleReview.rating} style={{ cursor: 'pointer' }} singleProductPage={true} /></span>
                            </div>

                            <div>

                                <p className='w-100 text-start pt-2 pb-2 mx-auto border border-dark'>{singleReview?.reviewText}</p>
                            </div>
                        </div>
                    })}
                </div>
                {
              auth?.user?.email 
              ?
             cart.some(product=>product._id===singleProduct._id && product?.addedBy === auth?.user?.email) 
             ? 
             <Link onClick={()=>dispatch({type:"REMOVE_FROM_CART",payload:{product:singleProduct,totalledBy:auth?.user?.email}})} className="btn btn-primary d-flex justify-content-center align-items-center fs-4 gap-5 mx-auto"> 
             <div className='d-flex justify-content-center align-items-center gap-5'>
                <i className="fa fa-cart-shopping" />
                <span> Remove FROM Cart</span></div>
                </Link>
              : 
              <Link onClick={()=>dispatch({type:"ADD_TO_CART",payload:{product:singleProduct,addedBy:auth?.user?.email,totalledBy:auth?.user?.email}})} className="btn btn-primary d-flex justify-content-center align-items-center fs-4 gap-5 mx-auto"> <i className="fa fa-cart-shopping" /> <span>Add To Cart</span></Link>  
            : <Link onClick={()=>handleAddToCartWithoutLoggedInUser()} className="btn btn-primary d-flex justify-content-center align-items-center fs-4 gap-5 mx-auto"> <i className="fa fa-cart-shopping" /> <span>Add To Cart</span></Link>  }
            </div>
        </div>
    )
}

export default SingleProductPage