import React from "react"
import { getCategoryDetails, getProductsByCategory } from "@/actions/category.action"
import ProductsGrid from "@/components/products-components/ProductsGrid"
import { Product } from "@/app/types/products.model"

export default async function CategoryDetails({ params }: { params: { id: string } }) {
  const { id } = params
  const { data: categoryDetails } = (await getCategoryDetails(id))!
  const { data: products } = (await getProductsByCategory(id))!

  return (
    <div className="container mx-auto ">
    <h1 className="text-start text-4xl py-7 px-4 font-bold">
      {categoryDetails?.name}
    </h1>
    {products?.length === 0 ? (
      <p className='text-center text-2xl py-56 border-2 rounded-2xl shadow bg-white mb-7'>No products are available for this brand right now. Check back later!</p>
    ) : (
    <div className="container mx-auto">
<ProductsGrid
  products={(products ?? []) as Product[]}
  categoryName={categoryDetails?.name ?? "Category"}
            />
      </div>
    )}
  </div>
  )
}
