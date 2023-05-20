"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${searchTerm.replaceAll(" ", "+")}`);
        }}
      >
        <div className="relative">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <MagnifyingGlassIcon className="h-5 w-5 text-[#655d52] " />
          </div>
          <input
            className="block w-full rounded p-2 pl-12 bg-[#655d52]/10 text-[#655d52] border focus:outline-none focus-visible:ring-2 focus-visible:ring-[#655d52] focus-visible:ring-opacity-75 focus-visible:ring-offset-1 "
            placeholder="the name of the wind..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          {/* 
          <div className="text-[#655d52] flex rounded border-red-500 border-1 border-solid">
            <input
              className="w-full rounded-sm  text-lg bg-[#655d52]/10 text-inherit p-2 focus:outline-none"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="reverend insanity..."
            />
          </div>
          */}
        </div>
      </form>
    </>
  );
}
