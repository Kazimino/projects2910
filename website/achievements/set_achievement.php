<?php
/* grabs / finds a matching word to the user input */
include("../leaderboard/db_connect.php");
session_start();

$userid = $_SESSION["userid"];
$achievement = $_POST["achievement"];

$input = "INSERT INTO UserAchievement (name, achID)
            VALUES(\"$userid\", \"$achievement\");";

$db_con->query($input)
    or die("Error: " . mysqli_error($db_con));

$select = "SELECT achName, imageFile "
        . "FROM Achievements "
        . "WHERE achID = $achievement";

$result = $db_con->query($select);

echo json_encode(mysqli_fetch_assoc($result));
?>