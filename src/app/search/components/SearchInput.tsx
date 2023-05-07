"use client";
import Dialog from "@/app/book/[id]/Components/StateSelect";
import Button from "@/components/common/Button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <>
      <form
        className="flex gap-3"
        onSubmit={(e) => {
          e.preventDefault();
          router.push(`/search?q=${searchTerm.replaceAll(" ", "+")}`);
        }}
      >
        <input
          className="w-full rounded-sm p-1 bg-[#655d52]/10 text-[#655d52]"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="reverend insanity..."
        />
        <Button type="submit">Search</Button>
      </form>
    </>
  );
}
