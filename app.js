document.addEventListener("DOMContentLoaded", function () {
    const userListContainer = document.getElementById("users-list");

    // Fetch users from the API
    fetch('https://your-api-endpoint.com/users')
        .then(response => response.json())
        .then(users => {
            // Display users in the UI
            users.forEach(user => {
                const userCard = document.createElement('div');
                userCard.className = 'user-card';
                userCard.innerHTML = `
                    <p><strong>ID:</strong> ${user.id}</p>
                    <p><strong>Name:</strong> ${user.name}</p>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <button class="delete-btn" onclick="deleteUser(${user.id})">Delete</button>
                `;
                userListContainer.appendChild(userCard);
            });
        })
        .catch(error => console.error('Error fetching users:', error));
});

function deleteUser(userId) {
    // Send a request to the API to delete the user
    fetch(`https://your-api-endpoint.com/users/${userId}`, {
        method: 'DELETE',
    })
    .then(response => {
        if (response.ok) {
            // Remove the user card from the UI
            const userCard = document.querySelector(`.user-card[data-id="${userId}"]`);
            if (userCard) {
                userCard.remove();
            } else {
                console.error('User card not found for deletion');
            }
        } else {
            console.error('Error deleting user:', response.status);
        }
    })
    .catch(error => console.error('Error deleting user:', error));
}
