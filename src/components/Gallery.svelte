<script lang="ts">
  let alpha = 0.2;

  type Work = {
    title: string;
    name: string;
    file: {
      url: string;
    };
  };

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
      {#each videos as url}
        <video src={url} autoplay playsinline muted loop />
      {/each}
    </div>
    <div class="column">
      {#each videos as url}
        <video src={url} autoplay playsinline muted loop />
      {/each}
    </div>
    <div class="column">
      {#each videos as url}
        <video src={url} autoplay playsinline muted loop />
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
  }
  video {
    /* mix-blend-mode: difference; */
  }
</style>
