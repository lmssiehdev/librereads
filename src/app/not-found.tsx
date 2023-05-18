import Button from "@/components/common/Button";
import Link from "next/link";

export default function onBookFetchError() {
  return (
    <div className="flex flex-col justify-center items-center mt-10">
      <h3 className="text-3xl my-3">Page not found!</h3>
      <Link href="/">
        <Button as="span">Go Back Home</Button>
      </Link>
    </div>
  );
}
