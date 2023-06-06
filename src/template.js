import "./styles.scss";

let inputWidth = document.getElementById("width");
let inputHeight = document.getElementById("height");
let inputProbability = document.getElementById("probability");
let startButton = document.getElementById("start");
let forestContainer = document.getElementById("forest");

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

  log() {
    console.log(this.getForestText());
  }

  display() {
    forestContainer.innerHTML = "";
    for (let i = 0; i < this.width * this.height; i++) {
      let cell = document.createElement("p");
      cell.innerHTML = this.forestTab[i];
      forestContainer.appendChild(cell);
    }
  }

  getCellNumberByCoord(x, y) {
    return x + y * this.width;
  }

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
   * TODO
   * fillByTree (fill the forest with tree according to the probability)
   * startFire (start fire at x, y)
   * startRandomFire (start random fire)
   * propagation (propagate fire to Nord, West, South, East) (return true if fire propagate else false) + display
   */

  fillByTree() {}

  startFire(x, y) {}

  startRandomFire() {}

  propagation() {}
}

function start() {
  const width = inputWidth.value;
  const height = inputHeight.value;
  const probability = inputProbability.value;

  setGridTemplate(width);
  const forest = new Forest(height, width, probability);
  /**
   * TODO
   * Create a forest.
   * Start two fires.
   * Animate the fire propagation using the play() method.
   */
}

/**
 * Set the css attribut grid template according to the width so the forest is displayed correctly.
 *
 * @param {int} width
 */
function setGridTemplate(width) {
  forestContainer.style.gridTemplateColumns = "1fr ".repeat(width);
}

/**
 * Sleep for a given time.
 *
 * @param {int} time
 * @returns
 */
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
