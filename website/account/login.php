<?php
include("../leaderboard/db_connect.php");
session_start();

$name = array_key_exists("name", $_POST) ? $_POST["name"] : 0;
$pwd = array_key_exists("password", $_POST) ? $_POST["password"] : 0;

$query = "SELECT * FROM Users WHERE name = '$name'";
$result = $db_con->query($query);
$row = mysqli_fetch_assoc($result);

if(password_verify($pwd,$row['password'])) {
    $_SESSION["userid"] = $name;
    echo "valid";
} else {
    echo "invalid";
}
?>
