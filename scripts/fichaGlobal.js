// fichaGlobal.js
document.addEventListener("DOMContentLoaded", () => {
  const tbody = document.getElementById("tabela-pericias");
  const fragment = document.createDocumentFragment();

  pericias.forEach((p, index) => {
    const nomeID = p.nome.toLowerCase().replace(/\s+/g, "");
    const numeroID = index + 1;

    const linha = document.createElement("tr");

    // CHECKBOX
    const tdCheck = document.createElement("td");
    const inputCheck = document.createElement("input");
    inputCheck.type = "checkbox";
    inputCheck.id = `check_${nomeID}`;
    inputCheck.name = `check_${numeroID}`;
    tdCheck.appendChild(inputCheck);
    linha.appendChild(tdCheck);

    // NOME COM CLASSES E SÍMBOLOS
    const tdNome = document.createElement("td");
    const nomeP = document.createElement("p");
    let classes = [];

    if (somenteTreinado.includes(p.nome)) classes.push("treinada");
    if (penalidade.includes(p.nome)) classes.push("penalidade");

    nomeP.className = classes.join(" ");
    nomeP.textContent = p.nome;

    let simbolo = "";
    if (classes.includes("treinada")) simbolo += "✯";
    if (classes.includes("penalidade")) simbolo += " ✠";
    if (simbolo) nomeP.setAttribute("data-symbol", simbolo.trim());

    // CAMPO ESPECIAL PARA OFÍCIO
    if (p.nome.toLowerCase() === "ofício") {
      const oficioInput = document.createElement("input");
      oficioInput.type = "text";
      oficioInput.id = `oficio_sub_${nomeID}`;
      oficioInput.style.cssText =
        "display:inline-block;width:80px;font-size:0.75rem;margin-left:4px;";
      nomeP.appendChild(document.createTextNode(" "));
      nomeP.appendChild(oficioInput);
    }

    tdNome.appendChild(nomeP);
    linha.appendChild(tdNome);

    // TOTAL
    const tdTotal = document.createElement("td");
    tdTotal.className = "totalIgual";
    const inputTotal = document.createElement("input");
    inputTotal.type = "text";
    inputTotal.readOnly = true;
    inputTotal.id = `total_${nomeID}`;
    inputTotal.value = "0";
    tdTotal.appendChild(inputTotal);
    linha.appendChild(tdTotal);

    // NÍVEL DA PERÍCIA
    const tdNivel = document.createElement("td");
    const inputNivel = document.createElement("input");
    inputNivel.type = "text";
    inputNivel.readOnly = true;
    inputNivel.className = "periciaNivel";
    inputNivel.id = `nivel_${nomeID}`;
    inputNivel.value = "0";
    tdNivel.appendChild(inputNivel);
    linha.appendChild(tdNivel);

    // SELECT DE ATRIBUTO
    const tdAttr = document.createElement("td");
    const select = document.createElement("select");
    select.className = "atributoSkill";
    select.id = `atributo_${nomeID}`;
    select.name = `atributo_${numeroID}`;

    const atributos = ["For", "Des", "Con", "Int", "Sab", "Car"];
    atributos.forEach((attr) => {
      const option = document.createElement("option");
      option.value = attr;
      option.textContent = attr;
      if (p.atributo === attr) option.selected = true;
      select.appendChild(option);
    });

    tdAttr.appendChild(select);
    linha.appendChild(tdAttr);

    // TREINO
    const tdTreino = document.createElement("td");
    const inputTreino = document.createElement("input");
    inputTreino.type = "text";
    inputTreino.readOnly = true;
    inputTreino.id = `treino_${nomeID}`;
    inputTreino.value = "0";
    tdTreino.appendChild(inputTreino);
    linha.appendChild(tdTreino);

    // OUTROS (usa ID por nome, NAME por número)
    const tdOutros = document.createElement("td");
    tdOutros.className = "maisOutros";
    const inputOutros = document.createElement("input");
    inputOutros.type = "number";
    inputOutros.className = "outrosSkill";
    inputOutros.id = `outros_${nomeID}`;
    inputOutros.name = `outros_${numeroID}`;
    tdOutros.appendChild(inputOutros);
    linha.appendChild(tdOutros);

    // Adiciona a linha ao fragmento
    fragment.appendChild(linha);
  });

  tbody.appendChild(fragment);
});

// === Funções de atualização ===
function atualizarNivelPericia(nomeID) {
  const nivelGeral = parseInt(nivelInput.value) || 0;

  const checkbox = document.getElementById(`check_${nomeID}`);
  const treino = document.getElementById(`treino_${nomeID}`);
  const nivelPericia = document.getElementById(`nivel_${nomeID}`);

  if (checkbox && treino) {
    let bonusTreino = 0;
    if (checkbox.checked) {
      if (nivelGeral < 7) bonusTreino = 2;
      else if (nivelGeral < 15) bonusTreino = 4;
      else bonusTreino = 6;
    }
    if (treino.value != bonusTreino) treino.value = bonusTreino;
  }

  if (nivelPericia) {
    const novoNivel = Math.floor(nivelGeral / 2);
    if (nivelPericia.value != novoNivel) nivelPericia.value = novoNivel;
  }
}
//AUTOCOMPLETAR
fetch("./data/tormenta20.json")
  .then(r => r.json())
  .then(data => {
    createAutocomplete("race", data.races);
    createAutocomplete("class", data.classes);
    createAutocomplete("origin", data.origins);
    createAutocomplete("deity", data.deities);
  });

function createAutocomplete(inputId, list) {
  const input = document.getElementById(inputId);
  const box = document.getElementById(inputId + "-list");
  const desc = document.getElementById(inputId + "-description");
  const dropBtn = document.querySelector(`[data-target="${inputId}"]`);
  box.setAttribute("data-autolist", "");

  function updateList() {
    const text = input.value.toLowerCase();

    // se tem texto → botão vira "✖"
    if (input.value.trim() !== "") {
      dropBtn.textContent = "✖";
    }

    box.innerHTML = "";
    box.style.display = "block";

    const filtered = list.filter(el =>
      el.name.toLowerCase().includes(text)
    );

    filtered.forEach(el => {
      const item = document.createElement("div");
      item.className = "item";
      item.textContent = el.name;

      item.addEventListener("mouseenter", () => {
        desc.style.display = "block";
        desc.textContent = el.description || "Sem descrição.";
      });

      item.addEventListener("mouseleave", () => {
        desc.style.display = "none";
      });

      item.addEventListener("click", () => {
        input.value = el.name;
        box.style.display = "none";
        desc.style.display = "none";
        dropBtn.textContent = "▼";
      });

      box.appendChild(item);
    });
  }

  // botão ▼ / ▲ / X
  if (dropBtn) {
    dropBtn.addEventListener("click", () => {

      // se o botão está em modo X (limpar)
      if (dropBtn.textContent === "✖") {
        input.value = "";
        box.style.display = "none";
        desc.style.display = "none";
        dropBtn.textContent = "▼";
        return;
      }

      // alternar visibilidade da lista
      closeAllAutocompleteLists(inputId);

      if (box.style.display === "block") {
        box.style.display = "none";
        desc.style.display = "none";
        dropBtn.textContent = "▼";
      } else {
        updateList();
        box.style.display = "block";
        dropBtn.textContent = "▲";
      }
    });
  }

  // abre quando foca
  input.addEventListener("focus", () => {
    if (input.value.trim() === "") {
      dropBtn.textContent = "▲";
    }
    closeAllAutocompleteLists(inputId);
    updateList();
  });

  // atualiza enquanto digita
  input.addEventListener("input", updateList);

  // esconde ao perder foco
  input.addEventListener("blur", () => {
    setTimeout(() => {
      box.style.display = "none";
      desc.style.display = "none";

      // troca o botão de volta
      if (input.value.trim() === "") {
        dropBtn.textContent = "▼";
      }else{
          dropBtn.textContent = "✖";
      }
    }, 150);
  });

  function closeAllAutocompleteLists(exceptId = null) {
    document.querySelectorAll("[data-autolist]").forEach(otherBox => {
      if (otherBox.id !== exceptId + "-list") {
        otherBox.style.display = "none";
      }
    });

 function updateButtonIcon(input, box, button) {
  if (input.value.trim() !== "") {
    button.textContent = "✖"; // campo preenchido = clear
  } else {
    if (box.style.display === "block") {
      button.textContent = "▲"; // aberto
    } else {
      button.textContent = "▼"; // fechado
    }
  }
}
  }
  
}





//Atualizar
function atualizarTotalPericia(nomeID) {
  const nivelInputLocal = document.getElementById(`nivel_${nomeID}`);
  const treinoInput = document.getElementById(`treino_${nomeID}`);
  const outrosInput = document.getElementById(`outros_${nomeID}`);
  const atributoSelect = document.getElementById(`atributo_${nomeID}`);
  const totalInput = document.getElementById(`total_${nomeID}`);
  const check = document.getElementById(`check_${nomeID}`);

  if (!nivelInputLocal || !treinoInput || !outrosInput || !atributoSelect || !totalInput || !check) return;

  const nivel = parseInt(nivelInputLocal.value) || 0;
  const treino = parseInt(treinoInput.value) || 0;
  const outros = parseInt(outrosInput.value) || 0;
  const armorPen = parseInt(armorPenality.value) || 0;
  const shieldPen = parseInt(shieldPenality.value) || 0;

  const atributo = atributoSelect.value.toLowerCase();

  let valorAtributo = 0;
  switch (atributo) {
    case "for": valorAtributo = parseInt(forInput.value) || 0; break;
    case "des": valorAtributo = parseInt(dexInput.value) || 0; break;
    case "con": valorAtributo = parseInt(conInput.value) || 0; break;
    case "int": valorAtributo = parseInt(intInput.value) || 0; break;
    case "sab": valorAtributo = parseInt(sabInput.value) || 0; break;
    case "car": valorAtributo = parseInt(carInput.value) || 0; break;
  }

  const pElemento = check.closest("tr")?.querySelector("p");
  const isSomenteTreinado = pElemento?.classList.contains("treinada");
  const isPenalized = pElemento?.classList.contains("penalidade");
  const isTreinado = check.checked;

  if (isSomenteTreinado && !isTreinado) {
    nivelInputLocal.value = 0;
    treinoInput.value = 0;
    totalInput.value = 0;
    return;
  }

  let total = nivel + treino + valorAtributo + outros;
  if (isPenalized) total -= (armorPen + shieldPen);

  totalInput.value = total;
}

function defCalc() {
  const valArmor = Number(armorBonus.value) || 0;
  const valShield = Number(shieldBonus.value) || 0;
  const valOthers = Number(defOthers.value) || 0;

  let valAttr = 0;
  const ableDefAttrChecked = document.getElementById("ableDefAttr").checked;

  if (!ableDefAttrChecked) {
    switch (defenseAttr.value) {
      case "for": valAttr = parseInt(forInput.value) || 0; break;
      case "des": valAttr = parseInt(dexInput.value) || 0; break;
      case "con": valAttr = parseInt(conInput.value) || 0; break;
      case "int": valAttr = parseInt(intInput.value) || 0; break;
      case "sab": valAttr = parseInt(sabInput.value) || 0; break;
      case "car": valAttr = parseInt(carInput.value) || 0; break;
    }
  }

  defAttr.value = valAttr;
  defInput.value = 10 + valAttr + valArmor + valShield + valOthers;
}

// === Listeners ===
const inputs = [
  nivelInput, forInput, dexInput, conInput, intInput, sabInput, carInput,
  defOthers, defenseAttr, armorBonus, shieldBonus, armorPenality, shieldPenality
];

inputs.forEach(input => {
  if (input) input.addEventListener("input", atualizarTudo);
});

document.addEventListener("input", (e) => {
  const el = e.target;
  if (el.id?.startsWith("outros_")) atualizarTudo();
});

document.addEventListener("change", (e) => {
  const el = e.target;
  if ((el.tagName === "SELECT" && el.id.startsWith("atributo_")) || 
      (el.type === "checkbox" && el.id.startsWith("check_"))) {
    atualizarTudo();
  }
});

// Atualiza tudo
function atualizarTudo() {
  document.querySelectorAll(".periciaNivel").forEach(el => {
    const nomeID = el.id.replace("nivel_", "");
    atualizarNivelPericia(nomeID);
    atualizarTotalPericia(nomeID);
  });
  defCalc();
}


