import lottie from "lottie-web";

type Arg = {
  container: HTMLElement;
  path: string;
};
export function startLoading({ container, path }: Arg) {
  const animation = lottie.loadAnimation({
    container,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path,
  });

  function stop() {
    animation.stop();
    container.remove();
  }

  return {
    stop,
  };
}
