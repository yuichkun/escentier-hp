<script lang="ts">
  import { onMount } from "svelte";
  import VideoColumn from "./VideoColumn.svelte";
  import { fetchAndCacheVideo } from "../stores/videoCache";

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
  onMount(() => {
    works.forEach((work) => {
      fetchAndCacheVideo(`https:${work.file.url}`).catch(console.error);
    });
  });
</script>

<svelte:window on:scroll={onScroll} />

<div class="section" style={cssVarStyles}>
  <div class="column-wrapper">
    <VideoColumn {works} />
    <VideoColumn {works} isOpposite />
    <VideoColumn {works} />
    <VideoColumn {works} isOpposite />
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
    transform: scale(1.8) rotate(45deg);
  }
</style>
