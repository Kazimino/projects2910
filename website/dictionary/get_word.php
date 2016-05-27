<?php
/* this file gets a word */
include("../leaderboard/db_connect.php");

<<<<<<< HEAD
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
=======
$length = array_key_exists("length", $_GET) ? $_GET["length"] : "4";

$query = "SELECT * FROM Dictionary WHERE length = $length";
$result = $db_con->query($query);
$max = $result->num_rows;
$rand_word = rand(1, $max);

$select = "SELECT word
            FROM Dictionary
            WHERE length = $length
                AND rank = $rand_word;"; 
>>>>>>> 463a68be37ad10073b050be4dd8247472856d5ad

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

<<<<<<< HEAD
$value = mysqli_fetch_object($result);

echo $value['word'];
?>
=======
$value =  mysqli_fetch_object($result);

echo $value->word;
?>
>>>>>>> 463a68be37ad10073b050be4dd8247472856d5ad
