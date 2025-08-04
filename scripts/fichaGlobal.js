// tormenta.js
document.addEventListener("DOMContentLoaded", () => {

  const tbody = document.getElementById("tabela-pericias");
  const idCount = {};
  const fragment = document.createDocumentFragment(); // melhora performance

  pericias.forEach(p => {
    let nomeIDBase = p.nome.toLowerCase().replace(/\s+/g, "");
    if (!idCount[nomeIDBase]) {
      idCount[nomeIDBase] = 1;
    } else {
      idCount[nomeIDBase]++;
    }
    const nomeID = idCount[nomeIDBase] === 1 ? nomeIDBase : `${nomeIDBase}${idCount[nomeIDBase]}`;
    const linha = document.createElement("tr");

    // Checkbox
    const tdCheck = document.createElement("td");
    const check = document.createElement("input");
    check.type = "checkbox";
    check.id = `check-${nomeID}`;
    check.name = `check-${nomeID}`;
    tdCheck.appendChild(check);
    linha.appendChild(tdCheck);

    // Nome com símbolos
    const tdNome = document.createElement("td");
    const nomeP = document.createElement("p");
    let classes = [];
    if (somenteTreinado.includes(p.nome)) classes.push("treinada");
    if (penalidade.includes(p.nome)) classes.push("penalidade");

    nomeP.className = classes.join(" ");
    nomeP.textContent = p.nome;

    // símbolo compatível com múltiplas classes
    let simbolo = "";
    if (classes.includes("treinada")) simbolo += "✯";
    if (classes.includes("penalidade")) simbolo += " ✠";
if (simbolo) nomeP.setAttribute("data-symbol", simbolo.trim());

    if (p.nome.toLowerCase() === "ofício") {
      const input = document.createElement("input");
      input.type = "text";
      input.id = `oficio-sub-${nomeID}`;
      input.style.cssText = "display:inline-block;width:80px;font-size:0.75rem;margin-left:4px;";
      nomeP.appendChild(document.createTextNode(" "));
      nomeP.appendChild(input);
    }

    tdNome.appendChild(nomeP);
    linha.appendChild(tdNome);

    linha.innerHTML += `
      <td class="totalIgual"><input type="text" readonly id="total-${nomeID}" value="0"></td>
      <td><input type="text" readonly class="periciaNivel" id="nivel-${nomeID}" value="0"></td>
      <td>
        <select class="atributoSkill" id="atributo-${nomeID}">
          <option value="For" ${p.atributo === "For" ? "selected" : ""}>For</option>
          <option value="Des" ${p.atributo === "Des" ? "selected" : ""}>Des</option>
          <option value="Con" ${p.atributo === "Con" ? "selected" : ""}>Con</option>
          <option value="Int" ${p.atributo === "Int" ? "selected" : ""}>Int</option>
          <option value="Sab" ${p.atributo === "Sab" ? "selected" : ""}>Sab</option>
          <option value="Car" ${p.atributo === "Car" ? "selected" : ""}>Car</option>
        </select>
      </td>
      <td><input type="text" readonly id="treino-${nomeID}" value="0"></td>
      <td class="maisOutros"><input type="number" class="outrosSkill" id="outros-${nomeID}" name="outros-${nomeID}"></td>
    `;

    fragment.appendChild(linha);
  });
  tbody.appendChild(fragment); 
  });

function atualizarNivelPericia(nomeID) {
  const nivelGeral = parseInt(nivelInput.value) || 0;

  // 1. Atualizar o valor de treino-${nomeID}
  const checkbox = document.getElementById(`check-${nomeID}`);
  const treino = document.getElementById(`treino-${nomeID}`);

  if (checkbox && treino) {
    let bonusTreino = 0;

    if (checkbox.checked) {
      if (nivelGeral < 7) {
        bonusTreino = 2;
      } else if (nivelGeral < 15) {
        bonusTreino = 4;
      } else {
        bonusTreino = 6;
      }
    }

    treino.value = bonusTreino;
  }

  // 2. Atualizar o valor de nivel-${nomeID}
  const nivelPericia = document.getElementById(`nivel-${nomeID}`);
  if (nivelPericia) {
    nivelPericia.value = Math.floor(nivelGeral / 2);
  }
}


function atualizarTotalPericia(nomeID) {
  const nivelInputLocal = document.getElementById(`nivel-${nomeID}`);
  const treinoInput = document.getElementById(`treino-${nomeID}`);
  const outrosInput = document.getElementById(`outros-${nomeID}`);
  const atributoSelect = document.getElementById(`atributo-${nomeID}`);
  const totalInput = document.getElementById(`total-${nomeID}`);
  const check = document.getElementById(`check-${nomeID}`);

  if (
    !nivelInputLocal || !check || !totalInput || 
    !atributoSelect || !treinoInput || !outrosInput
  ) return;

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

  const totalBase = nivel + treino + valorAtributo + outros;
  let total = totalBase;

  if (isPenalized) {
    total -= (armorPen + shieldPen);
  }

  totalInput.value = total;
}

function defCalc() {
  defArmor.value = armorBonus.value;
  defShield.value = shieldBonus.value;

  const valArmor = Number(defArmor.value) || 0;
  const valShield = Number(defShield.value) || 0;
  const valOthers = Number(defOthers.value) || 0;

  let valAttr = 0;

  // Verifica se a checkbox está ativa
  const ableDefAttrChecked = document.getElementById('ableDefAttr').checked;

  if (!ableDefAttrChecked) {
    // Só calcula o atributo se a checkbox NÃO estiver marcada
    switch (defenseAttr.value) {
      case "for": valAttr = parseInt(forInput.value) || 0; break;
      case "des": valAttr = parseInt(dexInput.value) || 0; break;
      case "con": valAttr = parseInt(conInput.value) || 0; break;
      case "int": valAttr = parseInt(intInput.value) || 0; break;
      case "sab": valAttr = parseInt(sabInput.value) || 0; break;
      case "car": valAttr = parseInt(carInput.value) || 0; break;
    }
  } else {
    // Checkbox ativa => valAttr fica 0 (já está no início)
    valAttr = 0;
  }

  defAttr.value = valAttr;

  const defBase = 10;
  const total = defBase + valAttr + valArmor + valShield + valOthers;

  defInput.value = total;
}




// Adiciona o listener para cada input
const inputs = [
  nivelInput, forInput, dexInput, conInput, intInput, sabInput, carInput,
  defOthers, defenseAttr, armorBonus, shieldBonus, armorPenality, 
  shieldPenality
];


inputs.forEach(input => {
  if (input) {
    input.addEventListener("input", atualizarTudo);
  }
});

// 2. Listeners globais para inputs e selects dinâmicos
document.addEventListener("input", function (e) {
  const el = e.target;

  // Só dispara atualizarTudo se for input criado dinamicamente
  if (el.id?.startsWith("outros-")) {
    atualizarTudo();
  }
});

document.addEventListener("change", function (e) {
  const el = e.target;

  // Dispara atualizarTudo para selects e checkboxes criados dinamicamente
  if (
    (el.tagName === "SELECT" && el.id.startsWith("atributo-")) ||
    (el.type === "checkbox" && el.id.startsWith("check-"))
  ) {
    atualizarTudo();
  }
});



function atualizarTudo() {
  document.querySelectorAll(".periciaNivel").forEach(el => {
    const nomeID = el.id.replace("nivel-", "");
    atualizarNivelPericia(nomeID);
    atualizarTotalPericia(nomeID);
  });
  defCalc();
}

