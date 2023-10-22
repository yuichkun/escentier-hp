import GUI from "lil-gui";
const gui = new GUI();

const store = {
  hideAxis: false,
  autoRotate: false,
};

export const axisController = gui.add(store, "hideAxis"); // Checkbox
export const autoRotateController = gui.add(store, "autoRotate"); // Checkbox

gui.hide();
export default gui;
