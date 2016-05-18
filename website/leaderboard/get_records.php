<?php
$db_con = mysqli_connect("my-db-identifier.cyo63eekgut2.us-west-2.rds.amazonaws.com:3306","db_user","reactor8878","reactor_db");

if(mysqli_connect_errno()) {
    echo "Error: " . mysqli_connect_errno();
}

$offset = array_key_exists("offset", $_GET) ? $_GET["offset"] : "0";

$select = "SELECT *
            FROM Leaderboard
            ORDER BY time DESC
            LIMIT 10
            OFFSET " . $offset;

$result = mysqli_query($db_con, $select)
    or die("Error " . mysqli_error($db_con));

$count = 1;
while($row = mysqli_fetch_array($result)) {
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
