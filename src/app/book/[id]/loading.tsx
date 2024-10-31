import Skeleton from "@/components/common/Skeleton";

export default function BookingLoading() {
	return (
		<div className="flex flex-col items-center sm:items-start sm:flex-row gap-4 md:gap-8">
			<div className="max-w-fit sm:w-auto">
				<Skeleton className="h-[260px] w-[180px] rounded bg-[#655d52]/30" />
			</div>
			<div className="flex-1 max-w-[300px] w-full md:w-auto md:max-w-full">
				<Skeleton className="h-5 w-2/5 rounded my-2 bg-[#655d52]/30" />
				<Skeleton className="h-5 w-2/5 rounded my-2 bg-[#655d52]/30" />
				<div className="my-2">
					<Skeleton className="h-5 w-20 rounded my-2 bg-[#655d52]/30" />
				</div>
				<div className="my-5">
					<Skeleton className="h-5 rounded my-2 bg-[#655d52]/20" />
					<Skeleton className="h-5 rounded my-2 bg-[#655d52]/20" />
					<Skeleton className="h-5 rounded my-2 bg-[#655d52]/20" />
					<Skeleton className="h-5 max-w-[75%] rounded my-2 bg-[#655d52]/20" />
					<Skeleton className="h-5 max-w-[75%] rounded my-2 bg-[#655d52]/20" />
				</div>
			</div>
		</div>
	);
}
