import ProductItem from '@components/Items/ProductItem';
import React from 'react';

export default function index() {
  return (
    <>
    <div className="h-96 flex items-center justify-center" id="head-bar">
      <div className="flex items-center justify-center" id="head-bar-tint">
        <h1 className='text-5xl font-bold text-white'>Our Products.</h1>
      </div>
    </div>
    <div className="flex justify-center">
      <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
        <ProductItem/>
      </div>
    </div>
    </>
    
    
  )
}
