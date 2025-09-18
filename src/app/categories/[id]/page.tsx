import React from 'react'
import { getCategoryDetails, getProductsByCategory } from '@/actions/category.action'
import ProductCard from './../../../components/products-components/ProductCard';

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: categoryDetails } = await getCategoryDetails(id)
  const { data: products } = await getProductsByCategory(id)

  return (
    <div className="container mx-auto ">
      <h1 className="text-start text-4xl tracking-tighter py-7 font-bold">
        {categoryDetails?.name}
      </h1>
      {products?.length === 0 ? (
        <p className='text-center text-2xl py-56 border-2 rounded-2xl shadow bg-white mb-7'>No products are available for this category right now. Check back later!</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {products.map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      )}
    </div>
  )
}
