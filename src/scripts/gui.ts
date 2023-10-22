import GUI from "lil-gui";
const gui = new GUI();

const store = {
  myBoolean: true,
  myString: "lil-gui",
  myNumber: 1,
  hideAxis: false,
};

export const axisController = gui.add(store, "hideAxis"); // Checkbox
gui.add(store, "myString"); // Text Field
gui.add(store, "myNumber"); // Number Field

// Add sliders to number fields by passing min and max
gui.add(store, "myNumber", 0, 1);
gui.add(store, "myNumber", 0, 100, 2); // snap to even numbers

// Create dropdowns by passing an array or object of named values
gui.add(store, "myNumber", [0, 1, 2]);
gui.add(store, "myNumber", { Label1: 0, Label2: 1, Label3: 2 });

// Chainable methods

// Create color pickers for multiple color formats
const colorFormats = {
  string: "#ffffff",
  int: 0xffffff,
  object: { r: 1, g: 1, b: 1 },
  array: [1, 1, 1],
};

gui.addColor(colorFormats, "string");

gui.hide();
export default gui;
