let users = []; // Store users
let editUserId = null; // Track user being edited

function addUser() {
    const firstname = document.getElementById('firstname').value.trim();
    const secondname = document.getElementById('secondname').value.trim();
    const image = document.getElementById('image').value.trim();

    if (!firstname || !secondname || !image) {
        alert("All fields are required!");
        return;
    }

    if (editUserId) {
        const userIndex = users.findIndex(user => user.id === editUserId);
        if (userIndex !== -1) {
            users[userIndex] = { id: editUserId, firstname, secondname, image };
            console.log("Updated user:", users[userIndex]); // Debug
            editUserId = null;
        }
    } else {
        const newUser = { id: Date.now(), firstname, secondname, image };
        users.push(newUser);
        console.log("Added new user:", newUser); // Debug
    }

    console.log("Users array after addition:", users); // Debug
    clearFields();
    renderUserList();
}

function renderUserList() {
    const tableBody = document.querySelector('#userTable tbody');
    tableBody.innerHTML = ''; // Clear the table

    console.log("Rendering users:", users); // Debug

    if (users.length === 0) {
        tableBody.innerHTML = '<tr><td colspan="4">No users found</td></tr>';
        return;
    }

    users.forEach(user => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${escapeHTML(user.firstname)}</td>
            <td>${escapeHTML(user.secondname)}</td>
            <td><img src="${escapeHTML(user.image)}" alt="User Image" width="50" /></td>
            <td>
                <button class="edit" onclick="editUser(${user.id})">Edit</button>
                <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}


function editUser(id) {
    const user = users.find(user => user.id === id);
    if (user) {
        document.getElementById('firstname').value = user.firstname;
        document.getElementById('secondname').value = user.secondname;
        document.getElementById('image').value = user.image;
        editUserId = id; // Enable edit mode
    }
}

function deleteUser(id) {
    users = users.filter(user => user.id !== id);
    renderUserList(); // Refresh table after deletion
}

function clearFields() {
    document.getElementById('firstname').value = '';
    document.getElementById('secondname').value = '';
    document.getElementById('image').value = '';
}

// Utility function to escape HTML to prevent XSS
function escapeHTML(str) {
    const div = document.createElement('div');
    div.innerText = str;
    return div.innerHTML;
}

window.onload = renderUserList; // Render the table on page load
