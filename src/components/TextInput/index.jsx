import './styles.css'
import React from 'react'

const TextInput = ({searchValue, handleChange}) => {
  return (
      
    <input
    placeholder='Type your search'
    className='text-input'
    onChange={handleChange}
    value ={searchValue}
     type="search" />
  )
}

export default TextInput