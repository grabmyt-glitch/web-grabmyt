"use client";

import { useEffect } from "react";
import { useAppDispatch } from "./hooks";
import { setCurrentUser } from "./slices/authSlice";
import { getUserFromCookie } from "@/utils/authCookie";

export default function AuthBootstrap() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    const cookieUser = getUserFromCookie();
    if (cookieUser) {
      dispatch(setCurrentUser(cookieUser));
    }
  }, [dispatch]);

  return null;
}

