import { map } from "nanostores";

interface VideoCache {
  [url: string]: string;
}
export const videoStore = map<VideoCache>({});
export async function fetchAndCacheVideo(url: string) {
  const state = videoStore.get();
  if (!state[url]) {
    console.log(`fetching ${url} for the first time`);
    const response = await fetch(url);
    const blob = await response.blob();
    const objectURL = URL.createObjectURL(blob);
    videoStore.setKey(url, objectURL);
    console.log("after update", videoStore.get());
  }
}
