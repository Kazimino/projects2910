<?php
include("../leaderboard/db_connect.php");
session_start();

$name = array_key_exists("name", $_POST) ? $_POST["name"] : 0;
$pwd = array_key_exists("password", $_POST) ? $_POST["password"] : 0;

// Selects the user with the given name
$query = "SELECT * FROM Users WHERE name = '$name'";
$result = $db_con->query($query);
$row = mysqli_fetch_assoc($result);

// checks if the posted password is the same as the hashed password stored in the database;
// sets the session user if the login is successful
if(password_verify($pwd,$row['password'])) {
    $_SESSION["userid"] = $name;
    echo "valid";
} else {
    echo "invalid";
}
?>
