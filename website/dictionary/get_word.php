<?php
/* Gets a random word of the specified length */
include("../leaderboard/db_connect.php");

$length = array_key_exists("length", $_GET) ? $_GET["length"] : "4";

$query = "SELECT * FROM Dictionary WHERE length = $length";
$result = $db_con->query($query);
$max = $result->num_rows;
$rand_word = rand(1, $max);

$select = "SELECT word
            FROM Dictionary
            WHERE length = $length
                AND rank = $rand_word;"; 

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

$value =  mysqli_fetch_object($result);

echo $value->word;
?>