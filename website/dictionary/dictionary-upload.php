<?php
include("../leaderboard/db_connect.php");

$query = "SELECT * FROM Dictionary LIMIT 1;";

$result = $db_con->query($query);
if($result->num_rows == 0) {
    $dict = fopen("dictionary-raw.txt", "r");
    while(!feof($dict)) {
        $line = fgets($dict);
        if($line.length >= 3 && $line.length <= 6) {
            
        }
    }
    fclose($dict);
}
?>