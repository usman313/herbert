import { apiPlugin, storyblokInit, getStoryblokApi } from "@storyblok/react/rsc";

let isInitialized = false;

function init() {
	if (isInitialized) return;
	storyblokInit({
		accessToken: process.env.STORY_BLOK_ACCESS_TOKEN,
		use: [apiPlugin],
        components: {},
	});
	isInitialized = true;
}

export function getStoryblokClient() {
	init();
	return getStoryblokApi();
}
