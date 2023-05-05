"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function SearchInput() {
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        router.push(`/search?q=${searchTerm.replace(" ", "+")}`);
      }}
    >
      <input
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        placeholder="search..."
      />
      <button type="submit">Search</button>
    </form>
  );
}
