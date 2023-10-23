<script lang="ts">
  type Work = {
    title: string;
    name: string;
    file: {
      url: string;
    };
  };

  export let works: Work[];
  const videos = works.map((w) => `https:${w.file.url}`);

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
</script>

<div class="column">
  {#each randomizeOrder(videos) as url}
    <div class="video-wrapper">
      <video src={url} autoplay playsinline muted loop />
    </div>
  {/each}
</div>

<style>
  .column {
    width: 30%;
    filter: saturate(1.7) contrast(0.8);
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
