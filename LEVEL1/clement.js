document.addEventListener("DOMContentLoaded", function () {
    fetch("users.json") // Fetch data from an external JSON file
        .then(response => response.json())
        .then(data => {
            const tableBody = document.querySelector("#userTable tbody");
            data.forEach(user => {
                const row = document.createElement("tr");
                row.innerHTML = `
                    <td>${user.firstname}</td>
                    <td>${user.secondname}</td>
                    <td><img src="${user.image}" alt="User Image" width="50"></td>
                `;
                tableBody.appendChild(row);
            });
        })
        .catch(error => console.error("Error loading users:", error));
});

function Create() {
    const firstname = document.getElementById("firstname").value;
    const secondname = document.getElementById("secondname").value;
    const image = document.getElementById("image").value; // Image input handling can be improved

    if (firstname && secondname && image) {
        const tableBody = document.querySelector("#userTable tbody");
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${firstname}</td>
            <td>${secondname}</td>
            <td><img src="${image}" alt="User Image" width="50"></td>
        `;
        tableBody.appendChild(row);
    } else {
        alert("Please fill all fields correctly.");
    }