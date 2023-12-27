"use client";

import { cn } from "@/lib/utils";
import { useFormStatus } from "react-dom";
import { Button } from "../ui/button";

export const FormButton = ({ disabled, className, variant, children }) => {
  const { pending } = useFormStatus();

  return (
    <Button
      disabled={pending | disabled}
      variant={variant}
      type="submit"
      size="sm"
      className={cn(className)}
    >
      {children}
    </Button>
  );
};
