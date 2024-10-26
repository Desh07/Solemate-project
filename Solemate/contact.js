document.getElementById('contactform').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent form submission
    
    // Get form fields
    const nameField = document.querySelector('input[placeholder="Your Name"]');
    const emailField = document.querySelector('input[placeholder="Email"]');
    const subjectField = document.querySelector('input[placeholder="Subject"]');
    const messageField = document.querySelector('textarea[placeholder="Your Message"]');

    // Get error message elements
    const nameError = nameField.nextElementSibling;
    const emailError = emailField.nextElementSibling;
    const subjectError = subjectField.nextElementSibling;
    const messageError = messageField.nextElementSibling;

    // Initialize error flag
    let hasError = false;

    // Function to reset field style and hide error messages
    const resetField = (field, errorField) => {
        field.style.borderColor = '#222'; // Reset to the default border color
        errorField.style.display = 'none'; // Hide error message
    };

    // Function to show error on field
    const showError = (field, errorField, message) => {
        field.style.borderColor = 'red'; // Highlight the field in red if invalid
        errorField.textContent = message; // Set the error message text
        errorField.style.display = 'block'; // Show the error message
        hasError = true;
    };

    // Validate Name
    resetField(nameField, nameError);
    if (nameField.value.trim() === '') {
        showError(nameField, nameError, 'Please enter your name.');
    }

    // Validate Email (simple regex for basic validation)
    resetField(emailField, emailError);
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailField.value.trim())) {
        showError(emailField, emailError, 'Please enter a valid email address.');
    }

    // Validate Subject
    resetField(subjectField, subjectError);
    if (subjectField.value.trim() === '') {
        showError(subjectField, subjectError, 'Please enter a subject.');
    }

    // Validate Message
    resetField(messageField, messageError);
    if (messageField.value.trim() === '') {
        showError(messageField, messageError, 'Please enter your message.');
    }

    // If there's no error, show success message and clear form
    if (!hasError) {
        alert('Success! Your message has been sent.');
        // Clear form fields
        nameField.value = '';
        emailField.value = '';
        subjectField.value = '';
        messageField.value = '';
    }
});
