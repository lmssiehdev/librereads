import SearchInput from "./components/SearchInput";
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <SearchInput />
      {children}
    </>
  );
}
