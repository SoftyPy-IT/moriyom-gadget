"use client";

import { useResetPasswordMutation } from "@/redux/features/auth/authApi";
import { Button, Input } from "@nextui-org/react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { FieldValues, useForm } from "react-hook-form";
import { toast } from "sonner";
import { EyeFilledIcon } from "./EyeFilledIcon";
import { EyeSlashFilledIcon } from "./EyeSlashFilledIcon";
import PasswordIcon from "./PasswordIcon";
import ErrorMessage from "@/components/common/ErrorMessage";

const ResetPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token ");
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  const [error, setError] = useState(null);
  const [resetPassword] = useResetPasswordMutation();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });
  const data = watch();
  const onSubmit = async (data: FieldValues) => {
    const toastId = toast.loading("Resetting password...");
    try {
      const userInfo = {
        newPassword: data.newPassword,
        confirmPassword: data.confirmPassword,
        token: token,
      };

      const res = await resetPassword(userInfo).unwrap();

      if (res.success === true) {
        toast.success(res.message, { id: toastId, duration: 2000 });
        reset();
        router.push("/login");
        setError(null);
      }
    } catch (err: any) {
      setError(
        err?.data?.errorSource.map((err: any) => err.message).join(", "),
      );
      toast.error("Something went wrong", { id: toastId, duration: 2000 });
    }
  };

  return (
    <>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col space-y-4"
      >
        <div className="space-y-4 flex flex-col">
          <div>
            <Input
              label="Password"
              variant="flat"
              defaultValue=""
              radius="sm"
              placeholder="Enter your password"
              className="z-0"
              labelPlacement="outside"
              errorMessage={errors.newPassword?.message?.toString()}
              {...register("newPassword", {
                required: "Please enter your new password",
                minLength: {
                  value: 6,
                  message: "Password must be at least 6 characters",
                },
              })}
              isInvalid={errors.newPassword?.message?.toString() ? true : false}
              startContent={<PasswordIcon className="text-gray-400" />}
              endContent={
                <button
                  className="focus:outline-none text-gray-400"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>

          <div>
            <Input
              label="Confirm Password"
              variant="flat"
              defaultValue=""
              radius="sm"
              placeholder="Confirm your password"
              className="z-0"
              labelPlacement="outside"
              errorMessage={errors.confirmPassword?.message?.toString()}
              {...register("confirmPassword", {
                required: "Please confirm your password",
                validate: (value) =>
                  value === data.newPassword || "Passwords do not match",
              })}
              isInvalid={
                errors.confirmPassword?.message?.toString() ? true : false
              }
              startContent={<PasswordIcon className="text-gray-400" />}
              endContent={
                <button
                  className="focus:outline-none text-gray-400"
                  type="button"
                  onClick={toggleVisibility}
                  aria-label="Toggle password visibility"
                >
                  {isVisible ? <EyeSlashFilledIcon /> : <EyeFilledIcon />}
                </button>
              }
              type={isVisible ? "text" : "password"}
            />
          </div>
          {error && <ErrorMessage errorMessage={error} />}
        </div>

        <div>
          <Button
            isLoading={isSubmitting}
            isDisabled={isSubmitting}
            type="submit"
            className="w-full btn"
          >
            {isSubmitting ? "Resetting Password..." : "Reset Password"}
          </Button>
        </div>
      </form>
    </>
  );
};

export default ResetPasswordForm;
