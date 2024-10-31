import Skeleton from "@/components/common/Skeleton";
import { GalleryWrapper } from "../../loading";

export default function LoadingSkeleton() {
	return (
		<GalleryWrapper>
			{Array(15)
				.fill(true)
				.map((_, index) => {
					return (
						<div key={index}>
							<Skeleton className="h-[260px] w-[180px] rounded bg-[#655d52]/30" />
							<Skeleton className="h-5 max-w-[75%] rounded my-2 bg-[#655d52]/20" />
						</div>
					);
				})}
		</GalleryWrapper>
	);
}
