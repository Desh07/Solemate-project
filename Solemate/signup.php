<?php

mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

// Database connection settings
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "solemate";

// Connect to the database
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Check if the form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $firstname = $_POST['firstname'];
    $phonenumber = $_POST['phonenumber'];
    $email = $_POST['email'];
    $password = $_POST['password'];
    $confirm_password = $_POST['confirm-password'];

    // Validate form fields
    if (empty($firstname) || empty($phonenumber) || empty($email) || empty($password) || empty($confirm_password)) {
        echo "<p>Please fill in all fields.</p>";
    } elseif ($password !== $confirm_password) {
        echo "<p>Passwords do not match.</p>";
    } else {
        // Hash the password for security
        $hashed_password = password_hash($password, PASSWORD_BCRYPT);

        // Prepare SQL statement
        $stmt = $conn->prepare("INSERT INTO users (firstname, phonenumber, email, password) VALUES (?, ?, ?, ?)");
        if ($stmt === false) {
            die("Prepare failed: " . $conn->error);
        }

        $stmt->bind_param("ssss", $firstname, $phonenumber, $email, $hashed_password);

        // Execute statement and check for success
        if ($stmt->execute()) {
            echo "<p>Signup successful! You can now <a href='login.html'>log in</a>.</p>";
        } else {
            echo "<p>Error executing query: " . $stmt->error . "</p>";
        }

        // Close the statement
        $stmt->close();
    }
}

// Close the database connection
$conn->close();
?>
