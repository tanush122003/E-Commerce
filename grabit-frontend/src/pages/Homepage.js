import React from 'react'
import { useAuth } from '../context/auth/authContext';

const Homepage = () => 
{

    const [auth,setAuth] = useAuth()
  return (
    <div>

        <h1 className='text-center'>Homepage</h1>
        <pre>
            {JSON.stringify(auth,null,4)}
        </pre>

    </div>
  )
}

export default Homepage