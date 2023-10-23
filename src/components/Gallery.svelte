<script lang="ts">
  let alpha = 0.2;

  type Work = {
    title: string;
    name: string;
    file: {
      url: string;
    };
  };

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

  export let works: Work[];

  const videos = works.map((w) => `https:${w.file.url}`);

  const onScroll = () => {
    alpha = Math.min(window.scrollY / window.innerHeight, 1);
  };

  $: cssVarStyles = `--alpha:${alpha}`;
</script>

<svelte:window on:scroll={onScroll} />

<div class="section" style={cssVarStyles}>
  <div class="column-wrapper">
    <div class="column">
      {#each randomizeOrder(videos) as url}
        <div class="video-wrapper">
          <video src={url} autoplay playsinline muted loop />
        </div>
      {/each}
    </div>
    <div class="column">
      {#each randomizeOrder(videos) as url}
        <div class="video-wrapper">
          <video src={url} autoplay playsinline muted loop />
        </div>
      {/each}
    </div>
    <div class="column">
      {#each randomizeOrder(videos) as url}
        <div class="video-wrapper">
          <video src={url} autoplay playsinline muted loop />
        </div>
      {/each}
    </div>
  </div>
</div>

<style>
  .section {
    height: 100vh;
    overflow: hidden;
    background-color: rgb(var(--purple3));
    opacity: var(--alpha);
  }
  .column-wrapper {
    display: flex;
    justify-content: space-around;
    transform: scale(2) rotate(45deg);
  }
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
