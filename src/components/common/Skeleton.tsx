import { w } from "windstitch";

const Skeleton = w.div(
	`relative 
  before:absolute before:inset-0
  before:-translate-x-full
  before:animate-[shimmer_2s_infinite]
  before:bg-gradient-to-r
  before:from-transparent before:via-white/20 before:to-transparent
  before:z-10
  isolate
  overflow-hidden
  shadow-xl shadow-black/5
  before:border-t before:border-rose-100/10`,
);

export default Skeleton;
