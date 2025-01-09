"use client";

import { useEffect } from "react";
import { NextUIProvider } from "@nextui-org/react";
import { useAppDispatch } from "@/redux/hooks";
import { useGetStorefrontDataQuery } from "@/redux/features/storefront/storefront.api";
import { setStorefrontData } from "@/redux/features/storefront/storeSlice";
import { useGetProfileQuery } from "@/redux/features/auth/authApi";
import { setProfile, logout } from "@/redux/features/auth/authSlice";
import ServerErrorMessage from "@/components/common/ServerErrorMessage";
import Preloader from "@/components/common/Preloader";

const NextuiProvider = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  const {
    data: storefrontData,
    error: storefrontError,
    isLoading: storefrontLoading,
    isSuccess: storefrontSuccess,
  } = useGetStorefrontDataQuery(undefined);

  const {
    data: profile,
    isSuccess: profileSuccess,
    error: profileError,
  } = useGetProfileQuery(undefined) as any;

  useEffect(() => {
    if (profileSuccess && profile?.data) {
      dispatch(setProfile(profile.data));
    }
  }, [dispatch, profileSuccess, profile]);

  useEffect(() => {
    if (profileError?.data?.message === "jwt expired") {
      dispatch(logout());
    }
  }, [profileError, dispatch]);

  useEffect(() => {
    if (storefrontSuccess && storefrontData) {
      dispatch(setStorefrontData(storefrontData as any));
    }
  }, [storefrontSuccess, storefrontData, dispatch]);

  if (storefrontLoading) return <Preloader />;
  if (storefrontError) return <ServerErrorMessage />;

  return <NextUIProvider>{children}</NextUIProvider>;
};

export default NextuiProvider;
