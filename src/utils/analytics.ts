export function sendAnalyticsEvent(payload: {
  event: string;
  properties?: Record<string, string | number>;
}) {
  const api_key = import.meta.env.VITE_POSTHOG_API_KEY;
  if (!api_key) {
    return;
  }
  fetch("https://us.i.posthog.com/capture/", {
    method: "POST",
    cache: "no-cache",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      api_key,
      distinct_id: "goodread_bots_reloaded",
      ...payload,
    }),
  });
}
