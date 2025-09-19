"use client";

import { useEffect, useState } from "react";
import { DotLoader } from "react-spinners";
import OrderTable from "@/components/orders-comps/OrderTable";
import { getUserData } from "@/actions/user.action";
import { UserData } from "@/app/types/user.model";

export default function AllOrdersPage() {
  const [ready, setReady] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchUser() {
      try {
        const userData: UserData = await getUserData();
        setUserId(userData.decoded.id);
      } catch (err) {
        console.error("Failed to get user data:", err);
      } finally {
        setReady(true);
      }
    }

    if (localStorage.getItem("fromCheckout") === "true") {
      localStorage.removeItem("fromCheckout");
      window.location.replace("/thankyou");
    } else {
      fetchUser();
    }
  }, []);

  if (!ready) {
    return (
      <div className='flex flex-col h-screen justify-center items-center'>
        <DotLoader />
        <p className='font-bold text-3xl my-3'>Loading . . .</p>
      </div>
    );
  }

  if (!userId) {
    return (
      <div className="flex flex-col h-screen justify-center items-center">
        <p className="text-red-600 font-bold text-2xl">Unable to load user data.</p>
      </div>
    );
  }

  return <OrderTable userId={userId} />;
}
