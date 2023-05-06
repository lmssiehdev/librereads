"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <form
      className="flex gap-3"
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?q=${searchTerm.replaceAll(" ", "+")}`);
      }}
    >
      <input
        className="w-full rounded-sm p-1"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="search..."
      />
      <button
        type="submit"
        className="inline-block bg-purple-100 text-purple-600 px-4 py-1 rounded-sm"
      >
        Search
      </button>
    </form>
  );
}
