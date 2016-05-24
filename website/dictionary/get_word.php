<?php
/* this file gets a word */
include("../leaderboard/db_connect.php");

$length = array_key_exists("length", $_GET) ? $_GET["length"] : "4";

$max_rank = array(0,0,0
		         ,751
                 ,1702
                 ,2293
                 ,2766);

$rand_word = rand(1, $max_rank[$length]);

$select = "SELECT word
            FROM Dictionary
            WHERE length = $length
                AND rank = $rand_word;"; 

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

$value =  mysqli_fetch_object($result);

echo $value->word;
?>
