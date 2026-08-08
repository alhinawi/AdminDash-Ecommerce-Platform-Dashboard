import type { ReactNode } from "react";
import {
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronDown, Check } from "lucide-react";
import { cn } from "../../utils/cn";

export interface SelectOption<T = string> {
  value: T;
  label: string;
  imageURL?: string;
  icon?: ReactNode;
  badge?: string;
}

interface SelectProps<T = string> {
  options: SelectOption<T>[];
  value: T;
  onChange: (value: T) => void;
  label?: string;
  placeholder?: string;
  className?: string;
  size?: "sm" | "md";
  disabled?: boolean;
}

export default function Select<T extends string | number = string>({
  options,
  value,
  onChange,
  label,
  placeholder = "Select an option...",
  className,
  size = "md",
  disabled = false,
}: SelectProps<T>) {
  const selectedOption =
    options.find((opt) => opt.value === value) || options[0];
  const isSm = size === "sm";

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <label className="mb-1.5 block text-xs font-semibold tracking-wider text-gray-700 uppercase dark:text-slate-300">
          {label}
        </label>
      )}
      <Listbox value={value} onChange={onChange} disabled={disabled}>
        <div className="relative">
          <ListboxButton
            className={cn(
              "group relative flex w-full cursor-pointer items-center justify-between rounded-xl border border-gray-200/90 bg-white/90 text-left text-gray-900 shadow-2xs backdrop-blur-md transition-all duration-200 focus:outline-hidden hover:border-gray-300 hover:bg-white dark:border-slate-800 dark:bg-slate-900/90 dark:text-slate-100 dark:hover:border-slate-700 dark:hover:bg-slate-900 focus-visible:ring-2 focus-visible:ring-indigo-500/20 focus-visible:border-accent",
              isSm ? "px-3 py-1.5 text-xs" : "px-3.5 py-2.5 text-xs sm:text-sm",
              disabled && "cursor-not-allowed opacity-50",
            )}
          >
            <div className="flex items-center gap-2.5 overflow-hidden">
              {selectedOption?.imageURL && (
                <img
                  src={selectedOption.imageURL}
                  alt={selectedOption.label}
                  className="h-4 w-4 shrink-0 rounded-full object-cover ring-1 ring-gray-200 dark:ring-slate-700"
                />
              )}
              {selectedOption?.icon && (
                <span className="shrink-0 text-gray-500 dark:text-slate-400">
                  {selectedOption.icon}
                </span>
              )}
              <span className="truncate font-medium">
                {selectedOption ? selectedOption.label : placeholder}
              </span>
            </div>

            <div className="flex items-center gap-1.5">
              {selectedOption?.badge && (
                <span className="rounded-full bg-accent-light px-1.5 py-0.5 text-[10px] font-bold text-accent">
                  {selectedOption.badge}
                </span>
              )}
              <ChevronDown
                className={cn(
                  "h-4 w-4 shrink-0 text-gray-400 transition-transform duration-200 group-data-open:rotate-180 dark:text-slate-500",
                  isSm && "h-3.5 w-3.5",
                )}
              />
            </div>
          </ListboxButton>

          <ListboxOptions
            anchor="bottom start"
            transition
            className="z-50 mt-1.5 max-h-60 min-w-(--button-width) overflow-auto rounded-xl border border-gray-200/90 bg-white/95 p-1 text-xs shadow-xl outline-hidden backdrop-blur-md transition duration-150 ease-out data-closed:scale-95 data-closed:opacity-0 dark:border-slate-800 dark:bg-slate-900/95 dark:text-slate-100"
          >
            {options.map((option) => (
              <ListboxOption
                key={String(option.value)}
                value={option.value}
                className="group relative flex cursor-pointer items-center justify-between rounded-lg px-3 py-2 text-gray-700 transition-colors select-none dark:text-slate-300 data-focus:bg-accent-light data-focus:text-accent data-selected:font-semibold data-selected:text-accent"
              >
                <div className="flex items-center gap-2.5">
                  {option.imageURL && (
                    <img
                      src={option.imageURL}
                      alt={option.label}
                      className="h-4 w-4 shrink-0 rounded-full object-cover"
                    />
                  )}
                  {option.icon && (
                    <span className="shrink-0 text-gray-400 group-data-focus:text-accent dark:text-slate-500 dark:group-data-focus:text-accent">
                      {option.icon}
                    </span>
                  )}
                  <span className="block truncate font-medium">
                    {option.label}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  {option.badge && (
                    <span className="rounded-full bg-accent-light px-1.5 py-0.5 text-[10px] font-bold text-accent">
                      {option.badge}
                    </span>
                  )}
                  <Check className="h-3.5 w-3.5 opacity-0 group-data-selected:opacity-100 text-accent" />
                </div>
              </ListboxOption>
            ))}
          </ListboxOptions>
        </div>
      </Listbox>
    </div>
  );
}
