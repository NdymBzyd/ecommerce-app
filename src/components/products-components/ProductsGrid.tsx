"use client"
import { Product } from '@/app/types/products.model'
import React, { useMemo, useState } from 'react'
import ProductCard from './ProductCard'
import { Input } from '@/components/ui/input';

export default function ProductsGrid({ products }: { products: Product[] }) {

    // console.log(products, "grid products");
    const [search, setSearch] = useState("");

    const filteredProducts = useMemo(() => {
      return products.filter((p) =>
        p.title.toLowerCase().includes(search.toLowerCase())
      );
    }, [search, products]);
  
  return (
<div className="container mx-auto">
      <h1 className="text-start text-4xl tracking-tighter py-7 font-bold">Products</h1>

      <Input
        type="text"
        placeholder="Looking for something specific?"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="mb-6 p-3 bg-white"
      />

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-7 py-10'>
              {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <ProductCard key={product._id} product={product} />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            {`Oops! We couldn't find any products matching your search.`}
          </p>
        )}
    </div>
</div>
  )
}