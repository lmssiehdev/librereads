import Link from "next/link";
import "./globals.css";
import NextTopLoader from "nextjs-toploader";

import localFont from "next/font/local";
import clsx from "clsx";

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
    <div className="text-center py-4">
      <a
        className="underline underline-offset-2"
        href="https://github.com/lmssiehdev/librereads"
      >
        source code
      </a>
    </div>
  );
};
