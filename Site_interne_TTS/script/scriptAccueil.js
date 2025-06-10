const listData = {
  employe: [
    { label: "Salaires", amount: 40000 },
    { label: "Charges sociales", amount: 10000 }
  ],
  camion: [
    { label: "Location camion Rent-a-car", amount: 12600 },
    { label: "Gazole plein", amount: 637.72 }
  ],
  loyer: [
    { label: "Loyer", amount: 1000 },
    { label: "Électricité", amount: 100 }
  ],
  ensemble: []
};

let currentPage = "ensemble";

function totalFrom(list) {
  return list.reduce((sum, item) => sum + item.amount, 0);
}

function updateEnsemble() {
  listData.ensemble = [
    { label: "Employé", amount: totalFrom(listData.employe) },
    { label: "Camion", amount: totalFrom(listData.camion) },
    { label: "Loyer", amount: totalFrom(listData.loyer) }
  ];
}

function formatEuro(amount) {
  return amount.toLocaleString('fr-FR', {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2
  }) + '\u00A0€'; // espace et ajout du symbole € à la fin
  }

function renderList(page) {
  updateEnsemble();
  currentPage = page;
  const container = document.getElementById(`list-${page}`);
  container.innerHTML = "";

  listData[page].forEach((item, index) => {
    const div = document.createElement("div");
    div.className = "d-flex justify-content-between align-items-center border rounded px-3 py-2 mb-2";
    div.innerHTML = `
      <span>${item.label} — <strong>${formatEuro(item.amount)}</strong></span>
      ${page !== "ensemble" ? `
        <button class="btn btn-sm btn-danger" onclick="removeItem('${page}', ${index})">
          <i class="bi bi-dash"></i>
        </button>` : ""}
    `;
    container.appendChild(div);
  });

  document.getElementById("listTitle").textContent = pageTitle(page);
}

function pageTitle(key) {
  const names = {
    ensemble: "Ensemble des charges",
    employe: "Charges employé",
    camion: "Charges camion",
    loyer: "Charges loyer/électricité"
  };
  return names[key] || key;
}

function removeItem(page, index) {
  listData[page].splice(index, 1);
  renderList(page);
}

document.getElementById("addBtn").addEventListener("click", () => {
  if (currentPage === "ensemble") {
    alert("Vous ne pouvez pas modifier la liste des totaux directement.");
    return;
  }

  const label = prompt("Entrez l’intitulé de la charge :");
  if (!label) return;

  const amountStr = prompt("Entrez le montant en euros :").replace(",", ".");
  const amount = parseFloat(amountStr);
  if (isNaN(amount)) {
    alert("Montant invalide.");
    return;
  }

  listData[currentPage].push({ label, amount });
  renderList(currentPage);
});

document.querySelectorAll("#list-tab a").forEach(link => {
  link.addEventListener("shown.bs.tab", function (e) {
    const page = e.target.dataset.page;
    renderList(page);
  });
});

// Initialisation
updateEnsemble();
renderList("ensemble");
