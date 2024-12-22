"use client";

import { FC, useCallback, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EyeIcon, EyeOffIcon } from "lucide-react";

interface PasswordInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

const PasswordInput: FC<PasswordInputProps> = ({
  value,
  onChange,
  placeholder,
}) => {
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const togglePasswordVisibility = useCallback(() => {
    setShowPassword((prev) => !prev);
  }, []);

  return (
    <div className="relative">
      <Input
        type={showPassword ? "text" : "password"}
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder={placeholder}
        className="pr-2"
      />
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className="absolute right-2 top-1 "
        aria-label={showPassword ? "Hide Password" : "Show Password"}
        onClick={togglePasswordVisibility}
      >
        {showPassword ? (
          <EyeOffIcon className="size-10" />
        ) : (
          <EyeIcon className="size-10" />
        )}
      </Button>
    </div>
  );
};

export default PasswordInput;
