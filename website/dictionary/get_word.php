<?php
include("db_connect.php");

$length = array_key_exists("length", $_GET) ? $_GET["length"] : "1";
$rank = array_key_exists("rank", $_GET) ? $_GET["rank"] : "1";

$max_rank = array(3 => 849
                 ,4 => 1713
                 ,5 => 2296
                 ,6 => 2767);

$rand_word = rand(($rank - 1) / 10 * $max_rank[$length], $rank / 10 * $max_rank[$length]);

$select = "SELECT *
            FROM Dictionary
            WHERE length = $length
                AND rank = $rand_word;" 

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

echo $result;
?>