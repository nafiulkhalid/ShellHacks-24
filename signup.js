document.getElementById('signup-form').addEventListener('submit', function(event) {
    event.preventDefault();

    const firstName = document.getElementById('first-name').value;
    const lastName = document.getElementById('last-name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const password = document.getElementById('password').value;

    const validEmailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const validPhonePattern = /^\d{10}$/;

    // Validate email
    if (!validEmailPattern.test(email)) {
        alert('Please enter a valid email address.');
        return;
    }

    // Validate phone number
    if (!validPhonePattern.test(phone)) {
        alert('Please enter a valid 10-digit US phone number.');
        return;
    }

    // Validate password strength
    const strengthText = checkPasswordStrength(password);
    if (strengthText === "Very Weak" || strengthText === "Weak") {
        alert('Your password is too weak. Please make it stronger.');
        return;
    }

    // Redirect to dashboard
    window.location.href = 'dashboard.html';
});

// Toggle password visibility
document.getElementById('show-password').addEventListener('change', function() {
    const passwordField = document.getElementById('password');
    const type = this.checked ? 'text' : 'password';
    passwordField.setAttribute('type', type);
});

// Function to check password strength
function checkPasswordStrength(password) {
    let strength = 0;
    if (password.length >= 8) strength++; // Length
    if (/[A-Z]/.test(password)) strength++; // Uppercase
    if (/[a-z]/.test(password)) strength++; // Lowercase
    if (/\d/.test(password)) strength++; // Number
    if (/[!@#$%^&*]/.test(password)) strength++; // Special character

    switch (strength) {
        case 0:
            return "Very Weak";
        case 1:
            return "Weak";
        case 2:
            return "Fair";
        case 3:
            return "Good";
        case 4:
            return "Strong";
        case 5:
            return "Very Strong";
        default:
            return "";
    }
}

// Update password strength on input
document.getElementById('password').addEventListener('input', function() {
    const password = this.value;
    const strengthText = checkPasswordStrength(password);
    document.getElementById('password-strength').textContent = strengthText;
});
