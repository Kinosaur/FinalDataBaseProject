// Select sidebar and main content elements
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toggler = document.querySelector('.sidebar-toggler');

// Toggle sidebar and adjust main content margin
toggler.addEventListener('click', () => {
    sidebar.classList.toggle('collapsed');
    if (sidebar.classList.contains('collapsed')) {
        mainContent.style.marginLeft = '115px'; // Adjust to collapsed width
    } else {
        mainContent.style.marginLeft = '300px'; // Adjust to expanded width
    }
});

document.addEventListener("DOMContentLoaded", () => {
    // Sidebar navigation highlight
    const links = document.querySelectorAll(".sidebar-nav .nav-link");
    const currentPage = window.location.pathname.split("/").pop().split(".")[0]; // Extracts 'facilities' from 'facilities.html'

    links.forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        }
    });

    // Page-specific initialization
    const currentPageDataset = document.body.dataset.page;
    if (currentPageDataset === "bookings") {
        initializeBookingsPage();
    } else if (currentPageDataset === "fields") {
        initializeFieldsPage();
    } else if (currentPageDataset === "admins") {
        initializeAdminsPage();
    }
});


function initializeBookingsPage() {
    console.log("Initializing Bookings Page...");
    const tableBody = document.querySelector("#bookingsTable tbody");

    if (!tableBody) {
        console.error("Bookings table body not found!");
        return;
    }

    const dummyBookings = [
        { id: 1, customer: "John Doe", field: "Gym", date: "2025-01-25", time: "10:00 AM - 11:00 AM", status: "Pending" },
        { id: 2, customer: "Jane Smith", field: "Swimming Pool", date: "2025-01-26", time: "1:00 PM - 2:00 PM", status: "Approved" },
        { id: 3, customer: "Mike Johnson", field: "Conference Room", date: "2025-01-27", time: "3:00 PM - 4:00 PM", status: "Rejected" },
    ];

    dummyBookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.customer}</td>
            <td>${booking.field}</td>
            <td>${booking.date}</td>
            <td>${booking.time}</td>
            <td>${booking.status}</td>
        `;
        tableBody.appendChild(row);
    });

    tableBody.addEventListener("click", (event) => {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => row.classList.remove("selected"));
        const selectedRow = event.target.closest("tr");
        if (selectedRow) {
            selectedRow.classList.add("selected");
        }
    });

    document.querySelector("#acceptBtn").addEventListener("click", () => handleAction("accept"));
    document.querySelector("#updateBtn").addEventListener("click", () => handleAction("update"));
    document.querySelector("#rejectBtn").addEventListener("click", () => handleAction("reject"));
}

function handleAction(action) {
    const selectedRow = document.querySelector("tr.selected");
    if (selectedRow) {
        const customer = selectedRow.cells[1].textContent;
        alert(`${action.charAt(0).toUpperCase() + action.slice(1)} action for ${customer}`);
    } else {
        alert("Please select a booking to perform the action.");
    }
}

function initializeFieldsPage() {
    console.log("Initializing Fields Page...");
    const tableBody = document.querySelector("#fieldsTable tbody");

    if (!tableBody) {
        console.error("Fields table body not found!");
        return;
    }

    // Dummy Data for Fields
    const dummyFields = [
        { id: 1, name: "Gym", type: "Fitness", location: "Building A", availability: "Available", price: "$50/hr" },
        { id: 2, name: "Swimming Pool", type: "Leisure", location: "Building B", availability: "Unavailable", price: "$30/hr" },
        { id: 3, name: "Conference Room", type: "Business", location: "Building C", availability: "Available", price: "$100/hr" },
    ];

    // Populate the table with dummy data
    dummyFields.forEach((field) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${field.id}</td>
            <td>${field.name}</td>
            <td>${field.type}</td>
            <td>${field.location}</td>
            <td>${field.availability}</td>
            <td>${field.price}</td>
        `;
        tableBody.appendChild(row);
    });

    // Add row selection functionality
    tableBody.addEventListener("click", (event) => {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => row.classList.remove("selected"));
        const selectedRow = event.target.closest("tr");
        if (selectedRow) {
            selectedRow.classList.add("selected");
        }
    });

    // Add button functionality
    document.querySelector("#addBtn").addEventListener("click", () => {
        alert("This is just a test: Add functionality not implemented yet.");
    });

    document.querySelector("#updateBtn").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (selectedRow) {
            const name = selectedRow.cells[1].textContent; // Assuming Name is in the second column
            alert(`Update action for field: ${name}`);
        } else {
            alert("Please select a field to update.");
        }
    });

    document.querySelector("#deleteBtn").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (selectedRow) {
            const name = selectedRow.cells[1].textContent; // Assuming Name is in the second column
            const confirmDelete = confirm(`Are you sure you want to delete the field: ${name}?`);
            if (confirmDelete) {
                selectedRow.remove(); // Remove the row from the table
                alert(`Field ${name} has been deleted.`);
            }
        } else {
            alert("Please select a field to delete.");
        }
    });
}

function initializeAdminsPage() {
    console.log("Initializing Admins Page...");
    const tableBody = document.querySelector("#adminsTable tbody");

    if (!tableBody) {
        console.error("Admins table body not found!");
        return;
    }

    // Dummy Data for Admins
    const dummyAdmins = [
        { id: 1, name: "Alice Johnson", phone: "123-456-7890", email: "alice@example.com" },
        { id: 2, name: "Bob Smith", phone: "987-654-3210", email: "bob@example.com" },
        { id: 3, name: "Charlie Brown", phone: "555-555-5555", email: "charlie@example.com" },
    ];

    // Populate the table with dummy data
    dummyAdmins.forEach((admin) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${admin.id}</td>
            <td>${admin.name}</td>
            <td>${admin.phone}</td>
            <td>${admin.email}</td>
        `;
        tableBody.appendChild(row);
    });

    // Add row selection functionality
    tableBody.addEventListener("click", (event) => {
        const rows = tableBody.querySelectorAll("tr");
        rows.forEach((row) => row.classList.remove("selected"));
        const selectedRow = event.target.closest("tr");
        if (selectedRow) {
            selectedRow.classList.add("selected");
        }
    });

    // Add button functionality
    document.querySelector("#addBtn").addEventListener("click", () => {
        alert("This is just a test: Add functionality not implemented yet.");
    });

    document.querySelector("#updateBtn").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (selectedRow) {
            const name = selectedRow.cells[1].textContent;
            alert(`Update action for admin: ${name}`);
        } else {
            alert("Please select an admin to update.");
        }
    });

    document.querySelector("#deleteBtn").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (selectedRow) {
            const name = selectedRow.cells[1].textContent;
            const confirmDelete = confirm(`Are you sure you want to delete admin: ${name}?`);
            if (confirmDelete) {
                selectedRow.remove();
                alert(`Admin ${name} has been deleted.`);
            }
        } else {
            alert("Please select an admin to delete.");
        }
    });
}
