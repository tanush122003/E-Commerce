import React from 'react'
import './Navbar.css'
import { Outlet, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../../context/auth/authContext'
import SearchBox from '../SearchBox/SearchBox'

const Navbar = () => 
{
  const [auth, setAuth] = useAuth();
  const navigate = useNavigate();
  console.log(navigate)

  const logOut = () => 
  {
    setAuth({ ...auth, user: null, token: '' })
    localStorage.removeItem('auth');

    navigate('/login')
    console.log('after navigate')
  }


  return (
    <>
      <header>
      <nav className="navbar navbar-expand-md navbar-dark bg-dark">
          <div className="container-fluid">
            <NavLink className="navbar-brand" to="/"><img className="logo" src={require("../../pages/images/Logo-grabit.png")} alt="..." /></NavLink>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
              <span className="navbar-toggler-icon" />
            </button>
            <div className="collapse navbar-collapse" id="navbarSupportedContent">
              <SearchBox />
              <ul className="navbar-nav align-items-md-center ms-auto mb-lg-0">
                <li className="nav-item dropdown">
                  {auth?.token ? 
                  <a className="btn-group" role="group">
                    <button id="login-btn" type='button' data-bs-toggle="dropdown" aria-expanded="false" className="btn btn-primary dropdown-toggle">{auth?.user.name}</button>
                    <ul className='dropdown-menu'>
                      <li><NavLink className='dropdown-item' to={`/dashboard/${auth?.user.role==='admin'?'admin':'user'}`}>Dashboard</NavLink></li>
                      <li><a style={{"cursor":"pointer"}} className='dropdown-item' onClick={logOut}>Logout</a></li>
                    </ul>
                  </a>
                  : <NavLink className="nav-link active" aria-current="page" to="/login"><button id="login-btn" className="btn btn-primary">Login</button></NavLink>}
                  
                </li>
                <li className="nav-item d-flex align-items-center border border-dark">
                  <NavLink className="nav-link" to="dashboard/cart"><i className="fa-solid fa-cart-shopping fa-2xl" /></NavLink>
                </li>
              </ul>
            </div>
          </div>
        </nav>
  
  
        <nav className="navbar navbar-expand navbar-dark" id="navtab">
              <div className="container-fluid">

                  <div className="collapse d-flex justify-content-between navbar-collapse">
                    <ul className="navbar-nav justify-content-around flex-wrap w-100">
                      <li className="nav-item">
                        <NavLink className="nav-link active" to="/">Home</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/all-products" className="nav-link">All Products</NavLink>
                      </li>
                      <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Women</NavLink>
                        <ul className="dropdown-menu">
                          <li><NavLink to="/women/all-products" className="dropdown-item">All</NavLink></li>
                          <li><NavLink to="/women/dresses" className="dropdown-item">Dresses</NavLink></li>
                          <li><NavLink to="/women/pants" className="dropdown-item">Pants</NavLink></li>
                          <li><NavLink to="/women/skirts" className="dropdown-item">Skirts</NavLink></li>  
                        </ul>
                      </li>
                      <li className="nav-item dropdown">
                        <NavLink className="nav-link dropdown-toggle" to="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">Men</NavLink>
                        <ul className="dropdown-menu">
                          <li><NavLink to="/men/all-products" className="dropdown-item">All</NavLink></li>
                          <li><NavLink to="/men/hoodies" className="dropdown-item">Hoodies</NavLink></li>
                          <li><NavLink to="/men/shirts"className="dropdown-item">Shirts</NavLink></li>
                          <li><NavLink to="/men/pants" className="dropdown-item">Pants</NavLink></li>
                        </ul>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/kids/all-products" className="nav-link">Kids</NavLink>
                      </li>
                      <li className="nav-item">
                        <NavLink to="/contact" className="nav-link">Contact</NavLink>
                      </li>   
                    </ul>
                  </div>
                </div>
            </nav>
      </header>
      <Outlet />
    </>
  )
}

export default Navbar