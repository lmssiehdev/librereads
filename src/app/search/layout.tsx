import SearchInput from "./components/SearchInput";
export default function SearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className="pt-2 pb-4">
        <SearchInput />
      </div>
      {children}
    </>
  );
}
