<?php
include("db_connect.php");

$score = array_key_exists("score", $_POST) ? $_POST["score"] : 0;
$name = array_key_exists("name", $_POST) ? $_POST["name"] : "Anonymous";
$time = date("Y-m-d H:i:s");

$query = "INSERT INTO Leaderboard (playerName, time, entered)
            VALUES($name, $score, $time);";
mysqli_query($db_con, $query)
    or die("Error: " . mysqli_error($db_con));

$last_inserted = mysqli_insert_id($db_con);
mysqli_query("SELECT * FROM Leaderboard;")

$rank = 0;

?>