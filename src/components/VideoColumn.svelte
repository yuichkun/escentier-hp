<script lang="ts">
  import CachedVideo from "./CachedVideo.svelte";
  type Work = {
    title: string;
    name: string;
    file: {
      url: string;
    };
  };

  export let works: Work[];
  const videos = works.map((w) => `https:${w.file.url}`);
  export let isOpposite = false;

  function randomizeOrder<T>(array: T[]): T[] {
    const shuffledArray = array.slice(); // Create a copy of the original array
    for (let i = shuffledArray.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1)); // Random index from 0 to i
      [shuffledArray[i], shuffledArray[j]] = [
        shuffledArray[j],
        shuffledArray[i],
      ]; // Swap elements
    }
    return shuffledArray;
  }
  const speed = Math.random() * 5 + 8;

  const randomizedVideos = randomizeOrder(videos);
  let videoList = [
    ...randomizedVideos,
    ...randomizedVideos,
    ...randomizedVideos,
  ];

  $: cssVarStyles = `--speed:${speed}s`;

  const direction = isOpposite ? "normal" : "reverse";
</script>

<div class="scroll-parent" style={cssVarStyles}>
  <div class="scroll-element primary" style="animation-direction:{direction}">
    {#each videoList as url}
      <div class="video-wrapper">
        <CachedVideo {url} />
      </div>
    {/each}
  </div>
  <div class="scroll-element secondary" style="animation-direction:{direction}">
    {#each videoList as url}
      <div class="video-wrapper">
        <CachedVideo {url} />
      </div>
    {/each}
  </div>
</div>

<style>
  .scroll-parent {
    position: relative;
    height: 100%;
    width: 90%;
    filter: saturate(1.7) contrast(0.8);
  }
  .scroll-element {
    position: absolute;
    width: inherit;
    height: 50%;
    top: 0%;
  }
  .primary {
    animation: primary var(--speed) linear infinite;
  }
  .secondary {
    animation: secondary var(--speed) linear infinite;
  }
  @keyframes primary {
    from {
      top: 0%;
    }
    to {
      top: -100%;
    }
  }
  @keyframes secondary {
    from {
      top: 100%;
    }
    to {
      top: 0%;
    }
  }
  .video-wrapper {
    overflow: hidden;
  }
  video {
    cursor: pointer;
    transition: 0.5s ease-out;
  }
  video:hover {
    transform: scale(1.6);
  }
</style>
