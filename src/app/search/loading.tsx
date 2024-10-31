import Skeleton from "@/components/common/Skeleton";
export function GalleryWrapper({ children }: { children: React.ReactNode }) {
	return (
		<div className="grid grid-cols-[repeat(auto-fit,minmax(145px,180px))] justify-center md:gap-x-1 md:gap-y-3 gap-x-3 gap-y-6">
			{children}
		</div>
	);
}

export default function LoadingSkeleton() {
	return (
		<GalleryWrapper>
			{Array(30)
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
