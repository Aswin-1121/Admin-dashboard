document.addEventListener("DOMContentLoaded", function () {
    const userListContainer = document.getElementById("users-list");
    const paginationContainer = document.getElementById("pagination");
    const searchInput = document.getElementById("search");
    let selectedRows = [];

    // Fetch users from the API
const apiUrl = 'https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json';

    // Variables to keep track of the state
    let users = [];
    let currentPage = 1;
    let totalPages = 1;
    let selectedRows = [];

    // Function to fetch data from the API
    async function fetchData() {
      const response = await fetch(apiUrl);
      const data = await response.json();
      users = data;
      renderTable();
    }

    // Function to render the table
    function renderTable() {
      const table = document.getElementById('userTable');
      table.innerHTML = '';

      // Add table headers
      const headers = Object.keys(users[0]);
      const headerRow = document.createElement('tr');
      headers.forEach(header => {
        const th = document.createElement('th');
        th.textContent = header;
        headerRow.appendChild(th);
      });
      table.appendChild(headerRow);

      // Add table rows
      const startIndex = (currentPage - 1) * 10;
      const endIndex = startIndex + 10;
      const rowsToDisplay = users.slice(startIndex, endIndex);

      rowsToDisplay.forEach(rowData => {
        const row = document.createElement('tr');
        headers.forEach(header => {
          const td = document.createElement('td');
          td.textContent = rowData[header];
          row.appendChild(td);
        });

        // Add edit and delete buttons to each row
        const editButton = createButton('edit', 'Edit', () => editRow(row));
        const deleteButton = createButton('delete', 'Delete', () => deleteRow(row));
        row.appendChild(editButton);
        row.appendChild(deleteButton);

        table.appendChild(row);
      });

      updatePagination();
    }

    // Function to create action buttons
    function createButton(className, text, onClick) {
      const button = document.createElement('button');
      button.className = className;
      button.textContent = text;
      button.addEventListener('click', onClick);
      return button;
    }

    // Function to handle row editing
    function editRow(row) {
      // Implement row editing logic here
      console.log('Editing row:', row);
    }

    // Function to handle row deletion
    function deleteRow(row) {
      // Implement row deletion logic here
      console.log('Deleting row:', row);
    }

    // Function to handle selected rows
    function handleRowSelection(row) {
      const index = selectedRows.indexOf(row);
      if (index === -1) {
        selectedRows.push(row);
      } else {
        selectedRows.splice(index, 1);
      }

      renderTable();
    }

    // Function to delete selected rows
    function deleteSelected() {
      // Implement bulk delete logic here
      console.log('Deleting selected rows:', selectedRows);
      selectedRows = [];
      renderTable();
    }

    // Function to handle pagination
    function gotoPage(page) {
      currentPage = page;
      renderTable();
    }

    function prevPage() {
      if (currentPage > 1) {
        currentPage--;
        renderTable();
      }
    }

    function nextPage() {
      if (currentPage < totalPages) {
        currentPage++;
        renderTable();
      }
    }

    // Function to update pagination information
    function updatePagination() {
      const totalRecords = users.length;
      totalPages = Math.ceil(totalRecords / 10);
      document.getElementById('currentPage').textContent = `Page ${currentPage} of ${totalPages}`;
    }

    // Function to handle search
    function search() {
      const searchTerm = document.getElementById('search').value.toLowerCase();
      if (searchTerm.trim() === '') {
        fetchData();
      } else {
        const filteredUsers = users.filter(user =>
          Object.values(user).some(value => value.toString().toLowerCase().includes(searchTerm))
        );
        currentPage = 1;
        users = filteredUsers;
        renderTable();
      }
    }

    // Initial data fetch and rendering
    fetchData();
