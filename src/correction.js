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

  //Fill the Forest with tree according to the probability
  startXNumberOfRandomFire(number) {
    for (let i = 0; i < number; i++) {
      this.startRandomFire();
    }
  }

  //Play the propagation of the fire while there is fire in the Forest
  play() {
    if (this.propagation()) {
      sleep(350).then(() => {
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
  fillByTree() {
    for (let i = 0; i < this.width * this.height; i++) {
      if (this.probability >= Math.random()) {
        this.forestTab[i] = ForestCell.tree;
      } else {
        this.forestTab[i] = ForestCell.rock;
      }
    }
  }

  //Start fire at x, y
  startFire(x, y) {
    if (this.forestTab[this.getCellNumberByCoord(x, y)] === ForestCell.tree) {
      this.forestTab[this.getCellNumberByCoord(x, y)] = ForestCell.fire;
    }
  }

  //Start random fire
  startRandomFire() {
    if (this.forestTab.includes(ForestCell.tree)) {
      let bool = true;

      while (bool) {
        let random = Math.floor(Math.random() * (this.width * this.height));

        if (this.forestTab[random] === ForestCell.tree) {
          this.forestTab[random] = ForestCell.fire;
          bool = false;
        }
      }
    }

    return undefined;
  }

  //Propagate fire to Nord, West, South, East
  propagation() {
    if (this.forestTab.includes(ForestCell.fire)) {
      let fireTab = "";
      for (let i = 0; i < this.width; i++) {
        for (let j = 0; j < this.height; j++) {
          if (
            this.forestTab[this.getCellNumberByCoord(i, j)] === ForestCell.fire
          ) {
            fireTab += [i + "," + j + "|"];
          }
        }
      }

      fireTab = fireTab.split("|");
      fireTab.pop();

      fireTab.forEach((coord) => {
        let xy = coord.split(",");
        let x = Number(xy[0]);
        let y = Number(xy[1]);

        if (y !== 0) {
          //north
          this.startFire(x, y - 1);
        }
        if (x !== this.width - 1) {
          //east
          this.startFire(x + 1, y);
        }
        if (y !== this.height - 1) {
          //south
          this.startFire(x, y + 1);
        }
        if (x !== 0) {
          //west
          this.startFire(x - 1, y);
        }

        this.forestTab[this.getCellNumberByCoord(x, y)] = ForestCell.burned;
      });
      this.display();
      return true;
    } else {
      this.display();
      return false;
    }
  }
}

function start() {
  const width = inputWidth.value;
  const height = inputHeight.value;
  const probability = inputProbability.value;
  const numberOfFire = inputNumberOfFire.value;

  setGridTemplate(width);
  let forest = new Forest(height, width, probability);
  forest.fillByTree();
  forest.startXNumberOfRandomFire(numberOfFire);
  forest.display();
  forest.play();
}

//Set the grid template according to the width
function setGridTemplate(width) {
  forestContainer.style.gridTemplateColumns = "1fr ".repeat(width);
}

//Sleep function
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

//: ## Exercice 2 : Écrire la classe `Forest`
//: La forêt contient un tableau de `ForestCell` et l'initialiseur prend sa largeur et sa hauteur en paramètres.
//: * Note: Voir l'initialiseur `init(repeating:count:)`de `Array`.

//: ## Exercice 3 : Écrire un `subscript` pour accéder aux cellules de la forêt.
//: On doit pouvoir accéder aux cellules par leurs coordonnées x,y plutôt que par leur index dans le tableau.
//: ## Exercice 4 : Afficher la forêt
//: Conformer le type `Forest` au protocole `CustomStringConvertible` pour pouvoir afficher la forêt.
//: ## Exercice 5 : Remplir la forêt d'arbres
//: Écrire la méthode `fill(with cell: ForestCell, probability: Double = 0.6)` qui remplit la forêt avec la cellule passée en paramètre avec la probabilité donnée.
//: * Note: Voir la méthode `random(in:)` de `Double` pour gérer la probabilité.
//: ## Exercice 6 : Allumer le feu...
//: Écrire la méthode `startFire(x: Int, y:Int)` qui met le feu à la case x,y uniquement si c'est un arbre.
//: ## Exercice 7 : Pyromane !
//: Écrire la méthode `startRandomFire()` qui met le feu à une case d'arbre au hasard.
//: * Note: S'il n'y a plus d'arbre cette méthode ne fait rien.
//: ## Exercice 8 : Propagation de l'incendie...
//: Écrire la méthode `propagation()` qui va propager le feu suivant les règles suivantes :
//: * Un arbre en feu met le feu à ses voisins 4-connexes (Nord, Est, Sud et Ouest)
//: * Un arbre en feu devient un arbre brûlé
//: * la méthode renvoie `false` s'il ne reste plus d'arbre en feu, `true` sinon.
//: ## Exercice 9 : Animer un incendie
//: * Créer une forêt
//: * Démarrez deux feux
//: * Animez la propagation du feu
