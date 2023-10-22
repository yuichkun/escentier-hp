import GUI from "lil-gui";
const gui = new GUI();
const myObject = {
  myBoolean: true,
  myString: "lil-gui",
  myNumber: 1,
};

gui.add(myObject, "myBoolean"); // Checkbox
gui.add(myObject, "myString"); // Text Field
gui.add(myObject, "myNumber"); // Number Field

// Add sliders to number fields by passing min and max
gui.add(myObject, "myNumber", 0, 1);
gui.add(myObject, "myNumber", 0, 100, 2); // snap to even numbers

// Create dropdowns by passing an array or object of named values
gui.add(myObject, "myNumber", [0, 1, 2]);
gui.add(myObject, "myNumber", { Label1: 0, Label2: 1, Label3: 2 });

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
