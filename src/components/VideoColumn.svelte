<script lang="ts">
  export let isOpposite = false;
  let videoEl: HTMLVideoElement;
  const speed = 0.7 + Math.random() * 0.2;

  const bgMoviePath = "/bg-movie.mp4";
  const bgRevMoviePath = "/bg-movie-reverse.mp4";

  $: if (videoEl) {
    videoEl.playbackRate = speed;
    videoEl.src = isOpposite ? bgRevMoviePath : bgMoviePath;
    videoEl.load();
    videoEl.play();
  }
</script>

<video
  class="w-full h-full object-cover"
  bind:this={videoEl}
  muted
  autoplay
  playsinline
  loop
/>
