import { headers } from "next/headers";

export async function getBaseUrl() {
	const hdrs = await headers();
	const host = hdrs.get("x-forwarded-host") ?? hdrs.get("host");
	const protocol = hdrs.get("x-forwarded-proto") ?? (host?.startsWith("localhost") ? "http" : "https");
	if (!host) return "";
	return `${protocol}://${host}`;
}


