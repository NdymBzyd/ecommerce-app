import { getCategories } from '@/actions/category.action'
import React from 'react'
import CategorySliderComp from './CategorySliderComp';

export default async function CategorySlider() {
  const response = await getCategories()
  console.log(response, "response from category slider");
  


  return (
    <>
    <CategorySliderComp category={response?.data}/>
    </>
  )
}
