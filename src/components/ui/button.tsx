import * as React from "react";
import { Slot } from "@radix-ui/react-slot";
import { cva, type VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-teal hover:shadow-glow transform hover:scale-105",
        destructive: "bg-destructive text-destructive-foreground hover:bg-destructive/90 hover:shadow-lg transform hover:scale-105",
        outline: "border border-input bg-background hover:bg-accent hover:text-accent-foreground hover:border-soft-teal/50 transform hover:scale-105",
        secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "bg-secondary text-secondary-foreground hover:bg-secondary/80 hover:shadow-soft transform hover:scale-105",
        link: "underline-offset-4 hover:underline text-primary",
        teal: "bg-gradient-teal text-white hover:shadow-glow transform hover:scale-105 hover:-translate-y-1",
        warm: "bg-gradient-warm text-warm-earth hover:shadow-elevated transform hover:scale-105 hover:-translate-y-1",
        glass: "glass-card text-foreground hover:shadow-elevated transform hover:scale-105 hover:-translate-y-1",
        premium: "bg-gradient-teal text-white shadow-glow animate-glow hover:shadow-elevated transform hover:scale-110"
      },
      size: {
        default: "h-10 py-2 px-4",
        sm: "h-9 px-3 rounded-md",
        lg: "h-11 px-8 rounded-md",
        xl: "h-14 px-10 rounded-lg text-lg"
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button";
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);
Button.displayName = "Button";

export { Button, buttonVariants };