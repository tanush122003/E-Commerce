import axios from 'axios'
import React, { useState,useEffect } from 'react'
import toast from 'react-hot-toast'
import {Modal} from 'antd'

const defaultCategoryDetailsObject = 
{
 name: ""
}

const AddCategory = () => 
{
    const [categoryDetails,setCategoryDetails] = useState(defaultCategoryDetailsObject);
    const [allCategories,setAllCategories] = useState([])
    const [showModal,setShowModal] = useState(false)
    const [categoryToEdit,setCategoryToEdit] = useState(null)
    const [categoryNameBeforeUpdate,setCategoryNameBeforeUpdate] = useState("")

    const handleChange = (e) => 
    {
      setCategoryDetails({...categoryDetails,[e.target.name]:e.target.value});
      console.log(categoryDetails);
    }

    useEffect(()=>
    {
        loadCategories();
    },[]);

    const loadCategories = async()=>
    {
        try 
        {
            const {data} = await axios.get('/category/getAllCategories');
            setAllCategories(data)
        } 
        catch (error) 
        {
            console.log(error)    
        }
    }


    const sendPutRequestToCategoryRouteInTheBackend = async(e)=>
    {
      e.preventDefault();
      console.log('send request')
      try 
      {
        console.log("name to send to Backend with put request",categoryNameBeforeUpdate)
        const {data} = await axios.put(`category/updateCategory/${categoryToEdit._id}`,{name:categoryNameBeforeUpdate});
        console.log(data)
        if(data?.error)
        {
          toast.error(data.error)
        }
        else
        {
          loadCategories()
          setShowModal(false)
          toast.success(`${categoryToEdit.name} is updated to ${data.categoryToUpdate.name}`)
          setCategoryToEdit(null)
          setCategoryNameBeforeUpdate('')
        }
        
      } 
      catch (error) 
      {
        console.log(error)
        toast.error('Category update failed. Please try again later');
      }

    }

    const sendPostRequestToCategoryRouteInTheBackend = async()=>
    {
        console.log('sned post request to backend categor route')
        try 
        {
            const {data} = await axios.post('/category/createCategory',categoryDetails)
            if(data?.error)
            {
                toast.error(data.error)
            }
            else
            {
                loadCategories()
                toast.success(`${data.name} is created`)
            }
            
        } 
        catch (error) 
        {
            console.log(error);
            toast.error('create category failed. try again')
        }

    }

    const sendDeleteRequestToCategoryRouteInTheBackend= async(e)=>
    {
      console.log(categoryToEdit)
      try 
      {
        const {data} = await axios.delete(`/category/deleteCategory/${categoryToEdit._id}`)
        if(data?.error)
        {
          toast.error(data?.error);
        }
        else
        {
          loadCategories()
          setShowModal(false);
          toast.success(`${categoryToEdit.name} is deleted`);
          setCategoryToEdit(null)
        }
      } 
      catch (error) 
      {
        console.log(error)
        toast.error(error)
      }
    }
    
  return (
    <div id='bgmi' className='p-5'>   
    <div>
    <div className="row mb-3">
      <div className="col-sm-10 inputCustom">
        <input style={{marginLeft:"9%"}} type="text" name ='name' className="form-control form-control-sm" onChange={handleChange} placeholder="Please enter category name" />
      </div>
      
    </div>
    <div className="row mb-3">
    <div className="col-sm-10 inputCustom button">
      <button style={{width:"50%",marginLeft:"34.5%",marginBottom:'10px'}} id='search' type="button" onClick = {()=>sendPostRequestToCategoryRouteInTheBackend()} className="form-control form-control-sm"> Add Category</button>
    </div>
    
  </div>
  </div>

<div class="row justify-content-around gap-4">
    {
        allCategories?.map((singleCategory)=>{
            return  <div id='detail' key={singleCategory._id} onClick={()=>{
              setShowModal(true);
              setCategoryToEdit(singleCategory)
              setCategoryNameBeforeUpdate(singleCategory.name)
            }} style={{"cursor":"pointer"}} class="col-lg-2 col-md-4 text-center">
            {singleCategory.name}
          </div>

        })
    }

 
 
</div>
  
  <Modal open={showModal} onOk={()=>setShowModal(false)} width={"50rem"} footer={null} onCancel={()=>setShowModal(false)}>
  <div>
    <div className="row mb-3">
      <label htmlFor="colFormLabelSm" className="col-sm-2 col-form-label col-form-label-sm labelCustom">Name</label>
      <div className="col-sm-10 inputCustom modal">
        <input type="text" value={categoryNameBeforeUpdate}  name ='name' className="form-control form-control-sm" onChange={(e)=>setCategoryNameBeforeUpdate(e.target.value)} id="colFormLabelSm" placeholder="Please enter category name" />
      </div>
      
    </div>
    <div className="row mb-3">
    <div className="col-sm-10 inputCustom modal-submit-buttons-container button">
      <button type="button" onClick = {(e)=>sendPutRequestToCategoryRouteInTheBackend(e)} className="form-control form-control-sm modal-submit-button" id="colFormLabelSm"> Update Category</button>
      <button type="button" onClick={(e)=>sendDeleteRequestToCategoryRouteInTheBackend(e)} className="form-control form-control-sm file modal-submit-button" id="colFormLabelSm"> Delete Category</button>
      
    </div>
    
  </div>
  </div>
  </Modal>
  </div>
  )
}

export default AddCategory