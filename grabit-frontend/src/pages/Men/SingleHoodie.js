import React from 'react'
import './Men.css'
const SingleHoodie = () => 
{
  return (
    <div className="col-12 col-md-6 col-lg-3 single-product mb-5">
        <div className="card w-100 overflow-hidden">
          <img src="../imgs/men/hoodies/men-hoodies-2-MenGreyWeirdly_AwesomeFleeceHoodedSweatshirtw.webp" className="card-img-top" alt="..." />
          <div className="card-body   overflow-y-auto">
            <h3 className="item-price">$50</h3>
            <h5 className="card-title">Men Printed Fleece Hooded Sweatshirt</h5>
            <p className="card-text">Printed sweatshirt has a hooded, 2 kangaroo pocket pockets, long sleeves, closure, ribbed hem</p>
            <a href="#" className="btn btn-primary d-flex justify-content-around align-items-center w-50 mx-auto"> <i className="fa fa-cart-shopping" /> Add To Cart</a>
          </div>
        </div>
      </div>
  )
}

export default SingleHoodie