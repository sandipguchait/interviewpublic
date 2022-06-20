import React from 'react';
import SearchResults from './SearchResults';

const Search = () => {
  return (
    <div className='Search_input_container'>
        <input 
          className='input search-input' 
          inputMode='search' 
          type="search"
          autoComplete='off'
          placeholder='Search articles...'
          aria-label='search articles'
        />
    </div>
  )
}

export default Search