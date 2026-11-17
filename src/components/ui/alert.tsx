"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg]:absolute [&>svg:left-4] [&>svg:top-4] [&>svg:text-primary] [&>svg+div]:pl-10",
  {
    variants: {
      variant: {
        default: "bg-background text-foreground",
        destructive:
          "border-destructive/50 text-destructive dark:border-destructive [&>svg]:text-destructive",
        success: "border-success/50 text-success dark:border-success [&>svg]:text-success",
        warning: "border-warning/50 text-warning dark:border-warning [&>svg]:text-warning",
        info: "border-primary/50 text-primary dark:border-primary [&>svg]:text-primary",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface AlertProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof alertVariants> {
  title?: React.ReactNode;
  description?: React.ReactNode;
}

function Alert({
  className,
  variant,
  title,
  description,
  ...props
}: AlertProps) {
  return (
    <div className={cn(alertVariants({ variant, className }))} {...props}>
      {title && <h5 className="mb-1 font-medium leading-none">{title}</h5>}
      {description && <p className="text-sm">{description}</p>}
    </div>
  );
}
Alert.displayName = "Alert";

export { Alert, alertVariants };
