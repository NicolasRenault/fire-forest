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

  //Affiche la forêt sous forme de texte. Formaté comme un tableau 2D
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

  //Affiche la forêt dans la console
  log() {
    console.log(this.getForestText());
  }

  //Affiche la forêt dans le HTML
  display() {
    forestContainer.innerHTML = "";
    for (let i = 0; i < this.width * this.height; i++) {
      let cell = document.createElement("p");
      cell.innerHTML = this.forestTab[i];
      forestContainer.appendChild(cell);
    }
  }

  //Retourne le numéro de la cellule dans le tableau de la forêt en fonction des coordonnées x et y
  getCellNumberByCoord(x, y) {
    return x + y * this.width;
  }

  //Joue la propagation du feu tant qu'il y a du feu dans la forêt
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

  //Rempli la forêt d'arbre en fonction de la probabilité
  fillByTree() {}

  //Démarre un feu à la coordonnée x, y
  startFire(x, y) {}

  //Démarre un feu aléatoire
  startRandomFire() {}

  //Appel x fois la méthode startRandomFire()
  startXRandomFire(x) {}

  //Propage le feu au Nord, Ouest, Sud, Est
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
   * Creer une forêt.
   * Allumer deux feux.
   * Animer la propagation du feu en utilisant la méthode play().
   */
}

//Défini le template de la grille en fonction de la largeur
function setGridTemplate(width) {
  forestContainer.style.gridTemplateColumns = "1fr ".repeat(width);
}

//Fonction sleep
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}
