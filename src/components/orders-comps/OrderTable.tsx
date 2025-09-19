"use client"
import React, { useEffect, useState } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import { getUserOrders } from "@/actions/user.action"
import { OrderDetails } from "@/app/types/orders.model"

interface Props {
  userId: string
}

export default function OrderTable({ userId }: Props) {
  const [orders, setOrders] = useState<OrderDetails[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchOrders() {
      try {
        setLoading(true)
        const data = await getUserOrders(userId)
        setOrders(Array.isArray(data) ? data : [data]) // ensure array
      } catch (err: unknown) {
        if (err instanceof Error) setError(err.message)
        else setError("Something went wrong")
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [userId])

  if (loading) return <p className="text-center mt-10">Loading orders...</p>
  if (error) return <p className="text-center mt-10 text-red-600">{error}</p>
  if (orders.length === 0)
    return (
      <div className="container mx-auto text-center my-10">
        <h2 className="text-3xl font-bold mb-5">No Orders Yet</h2>
        <Link href="/">
          <Button className="px-6 py-3 text-lg">Shop Now</Button>
        </Link>
      </div>
    )

  return (
    <div className="w-3/4 mx-auto my-10">
      {orders.map((order) => (
        <div key={order._id} className="mb-3 border rounded-lg p-5 bg-slate-50">
          <h3 className="text-xl font-bold mb-3">Order ID: <span className="text-slate-500">{order._id}</span></h3>
          <p className="mb-3">
            Total: <span className="font-semibold">{order.totalOrderPrice} EGP</span>
          </p>
          <p className="mb-3">
            Payment: <span className="font-semibold">{order.paymentMethodType}</span>
          </p>
          <p className="mb-3">
            Status:{" "}
            <Badge
              className={
                order.isPaid
                  ? "bg-green-600 text-white mx-2"
                  : "bg-red-600 text-white mx-2"
              }
            >
              {order.isPaid ? "Paid" : "Not Paid"}
                  </Badge>
                  <Badge
              className={
                order.isDelivered
                  ? "bg-green-600 text-white mx-2"
                  : "bg-amber-600 text-white mx-2"
              }
            >
              {order.isDelivered ? "Delivered" : "On the way"}
            </Badge>
          </p>

          <Table className="my-5 bg-white rounded-md shadow-sm">
            <TableHeader>
              <TableRow>
                <TableHead>Product</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Price</TableHead>
                <TableHead>Quantity</TableHead>
                <TableHead>Subtotal</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {order.cartItems.map((item) => (
                <TableRow key={item._id}>
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <div className="w-20 h-20 relative">
                        <Image
                          src={item.product.imageCover}
                          alt={item.product.title}
                          fill
                          className="object-cover rounded"
                        />
                      </div>
                      <span>{item.product.title.split(" ").slice(0, 2).join(" ")}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-600 text-white">
                      {item.product.category.name}
                    </Badge>
                  </TableCell>
                  <TableCell>{item.price} EGP</TableCell>
                  <TableCell>{item.count}</TableCell>
                  <TableCell>{item.price * item.count} EGP</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
    </div>
  )
}
