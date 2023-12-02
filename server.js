const express = require('express');
const app = express();
const PORT = 3000;

// Dummy user data
const users = [
    { id: 1, name: 'John Doe', email: 'john55@gmail.com', role: 'Admin' },
    { id: 2, name: 'Aaron miles', email: 'Aaron22@gmail.com', role: 'Member' },
    { id: 3, name: 'Aishwarya Naik', email: 'aishwarya@mailinator.com', role: 'Member' },
    { id: 4, name: 'Arvind Kumar', email: 'arvind@mailinator.com', role: 'Admin' },
    // Add more users as needed
];

app.use(express.json());

// Endpoint to get all users
app.get('/users', (req, res) => {
    res.json(users);
});

// Endpoint to delete a user
app.delete('/users/:userId', (req, res) => {
    const userId = parseInt(req.params.userId);
    const index = users.findIndex(user => user.id === userId);

    if (index !== -1) {
        users.splice(index, 1);
        res.sendStatus(204); // No content
    } else {
        res.status(404).json({ error: 'User not found' });
    }
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
