import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const UserAccountDetails = () => 
{
  const [currentUser,setCurrentUser] = useState()
  const [address,setAddress] = useState()
  const fetchCurrentUserDetails = async()=>{
    const {data} = await axios.get('/user/getCurrentUserDetails')
    if(data?.user?.address)
    {
      setAddress(data?.user?.address)  
    }
    if(data?.user)
    {
      setCurrentUser(data?.user)
    }
  }
  const navigate = useNavigate()

  console.log(currentUser)

  useEffect(()=>
  {
    fetchCurrentUserDetails()
  },[])
 
  const updateAddress = async(e)=>
  {
    e.preventDefault()
    console.log(address)
    const {data} = await axios.post('/user/updateUserAddress',{address})
    if(data?.success)
    {
      toast.success('Address updated Successfully')
      setTimeout(() => 
      {
        navigate('/dashboard/cart')
      }, 1500);
    }
    if(data?.error)
    {
      toast.error(data?.error)
    }
    console.log(data?.message)
    setAddress('')
  }


  return (
    <form className='w-100'  >
      <div className='mx-auto'>
        <div class='d-flex justify-content-around'>
        <div className='d-flex flex-column justify-content-center'>
        <label for="">
            <span style={{color:'white',fontSize:"30px"}}>Name : {currentUser?.name}</span>
            
        </label>
        <label for="">
            <span style={{color:'white',fontSize:"30px"}}>Email : {currentUser?.email}</span>
            
        </label>
        </div>
        <label for="" className='w-25'>
            <span style={{color:'white',fontSize:"20px"}}>Enter Address :</span>
        <textarea type="text" class="form-control" value={address} onChange={(e)=>setAddress(e.target.value)} />
        <button id='detail' className='btn btn-primary w-50 fs-5 mt-3' style={{margin:'0 20%'}}  onClick={(e)=>updateAddress(e)}>{address ? 'Update Delivery Address' : 'Add Delivery Address'}</button>
        </label>
        </div>
      
          
      </div>
 
      
    </form>
  )
}

export default UserAccountDetails