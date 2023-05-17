import Image from "next/image";
import { Inter } from "next/font/google";
import SearchInput from "./search/components/SearchInput";
import {
  BellSlashIcon,
  EyeSlashIcon,
  LockOpenIcon,
  SparklesIcon,
} from "@heroicons/react/24/outline";

const inter = Inter({ subsets: ["latin"] });

const features = [
  {
    icon: <LockOpenIcon className="h-6 w-6" />,
    name: "No account needed",
    description:
      "Start discovering books right away with no need to create an account or share personal information.",
  },
  {
    icon: <BellSlashIcon className="h-6 w-6" />,
    name: " A distraction-free environment",
    description:
      "Start discovering books right away with no need to create an account or share personal information.",
  },
  {
    icon: <SparklesIcon className="h-6 w-6" />,
    name: "Minimal Design",
    description:
      " Enjoy a clutter-free book tracking experience with our platform's minimalist design.",
  },
  {
    icon: <EyeSlashIcon className="h-6 w-6" />,
    name: "Data Never Leaves Your Device",
    description:
      "Your reading choices are personal and should stay that way.  your data is kept secure on your device and never shared.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen">
      <h2 className="text-center fluid-2xl sm:fluid-4xl my-12 sm:my-16 leading-[1.2]">
        Goodreads, reimagined.
        <br />
        Private, minimal, simple.
      </h2>
      <div className="my-4 sm:my-8 max-w-md mx-auto ">
        <SearchInput />
      </div>
      <div>
        <h3 className="text-2xl py-4">Features</h3>
        <div className="grid sm:grid-cols-2 grid-cols-1 gap-10 sm:gap-8">
          {features.map((feature) => {
            return (
              <div key={feature.name}>
                <span
                  className="h-14 w-14 rounded-lg bg-[#655d52]/10 text-[#655d52]  flex
                items-center justify-center"
                >
                  {feature.icon}
                </span>
                <h4 className="text-lg py-2"> {feature.name} </h4>
                <p>{feature.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
