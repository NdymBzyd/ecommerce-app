import { getCategories } from '@/actions/category.action'
import React from 'react'
import CategoryGridComp from './CategoryGridComp';

export default async function CategoryGrid() {
  const response = await getCategories()
  console.log(response, "response from category grid");
  
  return (
    <>
      <div className="container mx-auto">
        <h1 className="text-start text-4xl tracking-tighter my-7 font-extrabold">All Categories</h1>
        <div>
        <CategoryGridComp category={response?.data}/>
        </div>
      </div>

    </>
  )
}
