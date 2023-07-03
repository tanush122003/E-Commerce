import React from 'react'
import { NavLink } from 'react-router-dom'
import './Footer.css'

const Footer = () => 
{
  return (
    <footer>
   <div>
   <div id="foot" class="row flex-column flex-md-row flex-lg-row text-bg-dark">
                <div id="cardadjust" class="col-lg-3 col-md-6 col-12">
                  <div id="nobor" class="card w-100">
                    <ul class="list-group list-group-flush text-center">
                    <NavLink id="link_page" to="/women/all-products"><h4 id="nobor" class="card-header text-center">Women</h4></NavLink>
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink id="link_page" to="/women/dresses">Dresses</NavLink></li>
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink id="link_page" to="/women/pants">Pants</NavLink></li>
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink id="link_page" to="/women/skirts">Skirts</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div id="cardadjust" class="col-lg-3 col-md-6 col-12">
                  <div id="nobor" class="card w-100">
                    <ul class="list-group list-group-flush text-center">
                    <NavLink id="link_page" to="/men/all-products"><h4 id="nobor" class="card-header text-center">Men</h4></NavLink>
                    <li id="nobor" class="list-group-item text-bg-dark"><NavLink id="link_page" to="/men/shirts">Shirts</NavLink></li>
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink id="link_page" to="/men/pants">Pants</NavLink></li>
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink id="link_page" to="/men/hoodies">Hoodies</NavLink></li>
                    </ul>
                  </div>
                </div>
                <div id="cardadjust" class="col-lg-3 col-md-6 col-12">
                  <div id="nobor" class="card w-100">
                  <ul class="list-group list-group-flush text-center">
                  <NavLink id="link_page" to="/kids/all-products"><h4 id="nobor" class="card-header text-center text-bg-dark">Kids</h4></NavLink>

                    </ul>
                  </div>
                </div>
                <div id="cardadjust" class="col-lg-3 col-md-6 col-12">
                  <div id="nobor" class="card w-100">
                    <h4 id="nobor" class="text-center card-header">Links</h4>
                    <ul class="list-group list-group-flush text-center">
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink id="link_page" to="/">Home</NavLink></li>
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink to="/Login" id="link_page" >Login</NavLink></li>
                      <li id="nobor" class="list-group-item text-bg-dark"><NavLink to="/contact" id="link_page">Contact</NavLink></li>
                    </ul>
                  </div>
                </div>
            </div>
            <div id="foot" class="row d-flex justify-content-center text-bg-dark">
                <hr id="hori"></hr>
                <div id="copyright" class="col-lg-6 col-md-6 col-sm-12 d-flex justify-content-center">
                    <span>Copyright &copy;Grabit 2022-23</span>
                </div>
            </div>
        </div>

    </footer>
  )
}

export default Footer