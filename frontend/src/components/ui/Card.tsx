"use client";

import React from "react";
import { cn } from "@/lib/utils";

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: "default" | "elevated" | "outlined";
}

export const Card = React.forwardRef<HTMLDivElement, CardProps>(
  ({ className, variant = "default", children, ...props }, ref) => {
    
    const variants = {
      default: "bg-white border border-gray-100 shadow-card rounded-2xl",
      elevated: "bg-white shadow-soft rounded-2xl border-none",
      outlined: "bg-vball-bg border-2 border-vball-navy/10 rounded-2xl",
    };

    return (
      <div
        ref={ref}
        className={cn(variants[variant], "p-4", className)}
        {...props}
      >
        {children}
      </div>
    );
  }
);

Card.displayName = "Card";