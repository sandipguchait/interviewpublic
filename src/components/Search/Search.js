import React from 'react';

const Search = ({ setSearchTerm }) => {
  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  }
  return (
    <div className='Search_input_container'>
        <input 
          className='input search-input' 
          inputMode='search' 
          type="search"
          autoComplete='off'
          placeholder='Search articles...'
          aria-label='search articles'
          onChange={handleInputChange}
        />
    </div>
  )
}

export default Search