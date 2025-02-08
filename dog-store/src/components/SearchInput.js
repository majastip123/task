import React from 'react';

const SearchInput = ({ term, onSearch }) => (
  <input
    placeholder="Search..."
    type="text"
    value={term}
    onChange={(e) => onSearch(e.target.value)}
  />
);

export default SearchInput;