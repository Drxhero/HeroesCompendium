//tormenta20.js

const nivelInput = document.getElementById("level");
nivelInput.addEventListener('input', () => {
  let valor = parseInt(nivelInput.value);
  if (valor > 20) {
    nivelInput.value = 20;
  } else if (valor < 1) {
    nivelInput.value = 1;
  }
});
// Atributos principais
const forInput = document.getElementById("for");
const dexInput = document.getElementById("dex");
const conInput = document.getElementById("con");
const intInput = document.getElementById("int");
const sabInput = document.getElementById("sab");
const carInput = document.getElementById("car");

// Pontos de Vida e Mana
const pvMaxInput = document.getElementById("pv");
const pvAtualInput = document.getElementById("pva");
const pmMaxInput = document.getElementById("pm");
const pmAtualInput = document.getElementById("pma");

// Defesa
const defenseAttr = document.getElementById("defenseAttr");
const defArmor = document.getElementById('defArmor');
const defShield = document.getElementById('defShield');
const defOthers = document.getElementById("defOthers");
const ableDefAttr = document.querySelectorAll('input[type="checkbox"]');

const defAttr = document.getElementById('defAttr');
const defInput = document.getElementById("def");

// Armadura e Escudo
const armorBonus = document.getElementById("armorBonus");
const shieldBonus = document.getElementById("shieldBonus");
const armorPenality = document.getElementById("armorPenality");
const shieldPenality = document.getElementById("shieldPenality");
// Carga e Dinheiro
const dinheiroInput = document.getElementById("money");
const cargaMaxInput = document.getElementById("maxLoad");


const pericias = [
  { nome: "Acrobacia", atributo: "Des" },
  { nome: "Adestramento", atributo: "Car" },
  { nome: "Atletismo", atributo: "For" },
  { nome: "Atuação", atributo: "Car" },
  { nome: "Cavalgar", atributo: "Des" },
  { nome: "Conhecimento", atributo: "Int" },
  { nome: "Cura", atributo: "Sab" },
  { nome: "Diplomacia", atributo: "Car" },
  { nome: "Enganação", atributo: "Car" },
  { nome: "Fortitude", atributo: "Con" },
  { nome: "Furtividade", atributo: "Des" },
  { nome: "Guerra", atributo: "Int" },
  { nome: "Iniciativa", atributo: "Des" },
  { nome: "Intimidação", atributo: "Car" },
  { nome: "Investigação", atributo: "Int" },
  { nome: "Intuição", atributo: "Sab" },
  { nome: "Jogatina", atributo: "Car" },
  { nome: "Ladinagem", atributo: "Des" },
  { nome: "Luta", atributo: "For" },
  { nome: "Misticismo", atributo: "Int" },
  { nome: "Nobreza", atributo: "Int" },
  { nome: "Ofício", atributo: "Int" },
  { nome: "Ofício", atributo: "Int" },
  { nome: "Percepção", atributo: "Sab" },
  { nome: "Pilotagem", atributo: "Des" },
  { nome: "Pontaria", atributo: "Des" },
  { nome: "Reflexos", atributo: "Des" },
  { nome: "Religião", atributo: "Sab" },
  { nome: "Sobrevivência", atributo: "Sab" },
  { nome: "Vontade", atributo: "Sab" }
];
  const somenteTreinado = [
  "Adestramento","Conhecimento","Guerra","Jogatina","Ladinagem",
  "Misticismo","Nobreza","Ofício","Pilotagem","Religião"
];
  const penalidade = ["Acrobacia","Furtividade","Ladinagem"];
