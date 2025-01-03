import type { APIRoute } from "astro";
import { sendAnalyticsEvent } from "../../utils/analytics";

export const GET: APIRoute = ({ params, redirect }) => {
	const { id } = params;
	const url = `https://www.amazon.com/dp/${id}/ref=nosim?tag=goodreadsbotr-20`;

	const paylod = {
		event: "amazon_link_click",
		properties: {
			prodcut_id: id as string,
			product_url: url,
		},
	};

	sendAnalyticsEvent(paylod);
	return redirect(url);
};
