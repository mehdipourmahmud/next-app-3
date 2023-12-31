import { categoryFilters } from '@/constants';
import Link from 'next/link';
import React from 'react';

const Categories = ({ setSelectedCategory }) => {
  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  return (
    <div className='flex gap-5 overflow-auto snap-x py-2 custom-scrollbar'>
      {categoryFilters.map((category) => (
        <button
          key={category}
          className='px-4 py-2 rounded-md whitespace-nowrap inline-block scroll-snap-align-start'
          onClick={() => handleCategoryClick(category)}
        >
          {category}
        </button>
      ))}
    </div>
  );
};

export default Categories;
