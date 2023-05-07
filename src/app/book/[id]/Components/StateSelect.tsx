"use client";

import Button from "@/components/common/Button";
import { useBookStore } from "@/store/books";
import type { ReadingStatus } from "@/types/misc";
import type RawBook from "@/types/rawBook";
import { CheckIcon, TrashIcon, XMarkIcon } from "@heroicons/react/24/outline";
import * as Dialog from "@radix-ui/react-dialog";
import * as ToggleGroup from "@radix-ui/react-toggle-group";
import clsx from "clsx";
import React, { useState } from "react";

const DialogDemo = ({ info }: { info: RawBook }) => {
  const addBook = useBookStore((state) => state.addBook);
  const [open, setOpen] = React.useState(false);
  const [v, setV] = useState<ReadingStatus | null>(null);

  const optionsArray: ReadingStatus[] = ["Want To Read", "Reading", "Read"];

  const updateBookState = (value: ReadingStatus | "Remove") => {
    if (value === "Remove") {
      setV(null);
      setOpen(false);
      return;
    }

    setV(value);
    addBook(value, info);
    setOpen(false);
  };

  return (
    <Dialog.Root open={open} onOpenChange={setOpen}>
      <Dialog.Trigger asChild>
        <Button className="w-full mt-2">
          <span>{v ?? "Add to list"}</span>
        </Button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-20 bg-black/50" />
        <Dialog.Content
          className={clsx(
            "fixed z-50",
            "w-[95vw] max-w-md rounded-lg p-4 md:w-full",
            "top-[50%] left-[50%] -translate-x-[50%] -translate-y-[50%]",
            "bg-white",
            "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
          )}
        >
          <Dialog.Title className="text-sm font-medium text-gray-900">
            Edit profile
          </Dialog.Title>
          <Dialog.Description className="mt-2 text-sm font-normal text-gray-700">
            Make changes to your profile here. Click save when you{"'"}re done.
          </Dialog.Description>
          <div className="mt-2 space-y-2">
            <Toggle
              /* @ts-expect-error */
              selectedValue={v}
              optionsArray={optionsArray}
              onValueChange={updateBookState}
            />
          </div>
          <Button
            // className="py-2 flex items-center justify-center w-full gap-1"
            size="md"
            color="danger"
            className="w-full mt-4"
            onClick={() => updateBookState("Remove")}
          >
            <TrashIcon className="h-5 w-5" />
            Remove from my shelf
          </Button>
          {/* <div className="mt-4 flex justify-end">
            <Dialog.Close
              className={clsx(
                "inline-flex select-none justify-center rounded-md px-4 py-2 text-sm font-medium",
                "bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:text-gray-100 dark:hover:bg-purple-600",
                "border border-transparent",
                "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
              )}
              asChild
            >
              <button className="Button green">Save changes</button>
            </Dialog.Close>
          </div> */}
          <Dialog.Close
            className={clsx(
              "absolute top-3.5 right-3.5 inline-flex items-center justify-center rounded-full p-1",
              "focus:outline-none focus-visible:ring focus-visible:ring-purple-500 focus-visible:ring-opacity-75"
            )}
            asChild
          >
            <button className="IconButton" aria-label="Close">
              <XMarkIcon className="h-4 w-4 text-gray-500 hover:text-gray-700" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

function Toggle({
  selectedValue,
  optionsArray,
  onValueChange,
}: {
  selectedValue: ReadingStatus;
  optionsArray: ReadingStatus[];
  onValueChange: (value: ReadingStatus | "Remove") => void;
}) {
  return (
    <ToggleGroup.Root
      className="flex flex-col gap-3"
      type="single"
      defaultValue={selectedValue}
      aria-label="Text alignment"
      onValueChange={(value: ReadingStatus) => onValueChange(value)}
    >
      {optionsArray.map((value) => {
        return (
          <ToggleGroup.Item
            className={clsx(
              "group bg-white  data-[state=on]:bg-[#655d52]/10 hover:bg-[#655d52]/10 text-[#655d52] flex items-center justify-center gap-1",
              "border px-2.5 py-2 border-gray-200 rounded-sm",
              "focus:relative focus:outline-none focus-visible:z-20 focus-visible:ring focus-visible:ring-[#655d52] focus-visible:ring-opacity-75"
            )}
            aria-label={value}
            key={value}
            value={value}
          >
            {selectedValue === value && <CheckIcon className="h-5 w-5" />}
            {value}
          </ToggleGroup.Item>
        );
      })}
    </ToggleGroup.Root>
  );
}

export default DialogDemo;
