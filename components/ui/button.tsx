"use client";

import * as React from "react";
import {Slot} from "@radix-ui/react-slot";
import {cva, type VariantProps} from "class-variance-authority";
import {cn} from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 rounded-lg border border-transparent px-4 py-2 text-sm font-semibold leading-none transition-[background-color,color,border-color,box-shadow,transform] duration-200 ease-out focus-visible:outline focus-visible:outline-3 focus-visible:outline-offset-4 focus-visible:outline-[var(--gold)] disabled:pointer-events-none disabled:opacity-50 [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        primary:
          "bg-[var(--action)] text-[var(--white)] shadow-[0_8px_18px_rgb(var(--palette-orchid-rgb)/0.2)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--action)_88%,var(--palette-plum))]",
        warm:
          "bg-[var(--coral)] text-[var(--white)] shadow-[0_8px_18px_rgb(var(--palette-bronze-rgb)/0.22)] hover:-translate-y-0.5 hover:bg-[color-mix(in_srgb,var(--coral)_88%,var(--palette-plum))]",
        outline:
          "border-[var(--action)] bg-transparent text-[var(--action)] hover:-translate-y-0.5 hover:bg-[rgb(var(--palette-orchid-rgb)/0.08)]",
        ghost:
          "bg-transparent text-[var(--ink)] hover:bg-[rgb(var(--palette-lavender-rgb)/0.16)]"
      },
      size: {
        sm: "min-h-9 px-3 text-xs",
        md: "min-h-11 px-4 text-sm",
        lg: "min-h-12 px-5 text-base",
        icon: "size-11 p-0"
      }
    },
    defaultVariants: {
      variant: "primary",
      size: "md"
    }
  }
);

type ButtonProps = React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean;
  };

function Button({className, variant, size, asChild = false, ...props}: ButtonProps) {
  const Component = asChild ? Slot : "button";

  return <Component className={cn(buttonVariants({variant, size, className}))} {...props} />;
}

export {Button, buttonVariants};
