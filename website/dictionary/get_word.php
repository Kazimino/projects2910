<?php
include("../leaderboard/db_connect.php");

$length = array_key_exists("length", $_GET) ? $_GET["length"] : "4";
$rank = array_key_exists("rank", $_GET) ? $_GET["rank"] : "4";

$max_rank = array(0,0,0
		 ,849
                 ,1713
                 ,2296
                 ,2767);

$rand_word = rand((($rank - 1) / 10 * $max_rank[$length]), ($rank / 10 * $max_rank[$length]));

$select = "SELECT word
            FROM Dictionary
            WHERE length = $length
                AND rank = $rand_word;"; 

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

$value =  mysqli_fetch_object($result);

echo $value->word;
?>
