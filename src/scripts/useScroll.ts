export function getScrollPosition() {
  const total = document.body.offsetHeight - window.innerHeight;
  const { scrollY } = window;
  return scrollY / total;
}
