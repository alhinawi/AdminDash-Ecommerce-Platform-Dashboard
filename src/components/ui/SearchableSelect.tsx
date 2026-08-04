import * as React from "react";
import { Globe, Check, ChevronDown } from "lucide-react";
import { cn } from "../../utils/cn";
import { Popover, PopoverContent, PopoverTrigger } from "./Popover";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "./Command";

interface CountryOption {
  code: string;
  name: string;
  flag: string;
}

const COUNTRIES: CountryOption[] = [
  { code: "US", name: "United States", flag: "🇺🇸" },
  { code: "GB", name: "United Kingdom", flag: "🇬🇧" },
  { code: "EG", name: "Egypt", flag: "🇪🇬" },
  { code: "DE", name: "Germany", flag: "🇩🇪" },
  { code: "FR", name: "France", flag: "🇫🇷" },
  { code: "CA", name: "Canada", flag: "🇨🇦" },
  { code: "AU", name: "Australia", flag: "🇦🇺" },
  { code: "BR", name: "Brazil", flag: "🇧🇷" },
  { code: "CN", name: "China", flag: "🇨🇳" },
  { code: "IN", name: "India", flag: "🇮🇳" },
  { code: "IT", name: "Italy", flag: "🇮🇹" },
  { code: "JP", name: "Japan", flag: "🇯🇵" },
  { code: "MX", name: "Mexico", flag: "🇲🇽" },
  { code: "NL", name: "Netherlands", flag: "🇳🇱" },
  { code: "NZ", name: "New Zealand", flag: "🇳🇿" },
  { code: "RU", name: "Russia", flag: "🇷🇺" },
  { code: "ES", name: "Spain", flag: "🇪🇸" },
  { code: "SE", name: "Sweden", flag: "🇸🇪" },
  { code: "CH", name: "Switzerland", flag: "🇨🇭" },
  { code: "AE", name: "United Arab Emirates", flag: "🇦🇪" },
  { code: "KR", name: "South Korea", flag: "🇰🇷" },
  { code: "IE", name: "Ireland", flag: "🇮🇪" },
  { code: "TW", name: "Taiwan", flag: "🇹🇼" },
  { code: "ZA", name: "South Africa", flag: "🇿🇦" },
  { code: "SG", name: "Singapore", flag: "🇸🇬" },
  { code: "SA", name: "Saudi Arabia", flag: "🇸🇦" },
  { code: "TR", name: "Turkey", flag: "🇹🇷" },
  { code: "AR", name: "Argentina", flag: "🇦🇷" },
  { code: "BE", name: "Belgium", flag: "🇧🇪" },
  { code: "AT", name: "Austria", flag: "🇦🇹" },
  { code: "DK", name: "Denmark", flag: "🇩🇰" },
  { code: "FI", name: "Finland", flag: "🇫🇮" },
  { code: "NO", name: "Norway", flag: "🇳🇴" },
  { code: "PL", name: "Poland", flag: "🇵🇱" },
  { code: "PT", name: "Portugal", flag: "🇵🇹" },
  { code: "MY", name: "Malaysia", flag: "🇲🇾" },
  { code: "TH", name: "Thailand", flag: "🇹🇭" },
  { code: "ID", name: "Indonesia", flag: "🇮🇩" },
  { code: "VN", name: "Vietnam", flag: "🇻🇳" },
  { code: "PH", name: "Philippines", flag: "🇵🇭" },
  { code: "UA", name: "Ukraine", flag: "🇺🇦" },
  { code: "GR", name: "Greece", flag: "🇬🇷" },
  { code: "CL", name: "Chile", flag: "🇨🇱" },
  { code: "CO", name: "Colombia", flag: "🇨🇴" },
  { code: "PE", name: "Peru", flag: "🇵🇪" },
];

interface SearchableSelectProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export default function SearchableSelect({
  value,
  onChange,
  placeholder = "Select a country",
}: SearchableSelectProps) {
  const [open, setOpen] = React.useState(false);

  const selectedCountry = React.useMemo(() => {
    return COUNTRIES.find((c) => c.name.toLowerCase() === value.toLowerCase());
  }, [value]);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          aria-haspopup="listbox"
          aria-expanded={open}
          className="relative flex h-10 w-full cursor-pointer items-center justify-between rounded-lg border border-zinc-200 bg-zinc-50 pr-3.5 pl-9 text-left text-sm text-zinc-900 outline-hidden transition-all select-none hover:bg-zinc-100/50 focus:ring-2 focus:ring-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-100 dark:hover:bg-zinc-800 dark:focus:ring-zinc-600"
        >
          <span className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3 text-zinc-400">
            <Globe className="h-4 w-4" />
          </span>
          <span className="block truncate">
            {selectedCountry ? (
              <span className="flex items-center gap-2">
                <span>{selectedCountry.flag}</span>
                <span>{selectedCountry.name}</span>
              </span>
            ) : (
              <span className="text-zinc-400 dark:text-zinc-500">
                {placeholder}
              </span>
            )}
          </span>
          <ChevronDown
            className={cn(
              "h-4 w-4 shrink-0 text-zinc-400 transition-transform duration-200 dark:text-zinc-500",
              open && "rotate-180",
            )}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-(--radix-popover-trigger-width) p-0">
        <Command>
          <CommandInput placeholder="Search countries..." />
          <CommandList>
            <CommandEmpty>No countries found.</CommandEmpty>
            <CommandGroup>
              {COUNTRIES.map((country) => {
                const isSelected = selectedCountry?.name === country.name;
                return (
                  <CommandItem
                    key={country.code}
                    value={country.name}
                    onSelect={(currentValue) => {
                      const matched = COUNTRIES.find(
                        (c) =>
                          c.name.toLowerCase() === currentValue.toLowerCase(),
                      );
                      onChange(matched ? matched.name : country.name);
                      setOpen(false);
                    }}
                    className={cn(
                      isSelected &&
                        "bg-blue-50/80 font-semibold text-blue-600 dark:bg-blue-500/15 dark:text-blue-400",
                    )}
                  >
                    <span className="flex items-center gap-2.5">
                      <span className="text-sm leading-none">
                        {country.flag}
                      </span>
                      <span>{country.name}</span>
                    </span>
                    {isSelected && (
                      <Check className="h-3.5 w-3.5 shrink-0 text-blue-600 dark:text-blue-400" />
                    )}
                  </CommandItem>
                );
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
