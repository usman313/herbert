import { getStoryblokClient } from "@/lib/storyBlok";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const client = getStoryblokClient();
		const { data } = await client.getStory("home", { version: "published" });
    console.log('data: ', data?.story?.content?.body);
		return NextResponse.json(data);
	} catch (error: any) {
		return NextResponse.json(
			{ error: true, message: error?.message ?? "Failed to fetch home" },
			{ status: error?.status ?? 500 }
		);
	}
}


