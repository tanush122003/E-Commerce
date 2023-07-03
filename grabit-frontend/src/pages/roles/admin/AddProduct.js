import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import { Select } from 'antd';
import {useNavigate} from 'react-router-dom'
import { CartState } from '../../../context/cart/Context';

const {Option}  = Select;


const AddProduct = () => 
{
  const {loadProducts} = CartState()
  const [allCategories,setAllCategories] = useState([]);
  const [productPicture,setProductPicture] = useState("");
  const [productName,setProductName] = useState("");
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState()
  const [photo,setPhoto] = useState("");
  const [price,setPrice] = useState('')
  const [shipping,setShipping] = useState("")
  const [quantity,setQuantity] = useState()
  const [isFeatured,setIsFeatured] = useState(false)
  const navigate = useNavigate();
  const getAllCategories = async()=>
  {
    const {data} = await axios.get('/category/getAllCategories');
    if(data?.error)
    {
      toast.error(data?.error)
    }
    else
    {
      setAllCategories(data)
    }
    console.log(data);
  }

  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    console.log(productPicture,category,productName,description,price,quantity)
    try 
    {
      if(!productPicture||!category||!productName||!description || !price || !quantity)
      {
        toast.error('one or more important fields are missing');
        return;
      }
      const productData = new FormData();
      productData.append('photo',productPicture)
      productData.append('category',category)
      productData.append('name',productName)
      productData.append('description',description)
      productData.append('price',price)
      productData.append('shipping',shipping)
      productData.append('quantity',quantity)
      productData.append('featured',isFeatured)
      console.log(productName,description,price,shipping,quantity,productPicture)
      console.log([...productData])

      const {data} = await axios.post("/product/createProduct",productData)

      console.log(data)
      if(data?.error)
      {
        toast.error(data?.error?.errno)
      }
      else
      {
        toast.success(`${data.name} is created`);
        loadProducts()
        navigate('/dashboard/admin/all-products',
        {
          replace:true
        })
      }
    } 
    catch (error) 
    {
        console.log(error)
        toast.error('Product creation failed. Try again')
    }
  }

  useEffect(()=>
  {
    getAllCategories()
  },[])
  
  return (
    <>
    <div className='admin-detail p-5'>
    {productPicture && <div className='text-center'>
        <img src={URL.createObjectURL(productPicture)} className='img img-responsive' height="200px" />
      </div>}
    <div>
    <input type="file"  name='photo' hidden={false} accept='image/*' onChange={(e)=>setProductPicture(e.target.files[0])} />
  </div>
  <div>

  </div>
  
  <div className="row mb-3">
      <Select showSearch size={"large"} onChange={(value)=>setCategory(value)} placeholder={"- - Choose Category - -"}>
        {allCategories?.map((singleCategory)=>{
          return <Option size="large" key={singleCategory._id} value={singleCategory?._id}>{singleCategory?.name}</Option>
        })}
      </Select>
    
  </div>
  <div className='row mb-3'>
  <Select showSearch size={"large"} onChange={(value)=>setShipping(value)} placeholder={"Shipping ?"}>
  <Option  value={0}>No</Option>
  <Option  value={1}>Yes</Option>
      </Select>
  </div>
  <div className='row mb-3'>
  <Select showSearch size={"large"} onChange={(value)=>setIsFeatured(value)} placeholder={"Featured ?"}>
  <Option  value={0}>No</Option>
  <Option  value={1}>Yes</Option>
      </Select>
  </div>
  <input type="text" className='form-control mb-3' placeholder='Write a name' value={productName} onChange={e=>setProductName(e.target.value)} />
  <textarea type="text" className='form-control mb-3' placeholder='Enter a product Description' value={description} onChange={e=>setDescription(e.target.value)} />
  <div className="row mb-3">
   
  <input type="number" className='form-control mb-3' placeholder='Enter price of the product' value={price} onChange={e=>setPrice(e.target.value)} />
  <input type="number" min="1" className='form-control mb-3' placeholder='Enter quantity' value={quantity} onChange={e=>setQuantity(e.target.value)} />
    
  </div>
  <div>
      <button id='submit' style={{marginTop:"8px",marginLeft:"190px"}} onClick={handleSubmit} type="button" className="form-control form-control-sm"> Add Product</button>
    </div>
  
</div>

    </>
  )
}

export default AddProduct