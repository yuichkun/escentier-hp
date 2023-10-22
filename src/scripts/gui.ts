import GUI from "lil-gui";
const gui = new GUI();

export const store = {
  hideAxis: false,
  autoRotate: false,
  heightNoiseAmp: 1.35,
  heightNoiseGrain: 0.26,
};

export const axisController = gui.add(store, "hideAxis"); // Checkbox
export const autoRotateController = gui.add(store, "autoRotate"); // Checkbox
export const heightNoiseAmpController = gui.add(
  store,
  "heightNoiseAmp",
  0,
  4,
  0.01,
);
export const heightNoiseGrainController = gui.add(
  store,
  "heightNoiseGrain",
  0,
  4,
  0.01,
);

gui.hide();
export default gui;
