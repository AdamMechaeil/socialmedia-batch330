"use client";
import { Loader } from "@mantine/core";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { verify } from "../Services/Auth";

export const useAuth = async () => {
  try {
    if (typeof window != "undefined") {
      const token = localStorage.getItem("socialMedia");
      if (token) {
        const ck = await verify(JSON.parse(token).token);
        return ck;
      } else {
        return false;
      }
    } else {
      return false;
    }
  } catch (error) {
    toast("Something Went Wrong!");
  }
};

export const useAuthWrapper = (Component) => {
  return function AuthProtected() {
    const router = useRouter();
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    useEffect(() => {
      checkAuth();
    }, [isAuthenticated, router]);

    async function checkAuth() {
      try {
        const yesorno = await useAuth();
        if (!yesorno) {
          router.push("/Auth");
        }else{
          router.replace("/Feed");
        }
        setIsAuthenticated(yesorno);
      } catch (error) {
        toast("Something Went Wrong!");
      }
    }

    if (!isAuthenticated) {
      return (
        <div className="fixed left-0 flex justify-center items-center h-[100vh] w-[100vw] z-1">
          <div className="bg-white p-3 rounded-2xl">
            <Loader color="black" size="xl" type="dots" />
          </div>
        </div>
      ); // or a spinner/loading screen
    }

    return <Component />;
  };
};
