"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { DotLoader } from "react-spinners";

export default function AllOrdersPage() {
  const router = useRouter();
  const [ready, setReady] = useState(false)

  useEffect(() => {
    if (localStorage.getItem("fromCheckout") === "true") {
      localStorage.removeItem("fromCheckout"); // clear flag
      router.replace("/thankyou");
    } else {
      setReady(true)
    }
  }, [router]);

  if (!ready) {
    return (
      <>
          <div className='flex flex-col h-screen justify-center items-center'>
        <DotLoader />
        <p className='font-bold text-3xl my-3'>Loading . . .</p>
        </div>
      </>
    );
  }

  return (
    <div>All User Orders</div>
  )
}
