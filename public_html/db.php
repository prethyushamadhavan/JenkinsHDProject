<?php

// Replace these values with your database credentials
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

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // Collect form data
    $name = $_POST["name"];
    $email = $_POST["email"];
    $address = $_POST["address"];
    $phoneNumber = $_POST["phoneNumber"];
    $memberType = $_POST["memberType"];

    // SQL to insert data into the table
    $sql = "INSERT INTO user (Name, Email, Address, PhoneNumber, MemberType)
            VALUES ('$name', '$email', '$address', '$phoneNumber', '$memberType')";

    if ($conn->query($sql) === TRUE) {
        echo "New record created successfully";
    } else {
        echo "Error: " . $sql . "<br>" . $conn->error;
    }
}

// Close connection
$conn->close();

?>
