<?php
$db_con = new mysqli("my-db-identifier.cyo63eekgut2.us-west-2.rds.amazonaws.com:3306","db_user","reactor8878","reactor_db");

if(mysqli_connect_errno()) {
    echo "Error: " . mysqli_connect_errno();
}
?>
