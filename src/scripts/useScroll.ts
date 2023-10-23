export function getScrollPosition() {
  const total = document.body.offsetHeight - window.innerHeight;
  if (total === 0) return 0;
  const { scrollY } = window;
  return scrollY / total;
}
