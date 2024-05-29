<?php
// Database connection details
$servername = "localhost";
$username = "root";
$password = "Madhubala@20";
$dbname = "72C";

// Create connection
$conn = new mysqli($servername, $username, $password, $dbname);

// Check connection
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

// Retrieve form data
$name = $_POST['name'];
$email = $_POST['email'];
$address = $_POST['address'];
$phone = $_POST['phone'];
$memberType = $_POST['member_type'];

// SQL query to insert data into the 'user' table
$sql = "INSERT INTO user (Name, Email, Address, PhoneNumber, MemberType) VALUES ('$name', '$email', '$address', '$phone', '$memberType')";

// Execute SQL query
if ($conn->query($sql) === TRUE) {
    echo "Record inserted successfully";
} else {
    echo "Error: " . $sql . "<br>" . $conn->error;
}

// Close the database connection
$conn->close();
?>
