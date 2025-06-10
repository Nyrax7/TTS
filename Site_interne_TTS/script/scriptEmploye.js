const employees = [
      { name: "RATOVO Harimanana Njakanirina", dob: "1981-05-11", phone: "0612345678", weeks: 5, leave: {} }
    ];
let currentEmployeeIndex = null;

function renderEmployeeList(filter = "") {
  const list = document.getElementById("employeeList");
  list.innerHTML = "";
  employees.forEach((emp, i) => {
    if (emp.name.toLowerCase().includes(filter.toLowerCase())) {
      const li = document.createElement("li");
      li.className = "list-group-item list-group-item-action";
      li.textContent = emp.name;
      li.onclick = () => showDetails(i);
      list.appendChild(li);
    }
  });
}

function showDetails(index) {
  currentEmployeeIndex = index;
  const emp = employees[index];
  document.getElementById("employeeDetails").style.display = "block";
  document.getElementById("empName").textContent = emp.name;
  document.getElementById("empDob").textContent = emp.dob;
  document.getElementById("empPhone").textContent = emp.phone;
  document.getElementById("empLeave").textContent = emp.weeks + " semaines";
  renderMonthSelect();
  generateCalendar(new Date().getMonth(), new Date().getFullYear());
}

function renderMonthSelect() {
  const select = document.getElementById("monthSelect");
  select.innerHTML = "";
  for (let i = 0; i < 12; i++) {
    const option = document.createElement("option");
    const month = new Date(2025, i, 1).toLocaleString("fr-FR", { month: "long" });
    option.value = i;
    option.textContent = `${month} 2025`;
    select.appendChild(option);
  }
  select.onchange = e => generateCalendar(+e.target.value, 2025);
}

function generateCalendar(month, year) {
  const calendar = document.getElementById("calendar");
  calendar.innerHTML = "";

  const daysOfWeek = ["L", "M", "M", "J", "V", "S", "D"];
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const totalDays = lastDay.getDate();

  const offset = (firstDay.getDay() + 6) % 7; // Ajuste pour que Lundi = 0

  // Ligne des jours de la semaine
  // Ligne des jours de la semaine
const labelRow = document.createElement("div");
labelRow.className = "d-flex align-items-center gap-2 mb-2";

// Ajout d’un espace fixe pour aligner avec les boutons "Semaine X"
const spacer = document.createElement("div");
spacer.style.width = "82px"; // ajuste la largeur selon tes boutons
labelRow.appendChild(spacer);

for (let i = 0; i < 7; i++) {
  const label = document.createElement("div");
  label.style.width = "32px";
  label.style.textAlign = "center";
  label.style.fontWeight = "bold";
  label.textContent = daysOfWeek[i];
  labelRow.appendChild(label);
}
calendar.appendChild(labelRow);


  // Créer les semaines avec les jours
  const weeks = [];
  let week = [];

  // Jours vides avant le premier du mois
  for (let i = 0; i < offset; i++) week.push(null);

  // Ajouter tous les jours du mois
  for (let d = 1; d <= totalDays; d++) {
    week.push(d);
    if (week.length === 7) {
      weeks.push(week);
      week = [];
    }
  }

  // Compléter la dernière semaine si nécessaire
  if (week.length) {
    while (week.length < 7) week.push(null);
    weeks.push(week);
  }

  // Affichage des semaines
  weeks.forEach((week, wi) => {
    const row = document.createElement("div");
    row.className = "d-flex align-items-center gap-2 mb-1";

    const weekBtn = document.createElement("button");
    weekBtn.className = "btn btn-sm btn-outline-primary";
    weekBtn.textContent = `Semaine ${wi + 1}`;
    weekBtn.onclick = () => {
      [...row.querySelectorAll("button.day-btn")].forEach(btn => {
        btn.classList.toggle("btn-success");
      });
    };
    row.appendChild(weekBtn);

    week.forEach(day => {
      const btn = document.createElement("button");
      btn.className = "btn btn-sm btn-outline-secondary day-btn";
      btn.style.width = "32px";
      btn.disabled = day === null;
      if (day !== null) {
        btn.textContent = day;
        btn.onclick = () => {
    btn.classList.toggle("btn-success");
    btn.classList.toggle("text-white");
    };

      } else {
        btn.style.visibility = "hidden";
      }
      row.appendChild(btn);
    });

    calendar.appendChild(row);
  });
}





document.getElementById("searchInput").addEventListener("input", e => {
  renderEmployeeList(e.target.value);
});

document.getElementById("addEmployeeBtn").addEventListener("click", () => {
  const modal = new bootstrap.Modal(document.getElementById("addModal"));
  modal.show();
});

document.getElementById("saveEmployee").addEventListener("click", () => {
  const name = document.getElementById("newName").value;
  const dob = document.getElementById("newDob").value;
  const phone = document.getElementById("newPhone").value;
  const leave = document.getElementById("newLeave").value;
  if (name && dob && phone && leave) {
    employees.push({ name, dob, phone, leave });
    renderEmployeeList();
    bootstrap.Modal.getInstance(document.getElementById("addModal")).hide();
  }
});

document.getElementById("deleteEmployeeBtn").addEventListener("click", () => {
  if (currentEmployeeIndex !== null) {
    employees.splice(currentEmployeeIndex, 1);
    renderEmployeeList();
    document.getElementById("employeeDetails").style.display = "none";
  }
});

renderEmployeeList();