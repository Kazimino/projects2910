<div id="dropTab"></div>
<ul class="dropMenu">
    <li id="home">Main Menu</li>
    <?php
     session_start();
    // loads either login & registration form or account page & logout button depending on if a user is logged in
     if(isset($_SESSION["userid"])) {
        echo "<li>Logged in as:<br>".$_SESSION["userid"]."</li>";
        echo "<li id=\"myAccount\">My Account</li>";
        echo "<li id=\"logout\">Logout</li>";
    } else {
        echo "<li id=\"login\">Login</li>";
        echo "<li id=\"loginForm\">";
            echo "<input id=\"loginName\" type=\"text\" maxlength=\"15\" placeholder=\"Username\">";
            echo "<input id=\"loginPassword\" type=\"password\" maxlength=\"20\" placeholder=\"Password\">";
            echo "<input id=\"loginSubmit\" type=\"button\" value=\"Login\">";
            echo "<span class=\"nameError\"></span>";
        echo "</li>";
        echo "<li id=\"register\">Register</li>";
        echo "<li id=\"registerForm\">";
            echo "<input id=\"registerName\" type=\"text\" maxlength=\"15\" placeholder=\"Username\">";
            echo "<input id=\"registerPassword\" type=\"password\" maxlength=\"20\" placeholder=\"Password\">";
            echo "<input id=\"registerSubmit\" type=\"button\" value=\"Register\">";
            echo "<span class=\"nameError\"></span>";
        echo "</li>";
    }
    ?>
</ul>
