"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2",
  {
    variants: {
      variant: {
        default: "border-border bg-secondary text-secondary-foreground",
        secondary: "border-border bg-secondary text-secondary-foreground",
        destructive:
          "border-destructive bg-destructive text-destructive-foreground",
        outline: "border-border text-foreground",
        success: "border-success bg-success/10 text-success",
        warning: "border-warning bg-warning/10 text-warning",
        error: "border-error bg-error/10 text-error",
        primary: "border-primary bg-primary text-primary-foreground",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
);

interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {
  children?: React.ReactNode;
}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant, className }))} {...props} />
  );
}
Badge.displayName = "Badge";

export { Badge, badgeVariants };
