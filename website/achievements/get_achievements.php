<?php
/* grabs / finds a matching word to the user input */
include("../leaderboard/db_connect.php");
session_start();

$userid = $_SESSION["userid"];

$input = "SELECT *
            FROM UserAchievement
            WHERE name = \"$userid\"
            ORDER BY achID ASC;";

$result = $db_con->query($input)
    or die("Error: " . mysqli_error($db_con));

$achievements = array();

while($row = $result->fetch_assoc()) {
    $achievements[] = array(
        "achID" => $row["achID"]
    );
}

echo json_encode($achievements);
?>