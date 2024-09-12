"use client";

import React, { useRef, useState } from "react";
import { Button } from "@nextui-org/react";
import ErrorMessage from "@/components/common/ErrorMessage";
import { useAppDispatch, useAppSelector } from "@/redux/hooks";
import { toast } from "sonner";
import { useVerifyEmailMutation } from "@/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { setProfile, setUser, TUser } from "@/redux/features/auth/authSlice";
import { useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";

const VerificationForm = () => {
  const tokenFromState = useAppSelector(
    (state) => state.auth.verificationToken,
  );
  const dispatch = useAppDispatch();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  const email = searchParams.get("email");

  const [verifyEmail, { isLoading }] = useVerifyEmailMutation();

  const inputRefs = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ];

  type Otp = {
    0: string;
    1: string;
    2: string;
    3: string;
  };

  const [otp, setOtp] = useState<Otp>({
    0: "",
    1: "",
    2: "",
    3: "",
  });
  const [error, setError] = useState<string | null>("");
  const handleInputChange = (index: number, value: string) => {
    if (value.length === 1 && index < 3) {
      inputRefs[index + 1].current?.focus();
    }
    setOtp({
      ...otp,
      [index]: value,
    });
  };

  const handleVerify = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const enteredOtp = Object.values(otp).join("");

    if (enteredOtp.length < 4) {
      setError("Please enter your OTP to verify your email address");
      return;
    }
    setError("");
  };

  const handleRemoveOtp = (
    e: React.KeyboardEvent<HTMLInputElement>,
    index: number,
  ) => {
    if (e.key === "Backspace" && index > 0) {
      inputRefs[index - 1].current?.focus();
      setOtp({
        ...otp,
        [index]: "",
      });
    }
  };

  const handleSubmit = async () => {
    const toastId = toast.loading("Verifying OTP");

    try {
      const data = {
        token: token || tokenFromState,
        code: Object.values(otp).join(""),
      };
      const res = await verifyEmail(data).unwrap();
      if (res.success) {
        // Step 2: Log the user in via NextAuth using credentials provider

        const nextAuthResponse = await signIn("credentials", {
          redirect: false,
          email: res.data.user.email,
          password: res.data.user.password,
        });

        if (nextAuthResponse?.ok && nextAuthResponse?.status === 200) {
          // Step 3: Update Redux state with user info and token
          const user = verifyToken(res.data.accessToken) as TUser;
          dispatch(setUser({ user, token: res.data.accessToken }));
          dispatch(setProfile(res.data.user));

          toast.success("Logged in successfully", {
            id: toastId,
            duration: 2000,
          });

          setError(null);

          // Redirect to the desired page
          // router.replace("/");
          // router.refresh();
          window.location.href = "/";
        } else {
          throw new Error("NextAuth login failed");
        }
      } else {
        throw new Error("Invalid credentials");
      }
    } catch (err: any) {
      const errorMessage =
        err?.data?.errorSource.map((err: any) => err.message).join(", ") || "";
      setError(errorMessage);
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <div className="">
      <form className="space-y-6" onSubmit={handleVerify}>
        <div className="text-center mt-10">
          <div className="mt-4">
            <p className=" text-gray-700">
              Enter the OTP sent to your email address!
            </p>
            <p className=" font-medium">{email}</p>
          </div>
          <div className="flex justify-center my-5 space-x-5">
            {Array.from({ length: 4 }, (_, index) => (
              <input
                key={index}
                ref={inputRefs[index]}
                type="text"
                maxLength={1}
                value={otp[index as keyof Otp]}
                onChange={(e) => handleInputChange(index, e.target.value)}
                className="input "
                placeholder="*"
                onKeyUp={(e) => handleRemoveOtp(e, index)}
              />
            ))}
          </div>
          <p className="text-gray-500 text-sm text-left">
            This OTP will expire in{" "}
            <span className="font-medium">5 minutes</span>
          </p>
          {error && <ErrorMessage errorMessage={error} />}
        </div>
        <div className="text-center">
          <Button
            isLoading={isLoading}
            isDisabled={isLoading}
            onClick={handleSubmit}
            className="btn w-full"
          >
            {isLoading ? "Verifying ..." : "Verify"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default VerificationForm;
