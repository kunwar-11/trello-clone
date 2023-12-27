"use client";

import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { FormErrors } from "./form-error";

export const FormInput = forwardRef(
  (
    {
      id,
      label,
      type,
      placeholder,
      required,
      disabled,
      error,
      className,
      defaultValue = "",
      onBlur,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? <Label htmlFor={id}>{label}</Label> : null}
          <Input
            onBlur={onBlur}
            defaultValue={defaultValue}
            ref={ref}
            name={id}
            id={id}
            placeholder={placeholder}
            type={type}
            disabled={pending | disabled}
            required={required}
            className={cn("text-sm px-2 py-1 h-7", className)}
          />
        </div>
        <FormErrors id={id} errors={error} />
      </div>
    );
  }
);

FormInput.displayName = "FormInput";
