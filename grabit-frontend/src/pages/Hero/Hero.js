import React from 'react'
import './Hero.css'

const Hero = () => 
{
  return (
    <section id="bg" class="container-fluid">
    <div class="bg-dimmed">    
      <div>
        <img class="slo-logo" src={require("../images/Logo-grabit.png")} alt='...'/>
        <p id="slo" class="text-center">Try it ! Like it ?<br />Then what are you waiting for ? Grab it !!!</p>
      </div>
    </div>
</section>

  )
}

export default Hero