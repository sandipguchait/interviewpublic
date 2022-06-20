import React, { useState } from 'react';
import SearchResults from './SearchResults';

const Search = ({ setSearchTerm, searchTerm }) => {
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
        {/* <SearchResults 
          searchTerm={searchTerm} 
        /> */}
    </div>
  )
}

export default Search