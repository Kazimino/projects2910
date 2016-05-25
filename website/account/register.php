<?php
include("../leaderboard/db_connect.php");

$name = array_key_exists("name", $_POST) ? $_POST["name"] : 0;
$pwd = array_key_exists("password", $_POST) ? $_POST["password"] : 0;

$select = "SELECT * FROM Users WHERE name = $name";
$result = $db_con->query($select);

if($result->num_rows == 0) {
    $pwhash = password_hash($pwd, PASSWORD_DEFAULT);
    $insert = "INSERT INTO Users (name, password) VALUES('$name', '$pwhash')";
    $db_con->query($insert)
        or die("Error: " . mysqli_error($db_con));
    session_start();
    $_SESSION["userid"] = $name;
    echo "valid";
} else {
    echo "taken";
}
?>