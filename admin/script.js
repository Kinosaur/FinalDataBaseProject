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
    const links = document.querySelectorAll(".sidebar-nav .nav-link");
    const currentPage = window.location.pathname.split("/").pop().split(".")[0]; // Extracts 'facilities' from 'facilities.html'

    links.forEach(link => {
        if (link.dataset.page === currentPage) {
            link.classList.add("active");
        }
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const currentPage = document.body.dataset.page;

    if (currentPage === "bookings") {
        initializeBookingsPage();
    } else if (currentPage === "facilities") {
        initializeFacilitiesPage();
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
        { id: 1, customer: "John Doe", facility: "Gym", date: "2025-01-25", time: "10:00 AM - 11:00 AM", status: "Pending" },
        { id: 2, customer: "Jane Smith", facility: "Swimming Pool", date: "2025-01-26", time: "1:00 PM - 2:00 PM", status: "Approved" },
        { id: 3, customer: "Mike Johnson", facility: "Conference Room", date: "2025-01-27", time: "3:00 PM - 4:00 PM", status: "Rejected" },
    ];

    dummyBookings.forEach((booking) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${booking.id}</td>
            <td>${booking.customer}</td>
            <td>${booking.facility}</td>
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

function initializeFacilitiesPage() {
    console.log("Initializing Facilities Page...");
    const tableBody = document.querySelector("#facilitiesTable tbody");

    if (!tableBody) {
        console.error("Facilities table body not found!");
        return;
    }

    // Dummy Data for Facilities
    const dummyFacilities = [
        { id: 1, name: "Gym", type: "Fitness", location: "Building A", availability: "Available", price: "$50/hr" },
        { id: 2, name: "Swimming Pool", type: "Leisure", location: "Building B", availability: "Unavailable", price: "$30/hr" },
        { id: 3, name: "Conference Room", type: "Business", location: "Building C", availability: "Available", price: "$100/hr" },
    ];

    // Populate the table with dummy data
    dummyFacilities.forEach((facility) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${facility.id}</td>
            <td>${facility.name}</td>
            <td>${facility.type}</td>
            <td>${facility.location}</td>
            <td>${facility.availability}</td>
            <td>${facility.price}</td>
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
            alert(`Update action for ${name}`);
        } else {
            alert("Please select a facility to update.");
        }
    });

    document.querySelector("#deleteBtn").addEventListener("click", () => {
        const selectedRow = document.querySelector("tr.selected");
        if (selectedRow) {
            const name = selectedRow.cells[1].textContent; // Assuming Name is in the second column
            alert(`Delete action for ${name}`);
        } else {
            alert("Please select a facility to delete.");
        }
    });
}




// document.addEventListener("DOMContentLoaded", () => {
//     const tableBody = document.querySelector("#facilitiesTable tbody");

//     // Dummy data
//     const dummyData = [
//         { id: 1, name: "Gym", type: "Fitness", location: "Building A", availability: "Available", price: "$50/hr" },
//         { id: 2, name: "Swimming Pool", type: "Leisure", location: "Building B", availability: "Unavailable", price: "$30/hr" },
//         { id: 3, name: "Conference Room", type: "Business", location: "Building C", availability: "Available", price: "$100/hr" },
//     ];

//     // Populate table with dummy data
//     dummyData.forEach((item) => {
//         const row = document.createElement("tr");
//         row.innerHTML = `
//             <td>${item.id}</td>
//             <td>${item.name}</td>
//             <td>${item.type}</td>
//             <td>${item.location}</td>
//             <td>${item.availability}</td>
//             <td>${item.price}</td>
//         `;
//         tableBody.appendChild(row);
//     });
// });

// // Add row selection functionality
// document.addEventListener("DOMContentLoaded", () => {
//     const tableBody = document.querySelector("#facilitiesTable tbody");

//     tableBody.addEventListener("click", (event) => {
//         const rows = tableBody.querySelectorAll("tr");
//         rows.forEach((row) => row.classList.remove("selected")); // Remove previous selection
//         const selectedRow = event.target.closest("tr");
//         if (selectedRow) {
//             selectedRow.classList.add("selected");
//         }
//     });
// });


// // Add button functionality
// document.querySelector("#addBtn").addEventListener("click", () => {
//     console.log("Add button clicked");
//     alert("This is just a test: Add functionality not implemented yet.");
// });

// document.querySelector("#updateBtn").addEventListener("click", () => {
//     const selectedRow = document.querySelector("tr.selected");
//     if (selectedRow) {
//         console.log("Update button clicked for:", selectedRow.textContent);
//         alert(`This is just a test: Update functionality not implemented. Selected row: ${selectedRow.textContent}`);
//     } else {
//         alert("No row selected. Please select a row to update.");
//     }
// });

// document.querySelector("#deleteBtn").addEventListener("click", () => {
//     const selectedRow = document.querySelector("tr.selected");
//     if (selectedRow) {
//         console.log("Delete button clicked for:", selectedRow.textContent);
//         alert(`This is just a test: Delete functionality not implemented. Selected row: ${selectedRow.textContent}`);
//     } else {
//         alert("No row selected. Please select a row to delete.");
//     }
// });

