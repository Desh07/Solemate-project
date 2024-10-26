// loginValidation.js
document.getElementById('loginform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting

    let isValid = true;

    // Clear previous error messages
    document.querySelectorAll('#loginform .error-message').forEach(el => el.remove());
    document.querySelectorAll('#loginform .error-input').forEach(el => el.classList.remove('error-input'));

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

        // Remove error-input class from all fields after successful submission
        document.querySelectorAll('#loginform .error-input').forEach(el => el.classList.remove('error-input'));

        // Optional: Display a success message or proceed with form submission
        alert('Form submitted successfully!');
        // Uncomment the line below if you want the form to be submitted for real
        // this.submit();
    }
});

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
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
