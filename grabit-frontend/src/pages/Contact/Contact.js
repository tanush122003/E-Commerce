import React from 'react'
import './Contact.css'
import { NavLink } from 'react-bootstrap'

const Contact = () => 
{
  return (
    <section id="contact-page">
      <div id="contact" class="container">
        <div class="row">
          <div class="col-12"><h1 id="nobag" class="text-center contact-title text-bg-dark bg-transparent">Contact Us</h1></div>
        </div>
        <div id="form-container" class="row">
          <div className="col-12 col-md-6 col-lg-6 contactme-pic">
            <img id="contact-image" src={require("../images/contactme-LAPTOP-9GA20CMO.jpg")} alt="" />
          </div>
          <div className="col-12 col-md-6 col-lg-6 contact-form">
            <form id="form" className="d-flex flex-column">
              <label id="Name" htmlFor="name" class="text-bg-dark bg-transparent">Name:</label>
              <input type="text" placeholder="Enter your name" id="name" />
              
              <label id="Email" htmlFor="email" class="text-bg-dark bg-transparent">E-mail:</label>
              <input type="email" placeholder="Enter your E-mail" id="email" />
              
              <label id="Message" htmlFor="message" class="text-bg-dark bg-transparent">Message:</label>
              <textarea type="text" rows={1} id="message" placeholder='Enter your message' defaultValue={""} />
              <button id="submit-btn" type="submit">Submit</button>
            </form>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Contact