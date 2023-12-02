document.addEventListener("DOMContentLoaded", function () {
    const userListContainer = document.getElementById("users-list");
    const paginationContainer = document.getElementById("pagination");
    const searchInput = document.getElementById("search");
    let selectedRows = [];

    // Fetch users from the API
    fetch('https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json')
        .then(response => response.json())
        .then(users => {
            let filteredUsers = users;

            // Search functionality
            searchInput.addEventListener("input", function () {
                const searchTerm = searchInput.value.toLowerCase();
                filteredUsers = users.filter(user =>
                    Object.values(user).some(value =>
                        value.toString().toLowerCase().includes(searchTerm)
                    )
                );
                renderUsers(filteredUsers, 1);
            });

            // Initial rendering
            renderUsers(filteredUsers, 1);
        })
        .catch(error => console.error('Error fetching users:', error));
});

function renderUsers(users, currentPage) {
    const itemsPerPage = 10;
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const paginatedUsers = users.slice(startIndex, endIndex);

    const userListContainer = document.getElementById("users-list");
    userListContainer.innerHTML = "";

    paginatedUsers.forEach(user => {
        const userCard = document.createElement('div');
        userCard.className = 'user-card';
        userCard.dataset.id = user.id;

        const isSelected = selectedRows.includes(user.id);
        if (isSelected) {
            userCard.classList.add('selected');
        }

        userCard.innerHTML = `
            <p><strong>ID:</strong> ${user.id}</p>
            <p><strong>Name:</strong> ${user.name}</p>
            <p><strong>Email:</strong> ${user.email}</p>
            <button class="edit" onclick="editUser(${user.id})">Edit</button>
            <button class="delete" onclick="deleteUser(${user.id})">Delete</button>
            <input type="checkbox" class="select-checkbox" ${isSelected ? 'checked' : ''}>
        `;

        userListContainer.appendChild(userCard);
    });

    renderPagination(users.length, itemsPerPage, currentPage);
}

function renderPagination(totalItems, itemsPerPage, currentPage) {
    const totalPages = Math.ceil(totalItems / itemsPerPage);
    const paginationContainer = document.getElementById("pagination");
    paginationContainer.innerHTML = "";

    for (let i = 1; i <= totalPages; i++) {
        const pageButton = document.createElement('button');
        pageButton.innerText = i;
        pageButton.classList.add('page-number');
        pageButton.addEventListener('click', () => renderUsers(filteredUsers, i));
        paginationContainer.appendChild(pageButton);
    }

    const firstPageButton = document.createElement('button');
    firstPageButton.innerText = 'First';
    firstPageButton.classList.add('first-page');
    firstPageButton.addEventListener('click', () => renderUsers(filteredUsers, 1));
    paginationContainer.appendChild(firstPageButton);

    const prevPageButton = document.createElement('button');
    prevPageButton.innerText = 'Previous';
    prevPageButton.classList.add('previous-page');
    prevPageButton.addEventListener('click', () => {
        const prevPage = currentPage > 1 ? currentPage - 1 : 1;
        renderUsers(filteredUsers, prevPage);
    });
    paginationContainer.appendChild(prevPageButton);

    const nextPageButton = document.createElement('button');
    nextPageButton.innerText = 'Next';
    nextPageButton.classList.add('next-page');
    nextPageButton.addEventListener('click', () => {
        const nextPage = currentPage < totalPages ? currentPage + 1 : totalPages;
        renderUsers(filteredUsers, nextPage);
    });
    paginationContainer.appendChild(nextPageButton);

    const lastPageButton = document.createElement('button');
    lastPageButton.innerText = 'Last';
    lastPageButton.classList.add('last-page');
    lastPageButton.addEventListener('click', () => renderUsers(filteredUsers, totalPages));
    paginationContainer.appendChild(lastPageButton);
}

function editUser(userId) {
    // Implement in-place editing logic here
    console.log(`Editing user with ID ${userId}`);
}

function deleteUser(userId) {
    // Implement in-memory deletion logic here
    console.log(`Deleting user with ID ${userId}`);
}

function deleteSelected() {
    // Implement logic to delete selected rows
    console.log("Deleting selected rows:", selectedRows);
}
