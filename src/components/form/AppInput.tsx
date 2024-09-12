import { Input } from "@nextui-org/react";
import { Controller, useFormContext } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  required?: boolean;
  variant?: "flat" | "bordered" | "underlined" | "faded";
  size?: "sm" | "md" | "lg";
  description?: string;
};

const AppInput = ({
  type,
  name,
  label,
  disabled,
  placeholder,
  required = true,
  size = "md",
  variant = "bordered",
  description,
}: TInputProps) => {
  const { control } = useFormContext();
  return (
    <div style={{ marginBottom: "10px" }}>
      <Controller
        control={control}
        name={name}
        render={({ field, fieldState: { error } }) => (
          <Input
            {...field}
            type={type}
            id={name}
            size={size}
            disabled={disabled}
            placeholder={placeholder}
            isInvalid={!!error}
            isRequired={required}
            label={label}
            errorMessage={error?.message}
            isClearable
            labelPlacement="outside"
            className="w-full z-0"
            variant={variant}
            radius="sm"
            onClear={() => field.onChange("")}
            description={description}
          />
        )}
      />
    </div>
  );
};

export default AppInput;
