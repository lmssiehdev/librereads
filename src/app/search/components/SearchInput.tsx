"use client";
import Button from "@/components/common/Button";
import {
  CheckIcon,
  ChevronDownIcon,
  ChevronUpIcon,
  MagnifyingGlassIcon,
} from "@heroicons/react/24/solid";
import * as Select from "@radix-ui/react-select";
import { clsx } from "clsx";
import { useRouter } from "next/navigation";
import { useState } from "react";

type SelectOptions = "book" | "list";

type SelectProps<OptionType> = {
  selectedValue: OptionType;
  optionsArray: OptionType[];
  onValueChange: (value: OptionType) => void;
};

function SelectComponent({
  selectedValue,
  optionsArray,
  onValueChange,
}: SelectProps<SelectOptions>) {
  return (
    <Select.Root
      defaultValue={selectedValue as string}
      onValueChange={onValueChange}
    >
      <Select.Trigger asChild aria-label="Food">
        <Button className="h-full w-full" size="md">
          <Select.Value />
          <Select.Icon className="ml-2">
            <ChevronDownIcon className="h-4 w-4" />
          </Select.Icon>
        </Button>
      </Select.Trigger>
      <Select.Content position="popper" sideOffset={5} align="center">
        <Select.ScrollUpButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronUpIcon className="h-4 w-4" />
        </Select.ScrollUpButton>
        <Select.Viewport className="bg-white dark:bg-gray-800 p-2 rounded-lg shadow-lg">
          <Select.Group>
            {optionsArray.map((f, i) => (
              <Select.Item
                key={`${f}-${i}`}
                value={f.toLowerCase()}
                className={clsx(
                  "relative flex items-center px-8 py-2 rounded-md text-sm text-gray-700 dark:text-gray-300 focus:bg-gray-100 dark:focus:bg-gray-900",
                  "radix-disabled:opacity-50",
                  "focus:outline-none select-none"
                )}
              >
                <Select.ItemText>{f}</Select.ItemText>
                <Select.ItemIndicator className="absolute left-2 inline-flex items-center">
                  <CheckIcon className="h-4 w-4" />
                </Select.ItemIndicator>
              </Select.Item>
            ))}
          </Select.Group>
        </Select.Viewport>
        <Select.ScrollDownButton className="flex items-center justify-center text-gray-700 dark:text-gray-300">
          <ChevronDownIcon className="h-4 w-4" />
        </Select.ScrollDownButton>
      </Select.Content>
    </Select.Root>
  );
}

export default function SearchInput() {
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchType, setSearchType] = useState<SelectOptions>("book");
  const searchTypeArr: SelectOptions[] = ["book", "list"];

  const handleSearchRedirect = () => {
    const formatedSearchTerm = searchTerm.replaceAll(" ", "+");
    const url = `search/${searchType}/${formatedSearchTerm}`;
    router.push(url);
  };
  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          handleSearchRedirect();
        }}
        className="flex flex-col md:flex-row-reverse gap-2"
      >
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-[#655d52] " />
          </div>
          <input
            className="block w-full rounded p-2 pl-12 bg-[#655d52]/10 text-[#655d52] border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#655d52] focus-visible:ring-opacity-75 focus-visible:ring-offset-1 "
            placeholder="the name of the wind..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <div className="w-full md:w-auto max-w-[90px]">
          <SelectComponent
            selectedValue={searchTypeArr[0]}
            optionsArray={searchTypeArr}
            onValueChange={(v) => {
              setSearchType(v);
            }}
          />
        </div>
      </form>
    </>
  );
}
