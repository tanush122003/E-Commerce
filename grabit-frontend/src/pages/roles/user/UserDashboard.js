import React from 'react'
import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../../../context/auth/authContext.js'
import './UserDashboard.css'
import UserAccountDetails from './AccountDetails/UserAccountDetails.js'

const UserDashboard = () => 
{
  const [auth,setAuth] = useAuth()
  return (
    <div id='bgm' class="dashboard-container container-fluid p-5">
      <div class="row align-items-center justify-content-lg-around flex-column flex-md-column flex-lg-column">
        <div class="col-9 col-md-6 col-lg-4 text-center dashboard-links d-flex flex-md-column flex-lg-column flex-md-row flex-sm-row mb-5">
          <NavLink  to='orders'><h3 id='select'>Orders</h3></NavLink>
          <NavLink  to='account-details'><h3 id='select'>Account Details</h3></NavLink>
        </div>
        <div class="col col-lg-12">

       <Outlet/>
        </div>
       
      </div>
    </div>
  )
}

export default UserDashboard