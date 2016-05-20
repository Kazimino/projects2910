<?php
include("../leaderboard/db_connect.php");

$word = array_key_exists("word", $_GET) ? $_GET["word"] : "1";

$select = "SELECT *
            FROM Dictionary
            WHERE word = \"$word\";";

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

$count = $result->num_rows;

return $count != 0;
?>
