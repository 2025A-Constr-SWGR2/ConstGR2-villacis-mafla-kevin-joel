const GENDER_RATIOS = {
  male: 0.68,
  female: 0.55
};

/**
 * Calcula el BAC según la fórmula de Widmark.
 */
function calcularBAC(pesoKg, sexo, gramosAlcohol, horas) {
  const r = GENDER_RATIOS[sexo];
  const bac = (gramosAlcohol / (pesoKg * r)) * 100 - (0.015 * horas);
  return Math.max(0, bac.toFixed(3));
}

/**
 * Muestra el resultado calculado en la interfaz.
 */
function mostrarResultado(bac) {
  const result = document.getElementById("result");
  result.innerHTML = `
    Tu nivel estimado de alcohol en sangre es <strong>${bac}</strong> %.
  `;

  if (bac >= 0.08) {
    result.innerHTML += `<p style="color:red;">⚠️ Sobrepasas el límite legal para conducir.</p>`;
  } else if (bac > 0) {
    result.innerHTML += `<p style="color:orange;">🔶 Ten cuidado si vas a conducir.</p>`;
  } else {
    result.innerHTML += `<p style="color:green;">✅ No hay alcohol en tu sistema.</p>`;
  }
}

document.getElementById("bac-form").addEventListener("submit", (e) => {
  e.preventDefault();

  const peso = parseFloat(document.getElementById("weight").value);
  const sexo = document.getElementById("gender").value;
  const alcohol = parseFloat(document.getElementById("alcohol").value);
  const horas = parseFloat(document.getElementById("hours").value);

  if (!peso || !sexo || !alcohol || isNaN(horas)) return;

  const bac = calcularBAC(peso, sexo, alcohol, horas);
  mostrarResultado(bac);
});
