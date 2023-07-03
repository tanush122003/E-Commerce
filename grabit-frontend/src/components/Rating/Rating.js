import React from 'react'
import {AiFillStar,AiOutlineStar} from 'react-icons/ai'

const Rating = ({rating,onClick,style,singleProductPage}) => 
{
    const arrayOf5Items = [...Array(5)];
    console.log(arrayOf5Items)
    console.log(rating)
    const fontSize = singleProductPage ? "1rem" : "2.5rem"
    return <>
    {
        [...Array(5)].map((_,i)=>(
        <span key={i} onClick={()=>onClick(i) } style={style}>
      
            {rating > i ? (
            <AiFillStar  fontSize={fontSize} />
            ):(<AiOutlineStar fontSize={fontSize}/>)}
        </span>
        ))
    }
   </>
}

export default Rating