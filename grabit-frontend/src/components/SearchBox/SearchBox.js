import axios from 'axios';
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import { useSearch } from '../../context/search/searchContext';

const SearchBox = () => 
{
  const [keyword,setKeyword] = useState();
  const [values,setValues] = useSearch();
  const navigate = useNavigate()
  const handleSubmit = async(e)=>
  {
    e.preventDefault()
    try 
    {
      const {data} = await axios.get(`/product/searchProductsFromSearchBox/${values.keyword}`)
      console.log(data,'coming from the searchbox component in navbar')
      setValues({...values,results : data})
      navigate('/search-results')
    }
    catch (error) 
    {
      console.log(error)
    }
  }
  return (

    <form onSubmit={handleSubmit} className="d-flex ms-md-auto nav-search" role="search">
      <h3>{values.length}</h3>
      <input onChange={e=>setValues({...values,keyword:e.target.value})} value={values.keyword} class="form-control" id="search-tab" style={{borderBottomLeftRadius: '15px', borderBottomRightRadius: '0px', borderTopLeftRadius: '0px', borderTopRightRadius: '0px'}} type="search" placeholder="Product name, Category name, etc." aria-label="Search" />
      <button class="btn btn-outline-light search" id="search" style={{borderTopRightRadius: '15px', borderBottomLeftRadius: '0px',borderBottomRightRadius: '0px', borderTopLeftRadius: '0px'}} type="submit">Search</button>
    </form>
  )
}

export default SearchBox