<script>
  let alpha = 0.2;

  const onScroll = () => {
    alpha = Math.min(window.scrollY / window.innerHeight, 1);
  };

  $: cssVarStyles = `--alpha:${alpha}`;
</script>

<svelte:window on:scroll={onScroll} />

<div class="section" style={cssVarStyles} />

<style>
  .section {
    height: 200vh;
    background-color: rgba(var(--purple3), var(--alpha));
  }
</style>
