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
   * Todo
   * fillByTree (fill the forest with tree according to the probability)
   * startFire (start fire at x, y)
   * startRandomFire (start random fire)
   * propagation (propagate fire to Nord, West, South, East) (return true if fire propagate else false) + display
   */

  fillByTree() {
    for (let i = 0; i < this.width * this.height; i++) {
      if (this.probability >= Math.random()) {
        this.forestTab[i] = ForestCell.tree;
      } else {
        this.forestTab[i] = ForestCell.rock;
      }
    }
  }

  startFire(x, y) {
    if (this.forestTab[this.getCellNumberByCoord(x, y)] === ForestCell.tree) {
      this.forestTab[this.getCellNumberByCoord(x, y)] = ForestCell.fire;
    }
  }

  startRandomFire() {
    if (this.forestTab.includes(ForestCell.tree)) {
      let allume = false;

      while (!allume) {
        let random = Math.floor(Math.random() * (this.width * this.height));

        if (this.forestTab[random] === ForestCell.tree) {
          this.forestTab[random] = ForestCell.fire;
          allume = true;
        }
      }
    }
  }

  propagation() {
    if (this.forestTab.includes(ForestCell.fire)) {
      let fireTab = "";
      for (let i = 0; i < this.height; i++) {
        //y
        for (let j = 0; j < this.width; j++) {
          //x
          if (
            this.forestTab[this.getCellNumberByCoord(j, i)] === ForestCell.fire
          ) {
            fireTab += [j + "," + i + "|"];
          }
        }
      }

      fireTab = fireTab.split("|");
      fireTab.pop();

      fireTab.forEach((coord) => {
        let xy = coord.split(",");
        let x = Number(xy[0]);
        let y = Number(xy[1]);

        //Nord
        if (y > 0) {
          this.startFire(x, y - 1);
        }

        //Sud
        if (y < this.height - 1) {
          this.startFire(x, y + 1);
        }

        //Ouest
        if (x > 0) {
          this.startFire(x - 1, y);
        }
        //Est
        if (x < this.width - 1) {
          this.startFire(x + 1, y);
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
  let width = inputWidth.value;
  let height = inputHeight.value;
  let probability = inputProbability.value;

  setGridTemplate(width);
  //---------------
  let forest = new Forest(height, width, probability);
  forest.fillByTree();
  forest.log();
  forest.startRandomFire();
  forest.startRandomFire();
  forest.startRandomFire();
  forest.play();
}

function setGridTemplate(width) {
  forestContainer.style.gridTemplateColumns = "1fr ".repeat(width);
}

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
