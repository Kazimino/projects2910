<?php
$db_con = mysqli_connect("my-db-identifier.cyo63eekgut2.us-west-2.rds.amazonaws.com:3306","db_user","reactor8878", "Leaderboard")
    or die("Error " . mysqli_error($db_con));

$offset = array_key_exists("offset", $_GET) ? $_GET["offset"] : "0";

$select = "SELECT playerName, time
            FROM Leaderboard
            ORDER BY time DESC
            LIMIT 10
            OFFSET " . $offset;

$result = mysqli_query($db_con, $select)
    or die("Error " . mysqli_error($db_con));

$scores = new array();
while($row = mysqli_fetch_array($result)) {
    $scores[] = $row;
}

$json = json_encode($scores);

echo $json;
?>