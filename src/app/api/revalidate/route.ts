import { revalidateTag } from "next/cache";
import { type NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
	const tag = request.nextUrl.searchParams.get("tag");
	if (!tag) return null;

	revalidateTag(tag);
	return NextResponse.json({ revalidated: true, now: Date.now() });
}
