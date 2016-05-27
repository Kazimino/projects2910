<?php
session_start();
include('../leaderboard/db_connect');

if($_POST["password"] && $_SESSION["userid"]) {
    $name = $_SESSION["userid"];
    $newPass = $_POST["password"];
    $newHash = password_hash($newPass, PASSWORD_DEFAULT);
    
    $update = "UPDATE Users "
            . "SET password = \"$newHash\" "
            . "WHERE name = \"$name\"";
    $db_con->query($update)
            or die("Error: " . mysqli_error($db_con));
}
?>

