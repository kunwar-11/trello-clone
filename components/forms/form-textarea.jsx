import { Textarea } from "../ui/textarea";
import { Label } from "../ui/label";
import { FormErrors } from "./form-error";
import { cn } from "@/lib/utils";
import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

export const FormTextArea = forwardRef(
  (
    {
      id,
      label,
      placeholder,
      required,
      disabled,
      error,
      className,
      defaultValue = "",
      onBlur,
      onClick,
      onKeyDown,
    },
    ref
  ) => {
    const { pending } = useFormStatus();
    return (
      <div className="space-y-2">
        <div className="space-y-1">
          {label ? <Label htmlFor={id}>{label}</Label> : null}
          <Textarea
            onBlur={onBlur}
            onClick={onClick}
            onKeyDown={onKeyDown}
            defaultValue={defaultValue}
            ref={ref}
            name={id}
            id={id}
            placeholder={placeholder}
            disabled={pending | disabled}
            required={required}
            className={cn(
              "resize-none focus-visible:ring-0 focus-visible:ring-offset-0 ring-0 focus:ring-0 outline-none shadow-sm",
              className
            )}
          />
        </div>
        <FormErrors id={id} errors={error} />
      </div>
    );
  }
);

FormTextArea.displayName = "FormTextArea";
