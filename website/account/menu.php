<div id="dropTab"></div>
<ul class="dropMenu">
    <?php if(isset($_SESSION["userid"])) {
        echo "<a href=\"my-account\"><li>My Account</li></a>";
        echo "<li id=\"logout\" onclick=\"logout()\">Logout</li>";
    } else {
        echo "<li id=\"login\" onclick=\"login()\">Login</li>";
        echo "<li id=\"loginForm\">";
            echo "<input id=\"loginName\" type=\"text\" placeholder=\"Username\">";
            echo "<input id=\"loginPassword\" type=\"password\" placeholder=\"Password\">";
            echo "<input id=\"loginSubmit\" type=\"button\" value=\"Login\">";
        echo "</li>";
        echo "<li id=\"register\" onclick=\"register()\">Register</li>";
        echo "<li id=\"registerForm\">";
            echo "<input id=\"registerName\" type=\"text\" placeholder=\"Username\">";
            echo "<input id=\"registerPassword\" type=\"password\" placeholder=\"Password\">";
            echo "<input id=\"registerSubmit\" type=\"button\" value=\"Register\">";
        echo "</li>";
    }
    ?>
</ul>
