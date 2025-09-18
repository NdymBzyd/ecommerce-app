import { getProducts } from '@/actions/products.action'
import ProductsGrid from '@/components/products-components/ProductsGrid'
import React from 'react'

export default async function ProductsPage() {

  const {data : products} = await getProducts()


  return (
    <div className='mb-7'>
        <ProductsGrid products={products}/>
    </div>
  )
}
