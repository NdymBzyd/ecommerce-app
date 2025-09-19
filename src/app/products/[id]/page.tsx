import { getProductsDetails } from '@/actions/products.action';
import ProductDetailsComp from '@/components/products-components/ProductDetailsComp';
import React from 'react'

export default async function ProductDetails({params}:{params:{id:string}}) {
    const {id} = await params;
    // console.log(id,"details");
    const {data: productDetails} = (await getProductsDetails(id))!;

  
  return (
    <div className='container mx-auto'>
      <ProductDetailsComp productDetails={productDetails} />
    </div>
  )
}
