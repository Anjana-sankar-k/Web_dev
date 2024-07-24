let xp = 0;
let health = 100;
let gold = 50;
let currentWeapon = 0;
let fighting;
let monsterHealth;
let inventory = ["stick"];


const button1 = document.querySelector("#button1");
const button2 = document.querySelector("#button2");
const button3 = document.querySelector("#button3");
const text = document.querySelector("#text");
const xpText = document.querySelector("#xpText");
const healthText = document.querySelector("#healthText");
const goldText = document.querySelector("#goldText");
const monsterStats = document.querySelector("#monsterStats");
const monsterNameText = document.querySelector("#monsterNameText");
const monsterHealthText = document.querySelector("#monsterHealthText");

const weapons = [
  {
    name: "stick",
    power: 5
  },
  {
    name: "dagger",
    power: 30
  },
  {
    name: "claw hammer",
    power: 50
  },
  {
    name: "sword",
    power: 100
  }
];

const monsters = [
  {
    name: "slime", 
    level: 2, 
    health: 15
  }, 
  {
    name: "fanged beast",
    level: 8, 
    health: 60
  },
  {
    name: "dragon",
    level:20,
    health:300
  }
];

// Locations
const locations = [
  {
    name: "town square",
    buttonText: ["go to store", "go to cave", "fight dragon"],
    buttonFunctions: [goStore, goCave, fightDragon],
    text: "You are in the town square. You see a sign that says store"
  },
  {
    name: "store",
    buttonText: ["buy health (10 gold)", "buy weapon (30 gold)", "go to town square"],
    buttonFunctions: [buyHealth, buyWeapon, goTown],
    text: "You enter the store"
  },
  {
    name: "cave",
    buttonText: ["fight slime", "fight fanged beast", "go to town square"],
    buttonFunctions:[fightSlime, fightBeast, goTown],
    text: "You enter the cave. You see some monsters."
  },
  {
    name: "fight",
    buttonText: ["attack", "dodge", "run"],
    buttonFunctions: [attack, dodge, goTown],
    text: "You are fighting a monster."
  },
  {
    name: "kill monster",
    buttonText: ["go to town square", "go to town square", "go to town square"],
    buttonFunctions: [goTown, goTown, easterEgg],
    text: "The monster screams 'Arg!' as it dies. You gain experience points and find gold."
  },
  {
    name: "lose",
    buttonText: ["REPLAY?", "REPLAY?", "REPLAY?"],
    buttonFunctions: [restart, restart, restart],
    text: "You die."
  }

];

button1.onclick = goStore;
button2.onclick = goCave;
button3.onclick = fightDragon;

function update(location){
  button1.innerText = location.buttonText[0];
  button2.innerText = location.buttonText[1];
  button3.innerText = location.buttonText[2];
  button1.onclick = location.buttonFunctions[0];
  button2.onclick = location.buttonFunctions[1];
  button3.onclick = location.buttonFunctions[2];
  text.innerText = location.text;
}

// Initialize functions
function goTown(){
  update(locations[0]);
  console.log("Going to town square")
}

function goStore() {
  update(locations[1]);
  console.log("Going to store")
}

function goCave() {
  update(locations[2]);
  console.log("Going to cave.")
}

function buyHealth(){
    console.log("Bought health");
    if(gold >= 10){
      gold -= 10;
       health += 10;
       goldText.innerText = gold;
       healthText.innerText = health;
    } else{
      text.innerText = "You don't have enough gold to buy health.";
    }
}

function buyWeapon(){
  console.log("Bought weapon");
    if(currentWeapon < weapons.length - 1){
      if(gold >= 30){
        gold -= 30;
        currentWeapon++;
        goldText.innerText = gold;
        let newWeapon = weapons[currentWeapon].name;
        text.innerText = "You now have a " + weapons[currentWeapon].name + ".";
        inventory.push(newWeapon);
        text.innerText += " In your inventory you have: " + inventory;
      }
    }
    else{
      text.innerText = "You already have the most powerful weapon!";
      button2.innerText = "Sell weapon for 15 gold";
      button2.onclick = sellWeapon;
    }
}

function sellWeapon(){
  if(inventory.length > 1){
    gold += 15;
    goldText.innerText = gold;
    let currentWeapon = inventory.shift();
    text.innerText = "You sold a " + currentWeapon + ".";
    text.innerText += " In your inventory you have: " + inventory;
  }
  else{
    text.innerText = "Don't sell your only weapon!";
  }
}

function fightDragon(){
  console.log("Fighting the dragon.")
  fighting = 0;
  gofirst();
}

function fightSlime(){
  console.log("Fighting the slime");
  fighting = 1;
  gofirst();
}

function fightBeast(){
  console.log("Fighting the fanged beast");
  fighting = 2;
  gofirst();
}
function gofight(){
   console.log("ready to fight");
   update(locations[3]);
   monsterHealth = monsters[fighting].health;
   monsterStats.style.display = "block";
   monsterNameText.innerText = monsters[fighting].name;
   monsterHealthText.innerText = monsterHealth;
}

function attack(){
   console.log("ready to attack");
   text.innerText = "The " + monsters[fighting].name + " attacks.";
   text.innerText = "You attack it with your " + weapons[currentWeapon].name + ".";
  health -= monsters[fighting].level;
  monsterHealth -= weapons[currentWeapon].power + Math.floor(Math.random() * xp) + 1;
  healthText.innerText = health;
  monsterHealthText.innerText = monsterHealth;
  if(health <= 0){
    lose();
  }
  else if(monsterHealth <= 0){
    if(fighting === 2){
      wingame();
    }
    else{
      defeatMonster();
    }
  }
}

function dodge(){
   console.log("dodging");
   text.innerText = "You dodge the attack from the " + monsters[fighting].name + ".";
}

function defeatMonster(){
  gold += Math.floor(monsters[fighting].level * 6.7);
  xp += monsters[fighting].level;
  goldText.innerText = gold;
  xpText.innerText = xp;
  update(locations[4]);
}

function lose(){
  update(locations[5]);
}

function restart(){
  xp = 0;
  health = 100;
  gold = 50;
  currentWeapon = 0;
  inventory = ["stick"];
  goldText.innerText = gold;
  healthText.innerText = health;
  xpText.innerText = xp;
  goTown();
}