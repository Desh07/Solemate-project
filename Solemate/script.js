// Navigation menu toggle
const bar = document.getElementById('bar');
const nav = document.getElementById('navbar');
const close = document.getElementById('close');

if (bar) {
    bar.addEventListener('click', () => {
        nav.classList.add('active');
    });
}

if (close) {
    close.addEventListener('click', () => {
        nav.classList.remove('active');
    });
}

// Form validation for signup form
document.getElementById('signupForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission

    let isValid = true;

    // Clear previous error messages and error-input class
    document.querySelectorAll('#signupForm .error-message').forEach(el => el.remove());
    document.querySelectorAll('#signupForm .error-input').forEach(el => el.classList.remove('error-input'));

    // Get form inputs
    const firstnameInput = document.getElementById('firstname-input');
    const phonenumberInput = document.getElementById('phonenumber-input');
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');
    const confirmPasswordInput = document.getElementById('confirm-password-input');

    // Validate first name
    if (firstnameInput.value.trim() === '') {
        showError(firstnameInput, 'First Name is required');
        isValid = false;
    }

    // Validate phone number
    const phonePattern = /^[0-9]{10}$/; // Assuming a 10-digit phone number
    if (!phonePattern.test(phonenumberInput.value.trim())) {
        showError(phonenumberInput, 'Please enter a valid 10-digit phone number');
        isValid = false;
    }

    // Validate email
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailInput.value.trim())) {
        showError(emailInput, 'Please enter a valid email address');
        isValid = false;
    }

    // Validate password
    if (passwordInput.value.trim().length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters');
        isValid = false;
    }

    // Validate confirm password
    if (passwordInput.value !== confirmPasswordInput.value) {
        showError(confirmPasswordInput, 'Passwords do not match');
        isValid = false;
    }

    // If form is valid, submit it
    if (isValid) {
        alert('Form submitted successfully!');

        // Clear all the form fields
        firstnameInput.value = '';
        phonenumberInput.value = '';
        emailInput.value = '';
        passwordInput.value = '';
        confirmPasswordInput.value = '';

        // Remove error-input class from all fields after successful submission
        document.querySelectorAll('#signupForm .error-input').forEach(el => el.classList.remove('error-input'));
    }
});

// Form validation for login form
document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('#loginform .error-message').forEach(el => el.remove());

    // Get form inputs
    const emailInput = document.getElementById('email-input');
    const passwordInput = document.getElementById('password-input');

    // Validate email
    if (!validateEmail(emailInput.value)) {
        showError(emailInput, 'Please enter a valid email address.');
        isValid = false;
    }

    // Validate password
    if (passwordInput.value.trim() === '') {
        showError(passwordInput, 'Password cannot be empty.');
        isValid = false;
    } else if (passwordInput.value.length < 6) {
        showError(passwordInput, 'Password must be at least 6 characters long.');
        isValid = false;
    }

    // If the form is valid, submit the form or perform further actions
    if (isValid) {
        // Reset form fields
        emailInput.value = '';
        passwordInput.value = '';

        // Optional: Display a success message or proceed with form submission
        alert('Form submitted successfully!');
        // Uncomment the line below if you want the form to be submitted for real
        // this.submit();
    }
});

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// Function to show error messages
function showError(inputElement, message) {
    const errorMessage = document.createElement('p');
    errorMessage.classList.add('error-message');
    errorMessage.innerText = message;
    inputElement.parentElement.appendChild(errorMessage);
    inputElement.classList.add('error-input');
}












