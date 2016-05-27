<?php
/* grabs / finds a matching word to the user input */
include("../leaderboard/db_connect.php");
session_start();

$userid = $_SESSION["userid"];

$input = "SELECT *
            FROM UserAchievement
            WHERE name = \"$userid\";";

$db_con->query($input)
    or die("Error: " . mysqli_error($db_con));

?>