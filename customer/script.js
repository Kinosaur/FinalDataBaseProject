document.addEventListener("DOMContentLoaded", () => {
    highlightNavLinks();
    addFormValidation();
    updateNavbar();
    addSmoothScrolling();
    addFeedbackFormListener();
});

// Mock user database for testing
const mockUsers = [
    { username: "testuser", password: "123456" },
    { username: "admin", password: "admin123" },
    { username: "demo", password: "password" },
];

// Highlight the active navigation link
function highlightNavLinks() {
    const navLinks = document.querySelectorAll(".nav-links a");
    const currentPath = window.location.pathname.split("/").pop();

    navLinks.forEach((link) => {
        if (link.getAttribute("href") === currentPath) {
            link.classList.add("active");
        }
    });
}

// Add form validation and mock login/signup logic
function addFormValidation() {
    // Login form submission
    document.getElementById("login-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validate user against the mock database
        const user = mockUsers.find((user) => user.username === username && user.password === password);

        if (user) {
            localStorage.setItem("loggedInUser", user.username); // Simulate logged-in state
            window.location.href = "index.html"; // Redirect to homepage
        } else {
            alert("Invalid username or password.");
        }
    });

    // Signup form submission
    document.getElementById("signup-form")?.addEventListener("submit", (e) => {
        e.preventDefault();
        const username = document.getElementById("username").value.trim();
        const email = document.getElementById("email").value.trim();
        const password = document.getElementById("password").value.trim();

        // Check if the username already exists in the mock database
        const existingUser = mockUsers.find((user) => user.username === username);

        if (existingUser) {
            alert("Username already exists. Please choose another.");
            return;
        }

        if (!username || !email || !password) {
            alert("All fields are required.");
            return;
        }

        if (password.length < 6) {
            alert("Password must be at least 6 characters long.");
            return;
        }

        // Add the new user to the mock database
        mockUsers.push({ username, password });
        alert("Account created successfully! You can now log in.");
        window.location.href = "login.html"; // Redirect to login page
    });
}

// Update navbar dynamically based on login state
function updateNavbar() {
    const loggedInUser = localStorage.getItem("loggedInUser");
    const navButtons = document.querySelector(".nav-buttons");
    const navProfile = document.querySelector(".nav-profile");
    const userNameSpan = document.getElementById("user-name");

    if (loggedInUser) {
        navButtons.style.display = "none"; // Hide login/signup buttons
        navProfile.style.display = "flex"; // Show profile section
        userNameSpan.textContent = loggedInUser; // Display username
    } else {
        navButtons.style.display = "flex"; // Show login/signup buttons
        navProfile.style.display = "none"; // Hide profile section
    }

    // Logout functionality
    document.getElementById("logout-btn")?.addEventListener("click", () => {
        localStorage.removeItem("loggedInUser"); // Clear logged-in state
        window.location.reload(); // Reload to update navbar
    });
}

// Add smooth scrolling for anchor links
function addSmoothScrolling() {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.addEventListener("click", function (e) {
            e.preventDefault();
            const targetId = this.getAttribute("href").substring(1);
            const targetElement = document.getElementById(targetId);

            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop,
                    behavior: "smooth",
                });
            }
        });
    });
}

// Handle feedback form submission
function addFeedbackFormListener() {
    const feedbackForm = document.getElementById("feedback-form");

    if (feedbackForm) {
        feedbackForm.addEventListener("submit", (e) => {
            e.preventDefault(); // Prevent the default form submission

            const name = document.getElementById("feedback-name").value.trim();
            const email = document.getElementById("feedback-email").value.trim();
            const message = document.getElementById("feedback-message").value.trim();

            // Validate inputs
            if (!name || !email || !message) {
                alert("Please fill in all fields.");
                return;
            }

            // Simulate sending feedback to the backend
            console.log("Feedback submitted:", { name, email, message });

            // Show confirmation
            alert("Thank you for your feedback!");

            // Optionally reset the form
            feedbackForm.reset();
        });
    }
}