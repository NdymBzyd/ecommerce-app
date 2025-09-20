import { getBrandDetails, getProductsByBrand } from '@/actions/brand.action'
import { Product } from '@/app/types/products.model'
import ProductCard from '@/components/products-components/ProductCard'
import ProductsGrid from '@/components/products-components/ProductsGrid'
import React from 'react'


export default async function BrandDetails({ params }: { params: { id: string } }) {

  const { id } = params
  const { data: brandDetails } = (await getBrandDetails(id))!
  const { data: products } = (await getProductsByBrand(id))!


  return (
    <div className="container mx-auto ">
      <h1 className="text-start text-4xl py-7 px-4 font-bold">
        {brandDetails?.name}
      </h1>
      {products?.length === 0 ? (
        <p className='text-center text-2xl py-56 border-2 rounded-2xl shadow bg-white mb-7'>No products are available for this brand right now. Check back later!</p>
      ) : (
        <div className="container mx-auto">
        <ProductsGrid
          products={(products ?? []) as Product[]}
          categoryName={brandDetails?.name ?? "Category"}
        />
            </div>
        
      )}
    </div>
  )
}
