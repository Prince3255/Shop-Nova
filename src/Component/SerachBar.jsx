import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { FiSearch } from 'react-icons/fi';
import { Search } from '../Pages';

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    navigate(`/search?query=${encodeURIComponent(searchTerm)}&page=1&country=US&sort_by=RELEVANCE&product_condition=ALL&is_prime=false`)
  };

  return (
    
    <form onSubmit={handleSubmit} autoComplete="off" className="p-2 text-white focus-within:text-gray-600 w-full">
      <label htmlFor="search-field" className="sr-only">
        Search all files
      </label>
      <div className="flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="size-3 vv:size-5 ml-4" />
        <input
          name="search-field"
          autoComplete="off"
          id="search-field"
          className="flex-1 bg-transparent outline-none text-sm vv:text-base w-full text-white px-2 py-[0.2rem]"
          placeholder="Search"
          type="search"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
    </form>
  );
};

export default SearchBar