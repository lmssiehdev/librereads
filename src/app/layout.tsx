import Link from "next/link";
import NextTopLoader from "nextjs-toploader";
import "./globals.css";

import { ArrowUpRightIcon } from "@heroicons/react/24/solid";
import clsx from "clsx";
import localFont from "next/font/local";

const pockota = localFont({
  src: "../../public/fonts/Pockota-Regular.ttf",
  variable: "--pockota-font",
  display: "swap",
});

export const metadata = {
  title: "librereads",
  description: "Keep your reading habits private",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={clsx(
          "flex flex-col min-h-screen max-w-screen-md !mx-auto px-2 bg-[#f6f0e9] font-pockoto",
          pockota.variable
        )}
      >
        <NextTopLoader color="#000" />
        <Navbar />
        <div className="flex-1 font-pockoto">{children}</div>
        <Footer />
      </body>
    </html>
  );
}

const Navbar = () => {
  return (
    <div className="py-4">
      <nav className="flex justify-between items-center">
        <h1 className="text-xl font-bold">
          <Link href="/">
            LibreReads <span className="text-xs opacity-70">[Beta]</span>
          </Link>
        </h1>
        <ul className="flex gap-3 items-center">
          <li>
            <Link href="/search/">Search</Link>
          </li>
          <li>
            <Link href="/library/">Library</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

const Footer = () => {
  return (
    <div className="text-center py-40 pb-10">
      <a
        target="_blank"
        className="underline underline-offset-2 flex justify-center items-center gap-1 "
        href="https://github.com/lmssiehdev/librereads"
      >
        send feedback
        <ArrowUpRightIcon className="h-4 w-4" />
      </a>
    </div>
  );
};
