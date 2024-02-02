import "./styles.scss";

const inputWidth = document.getElementById("width");
const inputHeight = document.getElementById("height");
const inputProbability = document.getElementById("probability");
const inputNumberOfFire = document.getElementById("number-of-fire");
const startButton = document.getElementById("start");
const forestContainer = document.getElementById("forest");

startButton.addEventListener("click", start);

const ForestCell = {
  empty: "✖️",
  rock: "🗻",
  tree: "🌳",
  fire: "🔥",
  burned: "⬛",
};

class Forest {
  forestTab = [ForestCell];
  height = 0;
  width = 0;
  probability = 0;

  constructor(height, width, probability) {
    this.height = height;
    this.width = width;
    this.probability = probability;
    this.forestTab = Array(width * height).fill(ForestCell.empty);
  }

  //Display the Forest as a String. Formated like a 2D table
  getForestText() {
    let text = "";

    for (let i = 0; i < this.width * this.height; i++) {
      if (i !== 0 && i % this.width === 0) {
        text += "\n";
      }

      text += this.forestTab[i];
    }

    return text;
  }

  //Log the Forest in the console
  log() {
    console.log(this.getForestText());
  }

  //Display the Forest in the HTML.
  display() {
    forestContainer.innerHTML = "";
    for (let i = 0; i < this.width * this.height; i++) {
      let cell = document.createElement("p");
      cell.innerHTML = this.forestTab[i];
      forestContainer.appendChild(cell);
    }
  }

  //Return the cell number in the ForestTab according to the x and y coord
  getCellNumberByCoord(x, y) {
    return x + y * this.width;
  }

  //Play the propagation of the fire while there is fire in the Forest
  play() {
    if (this.propagation()) {
      sleep(500).then(() => {
        this.play();
      });
    } else {
      return;
    }
  }

  /**
   * Todo
   * fillByTree (fill the forest with tree according to the probability)
   * startFire (start fire at x, y)
   * startRandomFire (start random fire)
   * propagation (propagate fire to Nord, West, South, East) (return true if fire propagate else false) + display
   */

  //Fill the Forest with tree according to the probability
  fillByTree() {}

  //Start fire at x, y
  startFire(x, y) {}

  //Start random fire
  startRandomFire() {}

  //Call x times the startRandomFire() function
  startXRandomFire(x) {}

  //Propagate fire to Nord, West, South, East
  propagation() {}
}

function start() {
  const width = inputWidth.value;
  const height = inputHeight.value;
  const probability = inputProbability.value;
  const numberOfFire = inputNumberOfFire.value;

  setGridTemplate(width);
  const forest = new Forest(height, width, probability);
  /**
   * TODO
   * Create a forest.
   * Start two fires.
   * Animate the fire propagation using the play() method.
   */
}

//Set the grid template according to the width
function setGridTemplate(width) {
  forestContainer.style.gridTemplateColumns = "1fr ".repeat(width);
}

//Sleep function
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
