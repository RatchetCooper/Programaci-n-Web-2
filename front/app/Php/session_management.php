<?php
session_start();

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = $_POST['username'];
    $userId = $_POST['userId'];

    // Store user details in session
    $_SESSION['username'] = $username;
    $_SESSION['userId'] = $userId;

    echo json_encode(['message' => 'Session created successfully']);
} else {
    echo json_encode(['message' => 'Invalid request']);
}
?>
