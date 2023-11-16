<script lang="ts">
  import { onDestroy, onMount } from "svelte";
  import { videoStore } from "../stores/videoCache";
  export let url: string;

  let cachedUrl: string;
  let loading = true;
  let unsubscribe: () => void;

  onMount(() => {
    unsubscribe = videoStore.subscribe((store) => {
      cachedUrl = store[url];
      loading = cachedUrl === undefined;
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });
</script>

<div class="container">
  <div class="loading {loading ? '' : 'fade-out'}" />
  <video src={cachedUrl} autoplay playsinline muted loop />
</div>

<style>
  .container {
    position: relative;
  }
  .loading {
    position: absolute;
    background: rgb(var(--purple3));
    width: 100%;
    height: 100%;
    z-index: 1000;
    opacity: 1;
  }

  .fade-out {
    animation: disappear 2s ease-out forwards;
  }

  @keyframes disappear {
    from {
      opacity: 1;
      display: initial;
    }
    to {
      opacity: 0;
      display: done;
    }
  }
</style>
