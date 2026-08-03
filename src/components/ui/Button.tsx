import type { ReactNode } from "react";

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  className?: string;
  width?: "w-full" | "w-fit" | "w-auto";
}

const Button = ({ children, className = "", width = "w-full", ...rest }: Props) => {
  return (
    <button
      className={`${width} p-2.5 rounded-md font-medium cursor-pointer transition-all duration-200 ease-in-out active:scale-[0.98] focus:outline-none ${className}`}
      {...rest}
    >
      {children}
    </button>
  );
};

export default Button;
