import React, { Suspense } from 'react';
import SearchBar from '../components/SearchBar';

const SearchPage = () => {
  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <SearchBar />
      </Suspense>
    </div>
  );
};

export default SearchPage;
