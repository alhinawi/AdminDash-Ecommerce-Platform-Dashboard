"use client";
import {
  Label,
  Listbox,
  ListboxButton,
  ListboxOption,
  ListboxOptions,
} from "@headlessui/react";
import { ChevronUpDownIcon } from "@heroicons/react/16/solid";
import { CheckIcon } from "@heroicons/react/20/solid";
import { categories } from "../../data";
import type { Category } from "../../interfaces";

interface Props {
  selected: Category;
  setSelected: (category: Category) => void;
}

const Select = ({ selected, setSelected }: Props) => {
  return (
    <Listbox value={selected} onChange={setSelected}>
      <Label className="block text-xs font-semibold text-gray-700 uppercase tracking-wider">
        Category
      </Label>
      <div className="relative mt-1">
        <ListboxButton className="grid w-full cursor-pointer grid-cols-1 rounded-xl border border-gray-200 bg-gray-50/50 py-2.5 pr-2 pl-3.5 text-left text-gray-900 shadow-2xs transition-all focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/20 focus:border-indigo-600 sm:text-sm">
          <span className="col-start-1 row-start-1 flex items-center gap-3 pr-6">
            <img
              alt={selected.name}
              src={selected.imageURL}
              className="size-5 shrink-0 rounded-full object-cover ring-1 ring-gray-200"
            />
            <span className="block truncate font-medium">{selected.name}</span>
          </span>
          <ChevronUpDownIcon
            aria-hidden="true"
            className="col-start-1 row-start-1 size-5 self-center justify-self-end text-gray-400 sm:size-4"
          />
        </ListboxButton>

        <ListboxOptions
          anchor="bottom"
          transition
          className="z-50 mt-1 max-h-56 w-(--button-width) overflow-auto rounded-xl border border-gray-100 bg-white p-1 text-base shadow-xl outline-none data-leave:transition data-leave:duration-100 data-leave:ease-in data-closed:data-leave:opacity-0 sm:text-sm"
        >
          {categories.map((category) => (
            <ListboxOption
              key={category.id}
              value={category}
              className="group relative cursor-pointer rounded-lg py-2 pr-9 pl-3 text-gray-900 select-none data-focus:bg-indigo-600 data-focus:text-white"
            >
              <div className="flex items-center">
                <img
                  alt={category.name}
                  src={category.imageURL}
                  className="size-5 shrink-0 rounded-full object-cover"
                />
                <span className="ml-3 block truncate font-medium group-data-selected:font-semibold">
                  {category.name}
                </span>
              </div>

              <span className="absolute inset-y-0 right-0 flex items-center pr-3 text-indigo-600 group-not-data-selected:hidden group-data-focus:text-white">
                <CheckIcon aria-hidden="true" className="size-4" />
              </span>
            </ListboxOption>
          ))}
        </ListboxOptions>
      </div>
    </Listbox>
  );
};

export default Select;
