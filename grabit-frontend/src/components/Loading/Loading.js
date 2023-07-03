import React, { useEffect, useState } from 'react'
import { useNavigate,useLocation } from 'react-router-dom';
import LoadingGIF from '../../assets/icons/loading/loading.gif'

const Loading = ({path = "login"}) => {

    const [count,setCount] = useState(3);

    const navigate = useNavigate();
    const location = useLocation();

    console.log(location)



    useEffect(()=>{
        const interval = setInterval(()=>{
            setCount((currentCount)=>--currentCount);
        },1000)

        count === 0 && navigate(`/${path}`,{
            state:location.pathname
        });

        return ()=>clearInterval(interval);
    },[count])

  return (
    <h3 className='text-center d-flex justify-content-center align-items-center'>

        <img src={LoadingGIF} alt=""/>
    </h3>
  )
}

export default Loading