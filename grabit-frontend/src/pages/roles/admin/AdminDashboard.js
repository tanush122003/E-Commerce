import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/auth/authContext.js' 
import './AdminDashboard.css'

const AdminDashboard = () => 
{
  const [auth,setAuth] = useAuth()
  return (
    <>
    <div id='bgm' class="dashboard-container p-5">
      <div class="row align-items-center justify-content-lg-around flex-column flex-md-row flex-lg-row">
        <div class="col-9 col-md-6 col-lg-4 text-center dashboard-links d-flex flex-md-column flex-lg-column flex-md-row flex-sm-row">
          <NavLink id='goto' to=''><h3 id='select'>Admin Details</h3></NavLink>
          <NavLink id='goto' to='add-product'><h3 id='select'>Add Product</h3></NavLink>
          <NavLink id='goto' to='all-products'><h3 id='select'>All Products</h3></NavLink>
          <NavLink id='goto' to='add-category'><h3 id='select'>Add Category</h3></NavLink>
        </div>
        <div class="col-9 col-md-6 col-lg-7">
          {/* ! tHIS IS  THE COMPONENT THAT GETS CALLED WHEN THE NESTED ROUTE IS HIT */}
          {<Outlet/>}
        </div>
      </div>
    </div>
    </>
  )
}

export default AdminDashboard