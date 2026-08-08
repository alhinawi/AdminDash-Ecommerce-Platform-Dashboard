import type { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit" | "w-auto";
}

const Button = ({
  children,
  className = "",
  width = "w-full",
  ...rest
}: Props) => {
  return (
    <button
      className={`${width} cursor-pointer rounded-md p-2.5 font-medium transition-all duration-200 ease-in-out focus:outline-none active:scale-[0.98] ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
