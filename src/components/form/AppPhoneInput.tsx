import { useFormContext, Controller } from "react-hook-form";
import "react-phone-number-input/style.css";
import PhoneInput from "react-phone-number-input";
import "react-phone-number-input/style.css"; // Import PhoneInput CSS
import cn from "classnames"; // Import classnames library for conditional class application

type TPhoneInputProps = {
  name: string;
  label?: string;
  disabled?: boolean;
  placeholder?: string;
  international?: boolean;
  countryCallingCodeEditable?: boolean;
};

const AppPhoneInput = ({
  name,
  label,
  disabled,
  placeholder,
  international,
  countryCallingCodeEditable = true,
}: TPhoneInputProps) => {
  const { control } = useFormContext();

  return (
    <div className="mb-4">
      <Controller
        name={name}
        control={control}
        render={({ field, fieldState: { error } }) => (
          <div className="flex flex-col">
            {label && (
              <label
                htmlFor={name}
                className="mb-2 text-sm text-gray-700 font-medium"
              >
                {label}
              </label>
            )}
            <PhoneInput
              {...field}
              id={name}
              placeholder={placeholder}
              disabled={disabled}
              defaultCountry="BD"
              international={international}
              countryCallingCodeEditable={countryCallingCodeEditable}
              className={cn(
                "w-full mt-1 px-3 py-2 border-2 border-gray300 bg-[#f9fafb] rounded-md shadow-sm focus:outline-none focus:ring-1 focus:ring-blue-500",
                {
                  "border-red": error,
                }
              )}
            />
            {error && (
              <p className="mt-2 text-sm text-red-500">{error.message}</p>
            )}
          </div>
        )}
      />
    </div>
  );
};

export default AppPhoneInput;
