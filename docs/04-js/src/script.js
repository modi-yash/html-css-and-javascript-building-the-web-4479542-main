// script.js
function dragElement(terrariumElement) {
  let pos1 = 0,
    pos2 = 0,
    pos3 = 0,
    pos4 = 0;
  terrariumElement.onpointerdown = pointerDrag;
  // Using a for loop to get plant elements and store them in the plants array
  // const plants = [];
  // for (let i = 1; i <= 12; i++) {
  //   plants.push(document.getElementById(`plant${i}`));
  // }

  function elementDrag(e) {
    pos1 = pos3 - e.clientX;
    pos2 = pos4 - e.clientY;
    pos3 = e.clientX;
    pos4 = e.clientY;

    terrariumElement.style.top = (terrariumElement.offsetTop - pos2) + 'px';
    terrariumElement.style.left = (terrariumElement.offsetLeft - pos1) + 'px';
  }

  function stopElementDrag() {
    document.onpointerup = null;
    document.onpointermove = null;
    console.log(`${terrariumElement.id ? terrariumElement.id : 'unknown'} drag stopped`);
  }
  // e is the event object, because it is passed automatically by the browser,
  // from the function call above, at top of the script
  // This is a closure that allows us to access the terrariumElement variable
  function pointerDrag(e) {
    e.preventDefault();
    console.log(`${e.target.id ? e.target.id : 'unknown'} is being dragged`);
    pos3 = e.clientX;
    pos4 = e.clientY;
    document.onpointermove = elementDrag;
    document.onpointerup = stopElementDrag;
  }
}

const plants = Array.from({ length: 14 }, (_, i) => document.getElementById(`plant${i + 1}`));
const [
  plant1, plant2, plant3, plant4, plant5, plant6,
  plant7, plant8, plant9, plant10, plant11, plant12,
  plant13, plant14
] = plants;
// Error Handling
for (let plant of plants) dragElement(plant);
// Function to handle the drag functionality