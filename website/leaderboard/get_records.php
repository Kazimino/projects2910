<?php
include("db_connect.php");

$offset = array_key_exists("offset", $_GET) ? $_GET["offset"] : "0";

$select = "SELECT *
            FROM Leaderboard
            ORDER BY time DESC
            LIMIT 10
            OFFSET " . $offset;

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

$count = 1;
while($row = $result->fetch_assoc()) {
    $min = floor($row['time'] / 600);
    $sec = floor($row['time'] % 600 / 10);
    $dsec = $row['time'] % 10;
    echo "<li id=\"record-".$row['recordID']."\">
            <span class=\"lbRank\">".$count++."</span>
            <span class=\"lbName\">".$row['playerName']."</span>
            <span class=\"lbTime\">".($min == 0 ? "0" : $min).":".($sec < 10 ? "0" . $sec : $sec).":".$dsec."</span>
        </li>";
}
?>