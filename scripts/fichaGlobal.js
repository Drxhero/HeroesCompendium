// tormenta.js

document.addEventListener("DOMContentLoaded", () => {

  
  const tbody = document.getElementById("tabela-pericias");
  const idCount = {};

  const fragment = document.createDocumentFragment(); // melhora performance

  pericias.forEach(p => {
    let nomeIDBase = p.toLowerCase().replace(/\s+/g, "");
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
    if (somenteTreinado.includes(nomeID)) classes.push("treinada");
    if (penalidade.includes(nomeID)) classes.push("penalidade");
    nomeP.className = classes.join(" ");
    nomeP.textContent = p;
    if (classes.includes("treinada")) nomeP.setAttribute("data-symbol", "✯");
    else if (classes.includes("penalidade")) nomeP.setAttribute("data-symbol", "✠");

    if (p.toLowerCase() === "ofício") {
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
        <select id="atributo-${nomeID}">
          <option value="For" ${p.atributo === "For" ? "selected" : ""}>For</option>
          <option value="Des" ${p.atributo === "Des" ? "selected" : ""}>Des</option>
          <option value="Con" ${p.atributo === "Con" ? "selected" : ""}>Con</option>
          <option value="Int" ${p.atributo === "Int" ? "selected" : ""}>Int</option>
          <option value="Sab" ${p.atributo === "Sab" ? "selected" : ""}>Sab</option>
          <option value="Car" ${p.atributo === "Car" ? "selected" : ""}>Car</option>
        </select>
      </td>
      <td><input type="text" readonly id="treino-${nomeID}" value="0"></td>
      <td class="maisOutros"><input type="number" id="outros-${nomeID}" name="outros-${nomeID}"></td>
    `;

    fragment.appendChild(linha);
  });

  tbody.appendChild(fragment); // insere tudo de uma vez

 

});



function atualizarTotalPericia(nomeID) {
  const treinoInput = document.getElementById(`treino-${nomeID}`);
  const outrosInput = document.getElementById(`outros-${nomeID}`);
  const atributoSelect = document.getElementById(`atributo-${nomeID}`);
  const totalInput = document.getElementById(`total-${nomeID}`);
  const check = document.getElementById(`check-${nomeID}`);

  if (!nivelInput || !treinoInput || !outrosInput || !atributoSelect || !totalInput || !check) return;

  const nivel = parseInt(nivelInput.value) || 0;
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

  // Verifica se a perícia é "somente treinada"
  const pElemento = check.closest("tr")?.querySelector("p");
  const isSomenteTreinado = pElemento?.classList.contains("treinada");
  const isPenalized = pElemento?.classList.contains("penalidade");
  const isTreinado = check.checked;

  // Se for somente treinada e não estiver treinada, travar valores
  if (isSomenteTreinado && !isTreinado) {
    nivelInput.value = 0;
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

const inputs = [
  nivelInput, forInput, dexInput, conInput, intInput, sabInput, carInput,
  defOthers, defenseAttr, armorBonus, shieldBonus, armorPenality, shieldPenality
];

// Adiciona o listener para cada input
inputs.forEach(input => {
  if (input) {
    input.addEventListener("input", atualizarTudo);
  }
});

// Checkboxes (tipo "ableDefAttr") precisam de 'change', não 'input'
ableDefAttr.forEach(checkbox => {
  checkbox.addEventListener("change", atualizarTudo);
});


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




function atualizarTudo(nomeID) {
   document.querySelectorAll(".periciaNivel").forEach(el => {
    const nomeID = el.id.replace("nivel-", "");
    atualizarNivelPericia(nomeID);
    atualizarTotalPericia(nomeID);
    defCalc();  
  });
}

