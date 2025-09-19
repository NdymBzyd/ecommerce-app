"use client"
import React from 'react'
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
  } from "@/components/ui/table"
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useCart } from '@/app/Context/CartContext';
import Image  from 'next/image';
import Link from 'next/link';
import { removeFromCart, updateItemInCart } from '@/actions/cart.action';
import { Trash } from 'lucide-react';


export default function CartTable() {

    const {cartDetails, fetchCart} = useCart()

          async function handleRemoveCartItem(productId: string) {
            const response = await removeFromCart(productId)
            console.log(response, "response from remove cart item");
            await fetchCart()
          }
      
          async function handleUpdateCartItem(productId: string , count: number) {
            const response = await updateItemInCart(productId,count)
            console.log(response, "response from update cart item");
            await fetchCart()
          }
      
  return (
    <>
      {cartDetails?.numOfCartItems === 0 ? (
        <div className="container mx-auto">
        <h1 className="text-start text-4xl tracking-tighter my-7 font-bold">Your Cart</h1>
          <p className="text-start text-xl text-slate-600 my-5">Your cart is empty. You can add items from either the home page or the products page. Happy Shopping!</p>
          <div>
            <Link href='/'>
            <Button className='text-center text-3xl w-full p-8'>Check out our collections here!</Button>
            </Link>
        </div>
        </div>
      
      ) : (
            <div className='w-3/4 mx-auto'>
            <Table className='my-16 bg-slate-100  rounded-md'>
  <TableHeader>
    <TableRow>
      <TableHead className="text-center p-6" colSpan={2} >Product</TableHead>
      <TableHead className="text-center p-6">Price</TableHead>
      <TableHead className="text-center p-6">Quantity</TableHead>
      <TableHead className="text-center p-6">Subtotal</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {cartDetails?.data.products.map((product) => (
        <TableRow key={product._id}>
        <TableCell className='text-center p-6 flex flex-col md:flex-row items-center gap-3 justify-center'>
          <div className='w-32 h-32 relative'>
          <Link href={`/products/${product.product._id}`}>

            <Image className='object-cover' fill sizes='(max-width:768px) 100vw , (max-width:1200px) 50vw , 25vw' src={product.product.imageCover} alt={product.product.title} />
            </Link>
            </div>
        </TableCell>
        <TableCell>
            <div>
              <h3 className='text-lg'>{product.product.title.split(" ").slice(0,4).join(" ")}</h3>
              <Badge className='bg-green-600 text-white'>{product.product.category.name}</Badge>
            </div>
        </TableCell>
        <TableCell className='text-center p-6  text-[14px]'>{product.price} EGP</TableCell>
        <TableCell className='text-center p-6  text-[14px]'>
          <div className="flex flex-col items-center">
            <div className="flex items-center justify-center p-3 gap-3">

            {product.count === 1 ? (
        <Button
          onClick={() =>
            handleUpdateCartItem(product.product._id, product.count - 1)
          }
          className="border-1 border-slate-500 rounded-md px-3 py-1 text-sm bg-white text-black hover:text-white"
        >
          <Trash />
        </Button>
      ) : (
        <Button
          onClick={() =>
            handleUpdateCartItem(product.product._id, product.count - 1)
          }
          className="border-1 border-slate-500 rounded-md px-3 py-1 text-sm bg-white text-black hover:text-white"
        >
          -
        </Button>
      )}

      <p>{product.count}</p>

      <Button
        onClick={() =>
          handleUpdateCartItem(product.product._id, product.count + 1)
        }
        className="border-1 border-slate-500 rounded-md px-3 py-1 text-sm bg-white text-black hover:text-white"
      >
        +
      </Button>
    </div>
    <div>
      <Button
        onClick={() => handleRemoveCartItem(product.product._id)}
        className="border-1 border-red-600 rounded-md text-sm px-6 bg-red-600 text-white hover:bg-red-900"
      >
        Remove
      </Button>
    </div>          
</div>
        </TableCell>
        <TableCell className='text-center p-6  text-[14px]'>{product.price * product.count} EGP</TableCell>
        </TableRow>)
    )}
    <TableRow>
        <TableCell className='text-center p-6  text-xl'>Total Price</TableCell>
        <TableCell className='text-center p-6  text-xl' colSpan={3}>{cartDetails?.data.totalCartPrice} EGP</TableCell>
            <TableCell className='text-center p-6'>
            <Link href='/checkout' >
              <Button className='px-7 py-5 cursor-pointer'>               
                Checkout
              </Button></Link>
        </TableCell>

    </TableRow>
  </TableBody>
</Table>
    </div>

      )}
    </>
  )
}
