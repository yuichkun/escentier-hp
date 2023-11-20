<script lang="ts">
  import VideoColumn from "./VideoColumn.svelte";

  let alpha = 0.2;

  const onScroll = () => {
    alpha = Math.min(window.scrollY / window.innerHeight, 1);
  };

  $: cssVarStyles = `--alpha:${alpha}`;
</script>

<svelte:window on:scroll={onScroll} />

<div class="section" style={cssVarStyles}>
  <div class="column-wrapper">
    <div class="video-wrapper">
      <VideoColumn />
    </div>
    <div class="video-wrapper">
      <VideoColumn isOpposite />
    </div>
    <div class="video-wrapper">
      <VideoColumn />
    </div>
    <div class="video-wrapper">
      <VideoColumn isOpposite />
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
    height: 100%;
    gap: 54px;
    transform-origin: 110% 77%;
    transform: rotate(45deg);
  }
  .video-wrapper {
    height: 300vh;
  }
</style>
