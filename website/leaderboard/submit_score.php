<?php
include("db_connect.php");

$score = array_key_exists("score", $_POST) ? $_POST["score"] : 0;
$name = array_key_exists("name", $_POST) ? $_POST["name"] : "Anonymous";
$time = date("Y-m-d H:i:s");

$query = "INSERT INTO Leaderboard (playerName, time, entered)
            VALUES('$name', $score, '$time');";
$db_con->query($query)
    or die("Error: " . mysqli_error($db_con));

$inserted = $db_con->insert_id;

$query = "SELECT recordID
          FROM Leaderboard
          ORDER BY time DESC, entered DESC;";

$result = $db_con->query($query);

$rank = 1;
while($row = $result->fetch_assoc()) {
    if($row["recordID"] == $inserted) {
        break;
    }
    $rank++;
}
echo $rank;
?>
