<?php
include("db_connect.php");

<<<<<<< HEAD
$offset = array_key_exists("offset", $_GET) ? $_GET["offset"] : "0";
=======
$offset = array_key_exists("offset", $_GET) ? $_GET["offset"] : 1;
>>>>>>> 463a68be37ad10073b050be4dd8247472856d5ad

$select = "SELECT *
            FROM Leaderboard
            ORDER BY time DESC
            LIMIT 10
            OFFSET " . $offset;

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

<<<<<<< HEAD
$count = 1;
=======
>>>>>>> 463a68be37ad10073b050be4dd8247472856d5ad
while($row = $result->fetch_assoc()) {
    $min = floor($row['time'] / 600);
    $sec = floor($row['time'] % 600 / 10);
    $dsec = $row['time'] % 10;
    echo "<li id=\"record-".$row['recordID']."\">
            <span class=\"lbRank\">".++$offset."</span>
            <span class=\"lbName\">".$row['playerName']."</span>
            <span class=\"lbTime\">".($min == 0 ? "0" : $min).":".($sec < 10 ? "0" . $sec : $sec).":".$dsec."</span>
        </li>";
}
?>