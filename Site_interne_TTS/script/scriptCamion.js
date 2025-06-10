const camions = [
  {
    name: "Camion N°1",
    fuel: "Gazole",
    plate: "ZW-317-NY",
    price: 200,
    state: "En opération"
  }
];

let currentCamionIndex = null;

function renderCamionList(filter = "") {
  const list = document.getElementById("camionList");
  list.innerHTML = "";
  camions.forEach((camion, i) => {
    if (camion.name.toLowerCase().includes(filter.toLowerCase())) {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.textContent = camion.name;
      li.onclick = () => showCamionDetails(i);
      list.appendChild(li);
    }
  });
}

function showCamionDetails(index) {
  currentCamionIndex = index;
  const camion = camions[index];
  document.getElementById("camionDetails").style.display = "block";
  document.getElementById("camName").textContent = camion.name;
  document.getElementById("camCar").textContent = camion.fuel;
  document.getElementById("camImmat").textContent = camion.plate;
  document.getElementById("camLoc").textContent = `${camion.price} Euros/Mois`;
  document.getElementById("etatSelect").value = camion.state;
}

document.getElementById("searchInput").addEventListener("input", e => {
  renderCamionList(e.target.value);
});

document.getElementById("addCamionBtn").addEventListener("click", () => {
  const modal = new bootstrap.Modal(document.getElementById("addModal"));
  modal.show();
});

document.getElementById("saveCamion").addEventListener("click", () => {
  const name = document.getElementById("newName").value;
  const fuel = document.getElementById("newCar").value;
  const plate = document.getElementById("newImmat").value;
  const price = parseFloat(document.getElementById("newLoc").value);
  const state = document.querySelector("#addModal select").value;

  if (name && fuel && plate && !isNaN(price) && state && state !== "État") {
    camions.push({ name, fuel, plate, price, state });
    renderCamionList();
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
  }
});

document.getElementById("deleteCamionBtn").addEventListener("click", () => {
  if (currentCamionIndex !== null) {
    camions.splice(currentCamionIndex, 1);
    currentCamionIndex = null;
    renderCamionList();
    document.getElementById("camionDetails").style.display = "none";
  }
});

// Modifier l'état du camion
document.querySelector(".btn-purple").addEventListener("click", () => {
  if (currentCamionIndex !== null) {
    camions[currentCamionIndex].state = document.getElementById("etatSelect").value;
    alert("État mis à jour !");
  }
});

renderCamionList();
