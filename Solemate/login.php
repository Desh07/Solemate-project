<?php
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

// Check if form is submitted
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $email = $_POST['email'];
    $password = $_POST['password'];

    // Check if fields are empty
    if (empty($email) || empty($password)) {
        echo "<p>Please fill in all fields.</p>";
    } else {
        // Prepare SQL statement to select user with provided email
        $stmt = $conn->prepare("SELECT password FROM users WHERE email = ?");
        if ($stmt === false) {
            die("Prepare failed: " . $conn->error);
        }
        
        $stmt->bind_param("s", $email);
        $stmt->execute();
        $stmt->bind_result($hashed_password);
        
        // Check if user exists and verify password
        if ($stmt->fetch() && password_verify($password, $hashed_password)) {
            // Start session and set session variables if needed
            session_start();
            $_SESSION['email'] = $email; // Optional: Store email or user ID
            
            // JavaScript for successful login message and redirection
            echo "<script>
                    alert('You are logged in to Solemate! You are redirected to the homepage. continue exploring');
                    window.location.href = 'index.html';
                  </script>";
        } else {
            echo "<p>No account with that email and password</p>";
        }

        // Close the statement
        $stmt->close();
    }
}

// Close the database connection
$conn->close();
?>
