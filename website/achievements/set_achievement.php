<?php
/* grabs / finds a matching word to the user input */
include("../leaderboard/db_connect.php");
session_start();

$userid = $_SESSION["userid"];
$achievement = $_POST["achievement"];

$input = "INSERT INTO UserAchievement (name, $achievement)
            VALUES($userid, 1);";

$db_con->query($input)
    or die("Error: " . mysqli_error($db_con));

?>