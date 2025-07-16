// script.js

function dragElement(terrariumElement) {
  let pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0;
}

const plants = Array.from({ length: 12 }, (_, i) => document.getElementById(`plant${i + 1}`));
// Using a for loop to get plant elements and store them in the plants array
// const plants = [];
// for (let i = 1; i <= 12; i++) {
//   plants.push(document.getElementById(`plant${i}`));
// }
const [
  plant1, plant2, plant3, plant4, plant5, plant6,
  plant7, plant8, plant9, plant10, plant11, plant12
] = plants;
// Error Handling
if (!plant1) {
  console.warn("Element with id 'plant2' was not found in the DOM.");
}
if (!plant2) {
  console.warn("Element with id 'plant2' was not found in the DOM.");
}
if (!plant3) {
  console.warn("Element with id 'plant2' was not found in the DOM.");
}


// End of error handling
if (plant1) dragElement(plant1);
if (plant2) dragElement(plant2);