<?php
include("../leaderboard/db_connect.php");
session_start();
$userid = $_SESSION["userid"];
$achievements = array();
        $select = "SELECT *
                    FROM UserAchievement
                    WHERE name = \"$userid\";";

$result = $db_con->query($select)
    or die("Error " . mysqli_error($db_con));

while($row = $result->fetch_assoc()) {
    array_push($achievements, $row["achID"]);
}
?>

<div class="profileInfo">
    <h1>
    <?php
    echo $userid;
    ?>
    </h1>
</div>
<div class="achievements">
    <h1>Achievements</h1>
    <div class='achievementPanel' id="onFire">
        <?php
        if(in_array("1", $achievements)){
            echo  "<img src=\"achievements/images/on_fire.png\" class=\"achieveImg\" id='onFireBadge'>";
        } else {
            echo "<img src=\"achievements/images/on_fire_lock.png\" class=\"achieveImg\" id='onFireBadge'>";
        }
        ?>
        <p class="caption">Clear five mini games in a row without making an error</p>
    </div>
    <div class='achievementPanel' id="ironMan">
        <?php
            if(in_array("2", $achievements)){
                echo  "<img src=\"achievements/images/iron_man.png\" class=\"achieveImg\" id='ironManBadge'>";
            } else {
                echo "<img src=\"achievements/images/iron_man_lock.png\" class=\"achieveImg\" id='ironManBadge'>";
            }
        ?>
        <p class="caption">Last for 3 minutes in a game</p>
    </div>
    <div class='achievementPanel' id="cleanSweep">
        <?php
            if(in_array("3", $achievements)){
                echo  "<img src=\"achievements/images/clean_sweep.png\" class=\"achieveImg\" id='cleanSweepBadge'>";
            } else {
                echo "<img src=\"achievements/images/clean_sweep_lock.png\" class=\"achieveImg\" id='cleanSweepBadge'>";
            }
        ?>
        <p class="caption">Have an empty board at any point after three minutes</p>
    </div>
</div>