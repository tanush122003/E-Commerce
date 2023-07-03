import { Select } from 'antd';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-hot-toast';
import {useNavigate, useParams} from 'react-router-dom'

const {Option} = Select; 
const SingleProductUpdateAdmin = () => 
{ 
  const [allCategories,setAllCategories] = useState([]);
  const [productPicture,setProductPicture] = useState("");
  const [productName,setProductName] = useState("");
  const [category,setCategory] = useState("");
  const [description,setDescription] = useState()
  const [photo,setPhoto] = useState("");
  const [price,setPrice] = useState('')
  const [shipping,setShipping] = useState("")
  const [quantity,setQuantity] = useState()
  const [productId,setProductId] = useState(); 
  const [imageURL,setImageURL] = useState()
  const [isFeatured,setIsFeatured] = useState(false)
  const navigate = useNavigate();
  const params = useParams()
  const getAllCategories = async()=>{
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

  const getSingleProduct = async() =>
  {
    try 
    {
      const {data} = await axios.get(`/product/getSingleProduct/${params.id}`);
      setProductName(data?.name)
      setCategory(data?.category._id)
      setShipping(data?.shipping)
      setProductId(data?._id)
      setPrice(data?.price)
      setImageURL(data?.photo)
      setShipping(data?.shipping)
      setDescription(data?.description)
      setQuantity(data?.quantity)
      setIsFeatured(data?.featured || false)
      console.log(data)
    } 
    catch (error) 
    {
      console.log(error)
    }
  }

  const handleSubmit = async(e)=>
  {
    e.preventDefault();
    try 
    {
      if(!category||!productName||!description || !price || !quantity)
      {
        console.log(productPicture,category,productName,description,price,shipping,quantity)
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

      const {data} = await axios.put(`/product/updateProduct/${productId}`,productData)

      console.log(data)
      if(data?.error)
      {
        toast.error(data?.error?.errno)
      }
      else
      {
        window.location.reload(true)
        toast.success(`${productName} is updated`);
        navigate('/dashboard/admin/all-products',{
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
    getSingleProduct()
    getAllCategories()
  },[])
  
  return (
    <>
    <div>
    {imageURL &&
    <div className='text-center'>
        <img src={imageURL && !productPicture ? imageURL : URL.createObjectURL(productPicture)} className='img img-responsive' height="200px" />
      </div> }
  <div>
    <input type="file"  name='photo' hidden={false} accept='image/*' onChange={(e)=>setProductPicture(e.target.files[0])} />
  </div>
  <div>

  </div>
  
  <div className="row mb-3">
      <Select showSearch size={"large"} onChange={(value)=>setCategory(value)} placeholder={"Choose Category"} value={category}>
        {allCategories?.map((singleCategory)=>{
          return <Option size="large" key={singleCategory._id} value={singleCategory?._id}>{singleCategory?.name}</Option>
        })}
      </Select>
    
  </div>
  <div className='row mb-3'>
  <Select showSearch size={"large"} onChange={(value)=>setShipping(value)} value={shipping ?'Yes':'No'} placeholder={"Shipping?"}>
  <Option  value={0}>No</Option>
  <Option  value={1}>Yes</Option>
      </Select>
  </div>
  <div className='row mb-3'>
  <Select showSearch size={"large"} onChange={(value)=>setIsFeatured(value)} value={isFeatured ?'Yes':'No'} placeholder={"Featured?"}>
  <Option  value={0}>No</Option>
  <Option  value={1}>Yes</Option>
      </Select>
  </div>
  <input type="text" className='form-control mb-3' placeholder='Write a name' value={productName} onChange={e=>setProductName(e.target.value)} />
  <textarea type="text" className='form-control mb-3' placeholder='Enter a product Description' value={description} onChange={e=>setDescription(e.target.value)} />
  <div className="row mb-3">
   
  <input type="number" className='form-control mb-3' placeholder='Enter product price' value={price} onChange={e=>setPrice(e.target.value)} />
  <input type="number" min="1" className='form-control mb-3' placeholder='Enter product quantiy' value={quantity} onChange={e=>setQuantity(e.target.value)} />
    
  </div>
  <div className="col-sm-10 inputCustom button">
      <button onClick={handleSubmit} type="button" className="form-control form-control-sm file" id="colFormLabelSm"> Add Product</button>
    </div>
  
</div>

    </>
  )
}

export default SingleProductUpdateAdmin