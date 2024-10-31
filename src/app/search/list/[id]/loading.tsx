import Skeleton from "@/components/common/Skeleton";
import { GalleryWrapper } from "../../loading";

export default function LoadingSkeleton() {
	return (
		<>
			{Array(4)
				.fill(true)
				.map((_, index) => {
					return (
						<div key={index} className="my-5">
							<Skeleton className="h-[260px] rounded bg-[#655d52]/30" />
							<Skeleton className="h-5 max-w-[75%] rounded my-2 bg-[#655d52]/20" />
						</div>
					);
				})}
		</>
	);
}
