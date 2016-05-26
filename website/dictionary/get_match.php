<?php
/* grabs / finds a matching word to the user input */
include("../leaderboard/db_connect.php");

$word = array_key_exists("word", $_GET) ? $_GET["word"] : "";

$select = "SELECT *
            FROM Dictionary
            WHERE word = \"$word\";";

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

$count = $result->num_rows;

echo $count;
?>
