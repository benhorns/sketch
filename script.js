/***
 * Color palettes. By default, grey is used.
 * randomColors is generated with the function stored in const RandomRGBColor see line 138.
 */
const palettes = {
  grey: ["#E8E8E8", "#D0D0D0", "#B0B0B0", "#909090", "#696969", "#505050", "#303030", "#101010"],
  roygbiv: ['white','red','orange','yellow','green','blue','purple','black'],
  randomColors:['white']
};

/***
 * Selectors for global DOM elements
 */
const container = document.querySelector('#container');

const div = document.createElement('div');
/* Creates the div element that will populate containers and will change colors according to user behavior*/

const resetBtn = document.querySelector('#reset');

const resizeBtn = document.querySelector('#resize');

const selector = document.querySelector('#select');

/* Global color selection, note the select element from the HTML page
AUTOMATICALLY generates a NodeList with .options as it's name  */
let userColor = selector.options[selector.selectedIndex].value;


console.log(userColor);

/* These numbers are based on what the container div is set to in the CSS
should be changed is the container is changed*/
const gridWidth = 400;
const gridHeight = 400;

/* This function is called by the event listener below that triggers
when the user makes a change to the select element on the webpage. It
updates the variable userColor which is used to change the colors of the
#etch Divs*/

function changePalette(e){

  userColor = selector.options[selector.selectedIndex].value;
  
}
selector.addEventListener("change", changePalette)

/*This function changes the color of the #etch divs populating the #container
div it is trigger by an event listener added to the #container below*/
function changeColor(e){
/* Mouse pass is a variable updated dynamically by the users behavior
here we are defining the variable and setting it equal to  the current
value of the attribute colorIndex at the time of the event. This varibale is
stored as an attribute in each #etch node in order to tell our function which color
it should be changing to next.*/
  let mousePass = e.target.getAttribute("colorIndex")
/* The colors stop incrementing once mousePass becomes equal to or more than
the length of the array in the palettes object. Each time the pass passes over
a #etch div, the value increments and the colorIndex attrbute is upated
the background color is updated using the palettes object above */
  if (mousePass < (palettes[userColor].length)){
  mousePass++
  e.target.setAttribute("colorIndex", mousePass)
  event.target.style.backgroundColor = palettes[userColor][mousePass]
  }
  else{
  }
  console.log(mousePass)
}
container.addEventListener('mouseover', changeColor);

/* the function is called here in order to initiate a container with
16 squares, this value is defined in the HTML line 13. It can be changed
dynamically through user input into the <input> element in the HTML.
*/
resizeGrid();

function resetGrid(){
      /* create a gridNode containing all the .etch cells */
      const gridNode = document.querySelectorAll(".etch")
      console.log(gridNode.length);
      /* Utilizing a forEach below, each cell from the gridNode above is
      passed in as an argument, the function sets the colorIndex attribute to 0
      and set's the background color back to the first position in the palette object
      which is white. */
      gridNode.forEach(function(cell){
      cell.setAttribute("colorIndex", 0);
      cell.style.backgroundColor = palettes[userColor][0];
  })
}

/* This function allows the user to resize the grid to contain a different
set of cells, they pass in number which is then squared and that value is used
to populate container with .etch divs*/
function resizeGrid(){
          /*Clears container entirely*/
          container.innerHTML = "" 
          /* Get user input from input tag*/
          let inputVal = input.value;
          /* Determine the sizes of the new cells */
          let newWidth = (gridWidth / inputVal);
          let newHeight = (gridHeight / inputVal); 
          let newGrid = (inputVal * inputVal);
          console.log(newWidth);
          console.log(newHeight);       
          console.log(newGrid);
          /* A for loop based on the squared value of the varibale defined
          above that populates #container with .etch divs */
          for(i=0; i<newGrid; i++){
          const div = document.createElement('div');
          div.classList.add('etch');
          div.setAttribute('colorIndex', 0);
          div.style.width = newWidth+"px";
          div.style.height = newHeight+"px";
          container.appendChild(div);
      }
}

resizeBtn.addEventListener('click', resizeGrid)

resetBtn.addEventListener('click', resetGrid)

/* the variable randomRGBCoor is assigned to the funciton below, which generates a random hexadecimal string */
 const randomRGBColor = function(){
  const options = '0123456789ABCDEF';
  let myReturn = "#";
  for(index=0;index<6; index++){
    myReturn += options[Math.floor(Math.random()*options.length)];
  }
  return myReturn;
};

/*This pushes the randomly generated colors above into the paelltes.randomColors array.*/
for(let i=0; i<palettes.grey.length; i++){
  palettes.randomColors.push(randomRGBColor() );
}
