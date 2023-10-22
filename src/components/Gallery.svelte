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
    min-height: 100vh;
    height: 300vh;
    background-color: rgb(var(--purple3));
    opacity: var(--alpha);
  }
</style>
