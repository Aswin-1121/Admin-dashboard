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


function deleteUser(userId) {
    // Send a request to the API to delete the user
    fetch(`https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json/users/${userId}`, {
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
