import React from "react";
import clsx from "clsx";

type CardProps<T extends React.ElementType = "div"> = {
  as?: T;
  children: React.ReactNode;
  className?: string;
  shadow?: boolean;
  border?: boolean;
  hoverable?: boolean;
  padding?: string;
} & React.ComponentPropsWithoutRef<T>;

export const Card = <T extends React.ElementType = "div">({
  as,
  children,
  className,
  shadow = true,
  border = true,
  hoverable = false,
  padding = "p-5",
  ...props
}: CardProps<T>) => {
  const Component = as || "div";

  return (
    <Component
      className={clsx(
        "bg-white rounded-2xl transition",
        padding,
        shadow && "shadow-md",
        border && "border border-gray-200",
        hoverable && "hover:shadow-lg hover:scale-[1.01]",
        className
      )}
      {...props}
    >
      {children}
    </Component>
  );
};
