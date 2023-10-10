import React, {useState} from 'react'
import styled from './addCatagory.module.css';
import AddBoxIcon from '@mui/icons-material/AddBox';





function AddCatagory ({catagory, handleCatagoryChange, handleCatagoryChangeContext}) {
  const box = []
  console.log(catagory)
  for (let i=0; i < catagory.length; i++) {
    box.push(<div className={styled.addOne} key={i}>
      <input className={styled.input} 
      onChange={()=> {handleCatagoryChangeContext(i)}}
      />
      </div>)
}
  return (
    <>
      <div className={styled.box} onClick={() => {handleCatagoryChange()}} >
        <div className={styled.addOne} >
          <AddBoxIcon className={styled.icon}/>
          <span className={styled.span}>
            항목추가
          </span>
            
          </div>
      </div>
      <div >{box}</div>
    </>
      
    
  )
}

export default AddCatagory
