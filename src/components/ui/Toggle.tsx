import type { ButtonHTMLAttributes } from "react";

import { cn } from "../../utils/cn";

interface ToggleProps extends Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "onChange"
> {
  checked: boolean;
  onChange: (checked: boolean) => void;
  size?: "sm" | "md";
  activeColor?: string;
  label?: string;
}

export default function Toggle({
  checked,
  onChange,
  size = "md",
  activeColor = "bg-accent",
  label,
  className,
  disabled,
  ...props
}: ToggleProps) {
  const isSm = size === "sm";

  return (
    <button
      type="button"
      role="switch"
      dir="ltr"
      aria-checked={checked}
      aria-label={label}
      disabled={disabled}
      onClick={() => onChange(!checked)}
      className={cn(
        "relative inline-flex shrink-0 cursor-pointer items-center rounded-full p-0.5 transition-colors duration-200 ease-in-out focus:outline-hidden disabled:cursor-not-allowed disabled:opacity-50",
        isSm ? "h-5 w-9" : "h-6 w-11",
        checked ? activeColor : "bg-gray-300 dark:bg-zinc-700",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "pointer-events-none inline-block transform rounded-full bg-white shadow-xs transition-transform duration-200 ease-in-out",
          isSm ? "h-4 w-4" : "h-5 w-5",
          checked
            ? isSm
              ? "translate-x-4"
              : "translate-x-5"
            : "translate-x-0",
        )}
      />
    </button>
  );
}
