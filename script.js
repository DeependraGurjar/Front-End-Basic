let leads = JSON.parse(localStorage.getItem("leads")) || [];

function saveAndRender() {
  localStorage.setItem("leads", JSON.stringify(leads));
  displayLeads(leads);
}

function addLead() {
  let name = document.getElementById("name").value.trim();
  let email = document.getElementById("email").value.trim();

  if (!name || !email) return;

  leads.push({ name, email });
  document.getElementById("name").value = "";
  document.getElementById("email").value = "";

  saveAndRender();
}

function deleteLead(index) {
  leads.splice(index, 1);
  saveAndRender();
}

function editLead(index) {
  let newName = prompt("Edit Name", leads[index].name);
  let newEmail = prompt("Edit Email", leads[index].email);

  if (newName && newEmail) {
    leads[index] = { name: newName, email: newEmail };
    saveAndRender();
  }
}

function displayLeads(data) {
  let list = document.getElementById("leadList");
  list.innerHTML = "";

  data.forEach((lead, index) => {
    list.innerHTML += `
      <li>
        <strong>${lead.name}</strong><br>
        ${lead.email}
        <div class="actions">
          <button onclick="editLead(${index})">Edit</button>
          <button class="delete" onclick="deleteLead(${index})">Delete</button>
        </div>
      </li>
    `;
  });
}

function searchLead() {
  let query = document.getElementById("search").value.toLowerCase();

  let filtered = leads.filter(lead =>
    lead.name.toLowerCase().includes(query) ||
    lead.email.toLowerCase().includes(query)
  );

  displayLeads(filtered);
}

displayLeads(leads);