"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { changeUserPassword, PasswordChange } from "@/actions/user.action";


export default function SettingsPage() {
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const { register, handleSubmit, watch, formState: { errors } } = useForm<PasswordChange>();
  

  async function onSubmit(values: PasswordChange) {
    setIsLoading(true);
    setErrorMessage(null);
    setSuccessMessage(null);

    try {
      await changeUserPassword(values);
      setSuccessMessage("Password changed successfully!");
    } catch (error: unknown) {
      if (error instanceof Error) {
        setErrorMessage(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Card className="w-1/4 mx-auto my-40 bg-gradient-to-br from-slate-600 to-pink-800 shadow-lg">
      <div className="px-10 text-black">
        <h2 className="text-3xl font-bold my-5 text-slate-50">Change Password</h2>
        {errorMessage && <p className="text-red-600">{errorMessage}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="password"
            placeholder="Current Password"
            className="p-5 my-5 bg-blue-50"
            {...register("currentPassword", { required: "Current password is required." })}
          />
          {errors.currentPassword && <p className="text-red-600">{errors.currentPassword.message}</p>}

          <Input
            type="password"
            placeholder="New Password"
            className="p-5 my-5 bg-blue-50"
            {...register("Password", { required: "New password is required." })}
          />
          {errors.Password && <p className="text-red-600">{errors.Password.message}</p>}

          <Input
            type="password"
            placeholder="Confirm New Password"
            className="p-5 my-5 bg-blue-50"
            {...register("rePassword", {
              required: "Please confirm your new password.",
              validate: (val) => val === watch("Password") || "Passwords do not match",
            })}
          />
          {errors.rePassword && <p className="text-red-600">{errors.rePassword.message}</p>}

          <Button type="submit" disabled={isLoading} className="px-7 py-5 hover:bg-slate-900 hover:text-white">
            {isLoading ? "Updating..." : "Change Password"}
          </Button>
        </form>
      </div>
    </Card>
  );
}
