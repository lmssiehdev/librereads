import { w } from "windstitch";

const Button = w.button(
  "flex gap-1 items-center select-none justify-center rounded-sm border border-transparent focus:outline-none focus-visible:ring focus-visible:ring-opacity-75",
  {
    variants: {
      color: {
        primary:
          "hover:bg-[#655d52]/20 bg-[#655d52]/10 text-[#655d52] focus-visible:ring-[#655d52] ",
        danger:
          "hover:bg-red-400/20 bg-red-400/10 text-red-400 focus-visible:ring-red-400 ",
      },
      size: {
        sm: "text-sm font-medium px-4 py-1",
        md: "font-medium px-4 py-2",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "sm",
    },
  }
);

export default Button;
