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
   * fillByTree (remplir la forêt de tree selon la probabilité)
   * startFire (allume un feu à la position x, y)
   * startRandomFire (allume un feu à une position aléatoire)
   * propagation (propage le feu au Nord, Ouest, Sud, Est) (retourne vrais si le feu s'est propagé, sinon retourne faux) + display()
   */

  fillByTree() {}

  startFire(x, y) {}

  startRandomFire() {}

  propagation() {
    //TODO
    this.display();
  }
}

function start() {
  const width = inputWidth.value;
  const height = inputHeight.value;
  const probability = inputProbability.value;

  setGridTemplate(width);
  const forest = new Forest(height, width, probability);
  /**
   * TODO
   * Creer une forêt.
   * Allumer deux feux.
   * Animer la propagation du feu en utilisant la méthode play().
   */
}

/**
 * Definie le template css grid selon la largeur pour que la forêt soit affichée correctement.
 *
 * @param {int} width
 */
function setGridTemplate(width) {
  forestContainer.style.gridTemplateColumns = "1fr ".repeat(width);
}

/**
 * Dors pendant un temps donné.
 *
 * @param {int} time
 * @returns
 */
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
