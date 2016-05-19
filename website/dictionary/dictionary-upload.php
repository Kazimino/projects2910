<?php
include("../leaderboard/db_connect.php");

$query = "SELECT * FROM Dictionary LIMIT 1;";

$result = $db_con->query($query);
if($result->num_rows == 0) {
    $dict = fopen("dictionary-raw.txt", "r");
    echo "<b>Inserting Words: </b><br>";
    $query = "INSERT INTO Dictionary (word, length) VALUES";
    while(!feof($dict)) {
        $line = fgets($dict);
        if($line.length >= 3 && $line.length <= 6) {
            $query .= " ('$line', " . $line.length . "),";
            echo $line, "<br>";
        }
    }
    $query = rtrim($query, ",") . ";";
    $db_con->query($query);
    fclose($dict);
} else {
    echo "<b>error: Dictionary already populated</b>";
}
?>