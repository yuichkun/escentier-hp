<script lang="ts">
  import VideoColumn from "./VideoColumn.svelte";

  let alpha = 0.2;

  type Work = {
    title: string;
    name: string;
    file: {
      url: string;
    };
  };

  export let works: Work[];

  const onScroll = () => {
    alpha = Math.min(window.scrollY / window.innerHeight, 1);
  };

  $: cssVarStyles = `--alpha:${alpha}`;
</script>

<svelte:window on:scroll={onScroll} />

<div class="section" style={cssVarStyles}>
  <div class="column-wrapper">
    <VideoColumn {works} />
    <VideoColumn {works} />
    <VideoColumn {works} />
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
    height: 100%;
    transform: scale(2) rotate(45deg);
  }
</style>
