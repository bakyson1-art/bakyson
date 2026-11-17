"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { cva, type VariantProps } from "class-variance-authority";

const skeletonVariants = cva("animate-pulse rounded-md bg-muted", {
  variants: {
    variant: {
      default: "h-4 w-24",
      text: "h-4 w-full",
      circle: "h-8 w-8 rounded-full",
      rect: "h-32 w-full",
    },
  },
  defaultVariants: {
    variant: "default",
  },
});

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement>, VariantProps<typeof skeletonVariants> {}

function Skeleton({ className, variant, ...props }: SkeletonProps) {
  return <div className={cn(skeletonVariants({ variant, className }))} {...props} />;
}
Skeleton.displayName = "Skeleton";

export { Skeleton, skeletonVariants };
