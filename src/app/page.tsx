import 'mapbox-gl/dist/mapbox-gl.css';
import HomeClient from "@/components/HomeClient";
import { getStoryblokClient } from "@/lib/storyBlok";

export default async function Home() {
  try {
    const client = getStoryblokClient();
    const { data } = await client.getStory("home", { version: "published" });
    return <HomeClient homeData={data} />;
  } catch (error) {
    return <HomeClient homeData={null} />;
  }
}
