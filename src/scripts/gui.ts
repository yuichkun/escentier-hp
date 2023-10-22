import GUI from "lil-gui";
const gui = new GUI();

export const store = {
  hideAxis: false,
  autoRotate: false,
  heightNoiseAmp: 0.3,
};

export const axisController = gui.add(store, "hideAxis"); // Checkbox
export const autoRotateController = gui.add(store, "autoRotate"); // Checkbox
export const heightNoiseAmpController = gui.add(
  store,
  "heightNoiseAmp",
  0,
  4,
  0.01
); // Checkbox

gui.hide();
export default gui;
