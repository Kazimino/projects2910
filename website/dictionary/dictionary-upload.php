<?php
/*this is for uploading the dictionary */
include("../leaderboard/db_connect.php");

$query = "SELECT * FROM Dictionary LIMIT 1;";

$result = $db_con->query($query);
if($result->num_rows == 0) {
    $dict = fopen("dictionary-raw.txt", "r");
    echo "<b>Inserting Words: </b>\n";
    $query = "INSERT INTO Dictionary (word, length, rank) VALUES";
    $words = array();
    $rank = array(3 => 0, 4 => 0, 5 => 0, 6 => 0);
    while(!feof($dict)) {
        $line = trim(fgets($dict));
<<<<<<< HEAD
	$words[$line] = array_key_exists($line, $words) ? ++$words[$line] : 1;
	$length = strlen($line);
        if($length >= 3 && $length <= 6 && $words[$line] == 1 && ctype_alpha($line)) {
=======
        $words[$line] = array_key_exists($line, $words) ? ++$words[$line] : 1;
        $length = strlen($line);
        if($length >= 3 && $length <= 6 && $words[$line] == 1 && ctype_alpha($line) && preg_match('/[aeiouy]/', $line) == 1) {
>>>>>>> 463a68be37ad10073b050be4dd8247472856d5ad
            $query .= " (\"$line\", $length, ".++$rank[$length]."),";
            echo $line . "\n";
        }
    }
    $query = rtrim($query, ",") . ";";
    $db_con->query($query)
	or die("Error: " . mysqli_error($db_con));
    fclose($dict);
} else {
    echo "<b>error: Dictionary already populated</b>";
}
?>
