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


  
