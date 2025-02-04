// Select sidebar and main content elements
const sidebar = document.querySelector('.sidebar');
const mainContent = document.querySelector('.main-content');
const toggler = document.querySelector('.sidebar-toggler');

// Dummy admin credentials
const adminCredentials = {
    username: "admin",
    password: "kino123",
};

// Toggle sidebar and adjust main content margin
if (toggler) {
    toggler.addEventListener('click', () => {
        sidebar.classList.toggle('collapsed');
        if (sidebar.classList.contains('collapsed')) {
            mainContent.style.marginLeft = '115px'; // Adjust to collapsed width
        } else {
            mainContent.style.marginLeft = '300px'; // Adjust to expanded width
        }
    });
}

document.addEventListener("DOMContentLoaded", () => {
    // Redirect to login if not authenticated
    if (!sessionStorage.getItem("isLoggedIn") && !window.location.pathname.endsWith("admin_login.html")) {
        window.location.href = "admin_login.html";
    }

    // Sidebar navigation highlight
    const links = document.querySelectorAll(".sidebar-nav .nav-link");
    const currentPage = window.location.pathname.split("/").pop().split(".")[0]; // Extracts the page name

    links.forEach((link) => {
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
    } else if (currentPageDataset === "customers") {
        initializeCustomersPage();
    } else if (currentPageDataset === "trainers") {
        initializeTrainersPage();
    } else if (currentPageDataset === "dashboard") {
        initializeDashboardPage();
    } else if (currentPageDataset === "schedule") {
        initializeSchedulePage();
    } else if (currentPageDataset === "feedback") {
        initializeFeedbackPage();
    }

    // Handle login form submission
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", (e) => {
            e.preventDefault();
            const username = document.getElementById("username").value;
            const password = document.getElementById("password").value;

            if (username === adminCredentials.username && password === adminCredentials.password) {
                sessionStorage.setItem("isLoggedIn", true); // Store login status
                window.location.href = "dashboard.html"; // Redirect to dashboard
            } else {
                alert("Invalid username or password. Please try again.");
            }
        });
    }

    // Handle logout
    const logoutButton = document.getElementById("logoutButton");
    if (logoutButton) {
        logoutButton.addEventListener("click", (e) => {
            e.preventDefault();
            sessionStorage.removeItem("isLoggedIn"); // Clear login status
            window.location.href = "admin_login.html"; // Redirect to login page
        });
    }
});



const dummyData = {
    revenue: 50000,
    activeMemberships: 3,
    totalBookings: 3,
    activeTrainers: 3,
    bookings: [
        { id: 1, customer: "John Doe", field: "Gym", date: "2025-01-25", time: "10:00 AM - 11:00 AM", status: "Pending" },
        { id: 2, customer: "Jane Smith", field: "Swimming Pool", date: "2025-01-26", time: "1:00 PM - 2:00 PM", status: "Approved" },
        { id: 3, customer: "Mike Johnson", field: "Conference Room", date: "2025-01-27", time: "3:00 PM - 4:00 PM", status: "Rejected" },
    ],
    fields: [
        { id: 1, name: "Gym", type: "Fitness", location: "Building A", availability: "Available", price: "$50/hr" },
        { id: 2, name: "Swimming Pool", type: "Leisure", location: "Building B", availability: "Unavailable", price: "$30/hr" },
        { id: 3, name: "Conference Room", type: "Business", location: "Building C", availability: "Available", price: "$100/hr" },
    ],
    trainers: [
        { id: 1, name: "Johnson", phone: "123-456-7890", email: "john@example.com" },
        { id: 2, name: "Jane Smith", phone: "987-654-3210", email: "jane@example.com" },
        { id: 3, name: "Micheal Brown", phone: "555-555-5555", email: "micky@example.com" },
    ],
    admins: [
        { id: 1, name: "Admin1", phone: "123-456-7890", email: "admin@example.com" },
    ],
    customers: [
        { id: 1, name: "Alice Johnson", phone: "123-456-7890", email: "alice@example.com", type: "Yearly", status: "Active" },
        { id: 2, name: "Bob Smith", phone: "987-654-3210", email: "bob@example.com", type: "Yearly", status: "Active" },
        { id: 3, name: "Charlie Brown", phone: "555-555-5555", email: "charlie@example.com", type: "Monthly", status: "Inactive" },
    ],
};


function initializeBookingsPage() {
    console.log("Initializing Bookings Page...");
    const tableBody = document.querySelector("#bookingsTable tbody");

    if (!tableBody) {
        console.error("Bookings table body not found!");
        return;
    }

    dummyData.bookings.forEach((booking) => {
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
    dummyData.fields.forEach(field => {
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

    // Populate the table with dummy data
    dummyData.admins.forEach((admin) => {
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

function initializeCustomersPage() {
    console.log("Initializing Customers Page...");
    const tableBody = document.querySelector("#customersTable tbody");

    if (!tableBody) {
        console.error("Customers table body not found!");
        return;
    }

    // Populate the table with dummy data
    dummyData.customers.forEach((customer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${customer.id}</td>
            <td>${customer.name}</td>
            <td>${customer.phone}</td>
            <td>${customer.email}</td>
            <td>${customer.type}</td>
            <td>${customer.status}</td>
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
            const currentStatus = selectedRow.cells[5].textContent; // Assuming Status is in the sixth column
            const newStatus = prompt(
                `Update status for ${name} (current status: ${currentStatus}):\nEnter "Active" or "Inactive":`
            );
            if (newStatus && (newStatus === "Active" || newStatus === "Inactive")) {
                selectedRow.cells[5].textContent = newStatus; // Update the status in the table
                alert(`Customer ${name}'s status has been updated to ${newStatus}.`);
            } else if (newStatus) {
                alert("Invalid status entered. Please try again.");
            }
        } else {
            alert("Please select a customer to update.");
        }
    });

    document.querySelector("#deleteBtn").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (selectedRow) {
            const name = selectedRow.cells[1].textContent; // Assuming Name is in the second column
            const confirmDelete = confirm(`Are you sure you want to delete customer: ${name}?`);
            if (confirmDelete) {
                selectedRow.remove(); // Remove the row from the table
                alert(`Customer ${name} has been deleted.`);
            }
        } else {
            alert("Please select a customer to delete.");
        }
    });
}

function initializeTrainersPage() {
    console.log("Initializing Trainers Page...");
    const tableBody = document.querySelector("#trainersTable tbody");

    if (!tableBody) {
        console.error("Trainers table body not found!");
        return;
    }

    // Populate the table with dummy data
    dummyData.trainers.forEach((trainer) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${trainer.id}</td>
            <td>${trainer.name}</td>
            <td>${trainer.phone}</td>
            <td>${trainer.email}</td>
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
            alert(`Update action for trainer: ${name}`);
        } else {
            alert("Please select an trainer to update.");
        }
    });

    document.querySelector("#deleteBtn").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (selectedRow) {
            const name = selectedRow.cells[1].textContent;
            const confirmDelete = confirm(`Are you sure you want to delete trainer: ${name}?`);
            if (confirmDelete) {
                selectedRow.remove();
                alert(`Trainer ${name} has been deleted.`);
            }
        } else {
            alert("Please select an trainer to delete.");
        }
    });
}

function initializeDashboardPage() {
    // Populate Metrics
    document.querySelectorAll(".card")[0].textContent = `Total Revenue: ฿${dummyData.revenue}`;
    document.querySelectorAll(".card")[1].textContent = `Active Memberships: ${dummyData.activeMemberships}`;
    document.querySelectorAll(".card")[2].textContent = `Total Bookings: ${dummyData.totalBookings}`;
    document.querySelectorAll(".card")[3].textContent = `Active Trainers: ${dummyData.activeTrainers}`;

    // Populate Bookings Table
    const tableBody = document.getElementById("booking-table");
    dummyData.bookings.forEach(booking => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.customer}</td>
            <td>${booking.field}</td>
            <td>${booking.date}</td>
            <td>${booking.status}</td>
        `;
        tableBody.appendChild(row);
    });

    // Generate Membership Pie Chart
    const ctx1 = document.getElementById('membershipChart').getContext('2d');
    new Chart(ctx1, {
        type: 'pie',
        data: {
            labels: ['Monthly', 'Yearly'],
            datasets: [{
                data: [80, 40],
                backgroundColor: ['#FF6384', '#36A2EB'],
            }]
        },
    });

    // Generate Field Usage Bar Chart
    const ctx2 = document.getElementById('fieldUsageChart').getContext('2d');
    new Chart(ctx2, {
        type: 'bar',
        data: {
            labels: dummyData.fields.map(field => field.name),
            datasets: [{
                label: 'Bookings',
                data: [12, 7, 5], // Dummy booking data
                backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
            }]
        },
    });
}

function initializeSchedulePage() {
    const trainers = ["Alice Johnson", "Bob Smith", "Charlie Brown"];
    const scheduleTableBody = document.getElementById("scheduleTableBody");

    // Check if table body exists
    if (!scheduleTableBody) {
        console.error("Schedule table body not found!");
        return;
    }

    // Populate the schedule table
    trainers.forEach((trainer) => {
        const row = document.createElement("tr");

        // Add trainer name
        const trainerCell = document.createElement("td");
        trainerCell.textContent = trainer;
        row.appendChild(trainerCell);

        // Add schedule cells for each day
        for (let i = 0; i < 6; i++) {
            const cell = document.createElement("td");
            cell.classList.add("available"); // Default class for availability
            cell.textContent = "Available";
            cell.addEventListener("click", () => toggleSlot(cell));
            row.appendChild(cell);
        }

        scheduleTableBody.appendChild(row);
    });

    // Toggle slot availability between "Available" and "Unavailable"
    function toggleSlot(cell) {
        if (cell.classList.contains("available")) {
            cell.classList.remove("available");
            cell.classList.add("unavailable");
            cell.textContent = "Unavailable";
        } else {
            cell.classList.remove("unavailable");
            cell.classList.add("available");
            cell.textContent = "Available";
        }
    }

    // Save schedule
    const saveButton = document.getElementById("saveScheduleBtn");
    if (saveButton) {
        saveButton.addEventListener("click", () => {
            const schedule = [];
            scheduleTableBody.querySelectorAll("tr").forEach((row) => {
                const trainerName = row.querySelector("td").textContent;
                const days = Array.from(row.querySelectorAll("td"))
                    .slice(1)
                    .map((cell) => ({
                        day: cell.cellIndex, // Day index (1-6)
                        status: cell.textContent,
                    }));
                schedule.push({ trainer: trainerName, schedule: days });
            });

            console.log("Schedule saved:", schedule);
            alert("Schedule saved successfully!");
        });
    }
}

function initializeFeedbackPage() {
    const feedbackData = [
        { id: 1, customer: "John Doe", text: "Great service!", date: "2025-01-20", status: "Pending" },
        { id: 2, customer: "Jane Smith", text: "I had an issue with booking.", date: "2025-01-21", status: "Pending" },
        { id: 3, customer: "Michael Brown", text: "Everything went smoothly!", date: "2025-01-19", status: "Addressed" },
    ];

    const feedbackTableBody = document.getElementById("feedbackTableBody");

    // Populate Feedback Table
    function populateTable(data) {
        feedbackTableBody.innerHTML = ""; // Clear existing rows
        data.forEach((feedback) => {
            const row = document.createElement("tr");
            row.innerHTML = `
                <td>${feedback.id}</td>
                <td>${feedback.customer}</td>
                <td>${feedback.text}</td>
                <td>${feedback.date}</td>
                <td class="status-${feedback.status.toLowerCase()}">${feedback.status}</td>
            `;
            row.addEventListener("click", () => selectRow(row)); // Add row selection
            feedbackTableBody.appendChild(row);
        });
    }

    // Handle Row Selection
    function selectRow(row) {
        feedbackTableBody.querySelectorAll("tr").forEach((r) => r.classList.remove("selected"));
        row.classList.add("selected");
    }

    // Handle "Mark All as Addressed"
    document.getElementById("markAllAddressed").addEventListener("click", () => {
        feedbackData.forEach((feedback) => {
            if (feedback.status === "Pending") {
                feedback.status = "Addressed";
            }
        });
        populateTable(feedbackData); // Refresh table
        alert("All pending feedback marked as addressed.");
    });

    // Handle "Delete Selected"
    document.getElementById("deleteSelected").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (!selectedRow) {
            alert("Please select a row to delete.");
            return;
        }

        const selectedId = parseInt(selectedRow.cells[0].textContent); // Get the ID from the first cell
        const index = feedbackData.findIndex((feedback) => feedback.id === selectedId);

        if (index !== -1) {
            feedbackData.splice(index, 1); // Remove the feedback from the array
            populateTable(feedbackData); // Refresh table
            alert(`Feedback with ID ${selectedId} deleted.`);
        }
    });

    // Initialize Feedback Table
    populateTable(feedbackData);
}

