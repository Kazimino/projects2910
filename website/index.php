<html>
    <head>
        <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
        <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
        <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
        <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
        <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
        <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
        <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
        <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon-180x180.png">
        <link rel="icon" type="image/png" href="/favicon-32x32.png" sizes="32x32">
        <link rel="icon" type="image/png" href="/android-chrome-192x192.png" sizes="192x192">
        <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
        <link rel="icon" type="image/png" href="/favicon-16x16.png" sizes="16x16">
        <link rel="manifest" href="/manifest.json">
        <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#00bd09">
        <meta name="apple-mobile-web-app-title" content="Reactor">
        <meta name="application-name" content="Reactor">
        <meta name="msapplication-TileColor" content="#636363">
        <meta name="msapplication-TileImage" content="/mstile-144x144.png">
        <meta name="theme-color" content="#1e1e1e">
        <link href='https://fonts.googleapis.com/css?family=Roboto' rel='stylesheet' type='text/css'>
        <link rel="stylesheet" type="text/css" href="css/style.css">
        <meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0,user-scalable=no">
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/2.2.2/jquery.min.js"></script> 
        <script src ="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.3/jquery-ui.min.js" ></script>
        <script src="js/anagram.js"></script>
        <script src="js/script.js"></script>
        <script src="js/equation.js"></script>
        <script src="js/ascendingNumber.js"></script>
        <script src="js/simonSays.js"></script>
        <script src="js/sound.js"></script>
        <title>Reactor</title>
    </head>
    <body>
        <!----------------content div for logo - header ------------->
        <header>
            <div class="content">
                <nav><?php include("account/menu.php"); ?></nav>
                <img src="images/reactor_logo.png" class="logo">
            </div>
        </header>
<!----------the main tag supports the game itself holds many different 
    - hexagon modules  --------------->
        <main>
            <div class="module" id="top">		
                <div class="hexagon">
                    <div class="hexagon-in1"  >
                        <div class="hexagon-in2">
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                                        <img src="images/simon-says.png" data-pos="top" class="icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module" id="topLeft">
                <div class="hexagon">
                    <div class="hexagon-in1">
                        <div class="hexagon-in2">  
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                                        <img src="images/ascending-icon.png" data-pos="topLeft" class="icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module" id="topRight">
                <div class="hexagon">
                    <div class="hexagon-in1">
                        <div class="hexagon-in2">
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                                        <img src="images/math-icon.png" data-pos="topRight" class="icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module" id="center">
                <div class="hexagon">
                    <div class="hexagon-in1">
                        <div class="hexagon-in2">  
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                                        <img src="images/word-icon.png" data-pos="center" class="icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module" id="bottomLeft">
                <div class="hexagon">
                    <div class="hexagon-in1">
                        <div class="hexagon-in2">
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                                        <img src="images/math-icon.png" data-pos="bottomLeft" class="icon"> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module" id="bottomRight">
                <div class="hexagon">
                    <div class="hexagon-in1">
                        <div class="hexagon-in2">
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                                        <img src="images/ascending-icon.png" data-pos="bottomRight" class="icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="module" id="bottom">
                <div class="hexagon">
                    <div class="hexagon-in1">
                        <div class="hexagon-in2">
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                                        <img src="images/simon-says.png" data-pos="bottom" class="icon">
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <img src="images/arrow.png" id="backbutton"/>
            
          <!---------minigauges--------->
            <div id="mini">
                <div class="module" id="mini-0" data-pos="0">		
                    <div class="hexagon">
                        <div class="hexagon-in1">
                            <div class="hexagon-in2"> 
                                <div class="gauge-fill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="module" id="mini-1" data-pos="0">
                    <div class="hexagon">
                        <div class="hexagon-in1">
                            <div class="hexagon-in2">
                                <div class="gauge-fill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="module" id="mini-2" data-pos="0">
                    <div class="hexagon">
                        <div class="hexagon-in1">
                            <div class="hexagon-in2"> 
                                <div class="gauge-fill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="module" id="mini-3" data-pos="0">
                    <div class="hexagon">
                        <div class="hexagon-in1">
                            <div class="hexagon-in2">
                                <div class="gauge-fill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="module" id="mini-4" data-pos="0">
                    <div class="hexagon">
                        <div class="hexagon-in1">
                            <div class="hexagon-in2"> 
                                <div class="gauge-fill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="module" id="mini-5" data-pos="0">
                    <div class="hexagon">
                        <div class="hexagon-in1">
                            <div class="hexagon-in2"> 
                                <div class="gauge-fill">
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    <!-----In game hexagon, starts off hidden on page contains each game ------>
            <div id="inGame">		
                <div class="hexagon">
                    <div class="hexagon-in1">
                        <div class="hexagon-in2">
                            <div class="gauge-fill">
                            </div>
                            <div class="hexagon inner">
                                <div class="hexagon-in1">
                                    <div class="hexagon-in2">
                    <!------math game html divs start here ----------->
                                        <div id="mathGame">
                                            <h1 id="prob"></h1>
                                            <div class="mathOption"><h1>+</h1></div>
                                            <div class="mathOption"><h1>-</h1></div>
                                            <div class="mathOption"><h1>/</h1></div>
                                            <div class="mathOption"><h1>*</h1></div>
                                        </div>
                    <!--------------anagram game starts here ------------------>
                                        <div id="anagramGame">
                                            <div class="letterRow" id="topLetterRow">
                                                <div class="letterChoice" id="letterChoice0"></div>
                                                <div class="letterChoice" id="letterChoice1"></div>
                                                <div class="letterChoice" id="letterChoice2"></div>
                                            </div>
                                            <div class="letterRow" id="midLetterRow">
                                                <div id="anagramInput"></div>
                                            </div>
                                            <div class="letterRow" id="botLetterRow">
                                                <div class="letterChoice" id="letterChoice3"></div>
                                                <div class="letterChoice" id="letterChoice4"></div>
                                                <div class="letterChoice" id="letterChoice5"></div>
                                            </div>
                                         </div>
                <!-------------------------simon says game starts here ------------------------>
                                        <div id="simonGame">
                                            <div class="section">
                                                <div class="simonSection" id="simonSection1">
                                                </div>
                                                <div class="simonSection" id="simonSection2">
                                                </div>
                                            </div>
                                            <div class="section">
                                                <div class="simonSection" id="simonSection3">
                                                </div>
                                                <div class="simonSection" id="simonSection4">
                                                </div>
                                            </div>
                                        </div>
                <!---------------------ascending numbers stuffs ------------------------>
                                        <div id="ascendingNumber">
                                            <div class="numberRow">
                                                <div class="numberOption" id="numberSection1">
                                                    <span class="number"></span>
                                                </div>
                                                <div class="numberOption" id="numberSection2">
                                                    <span class="number"></span>
                                                </div>
                                            </div>
                                            <div class="numberRow">
                                                <div class="numberOption" id="numberSection3">
                                                    <span class="number"></span>
                                                </div>
                                                <div class="numberOption" id="numberSection4">
                                                    <span class="number"></span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
<!----------------- Audio files for stuffs here ------------------->
            <audio id="sound"></audio>
            <audio id="bgm"></audio>

    <!-------------In game hexagon ends here -------------->
            <div class="menu">
                <img src="images/reactor_logo.png" class="menulogo" onclick="logoClick()">
                <img src="images/PlayButton2.png" data-alt-src ="images/PlayButtonPressed.png" class="menuItem" onclick="playGame()">
                <img src="images/TutorialButton2.png" data-alt-src="images/TutorialButtonPressed.png" class="menuItem" onclick="playTutorial()">
                <img src="images/leaderboardbtn.png" data-alt-src="images/leaderboardbtnCL.png" class="menuItem" id="btnSize" onclick="loadLeaderBoard()">
                <img src="images/CompanyLogo.png" class="menuItem">
            </div> 
            <!---------------leaderboard starts here ----------------->
            <div class="leaderBoard">
                <h1>Leaderboard</h1>
                <ul id="leaderList"></ul>
                <div id="loadMore">Load More Scores</div>
            </div>
            <!--------------- achievements ---------------------------->
            <div class="profile">
            </div>
        </main>
        
        <div class="tutorial">
            <div class="tutorialNav" id="backArrow" onclick="backTutorial()"></div>
            <div class="tutorialNav" id="frontArrow" onclick="forwardTutorial()"></div>
            <div class="tutorialImg" id="tutorial1"></div>
            <div class="tutorialImg" id="tutorial2"></div>
            <div class="tutorialImg" id="tutorial3"></div>
            <div class="tutorialImg" id="tutorial4"></div>
            <div class="tutorialImg" id="tutorial5"></div>
            <div class="tutorialImg" id="tutorial6"></div>
            <div class="tutorialImg" id="tutorial7"></div>
            <div class="tutorialImg" id="tutorial8"></div>
            <div class="tutorialImg" id="tutorial9"></div>
            <div class="tutorialImg" id="tutorial10"></div>
            <div class="tutorialImg" id="tutorial11"></div>
            <div class="tutorialImg" id="tutorial12"></div>
        </div>
                
        <footer>
            <div class="content">
                <div id="timerBox">
                </div>
                <div id="heatMeter"></div>
                <img src="images/soundUC.png" data-alt-src="images/soundC.png" id="soundbtn" />
                <img src="images/muteUC.png" data-alt-src="images/muteC.png" id="mutebtn" />
            </div>
        </footer>
        
<!-------------- END GAME OVERLAY BROS ------------->
        <div class="overlay">
            <div class="endGame">
                <h1>Meltdown!</h1>
                <h3>You Lasted: <span id="timeLasted"></span></h3>
                
                <div class="scoreSubmission"></div>
                
                <div id="overlayBtn">
                    <img src="images/mainmenubtnC.png" data-alt-src="images/mainmenubtn.png" class="egbtns" onclick="mainMenu()"/>
                    <img src="images/tryAgainUC.png" data-alt-src="images/tryAgainC.png" class="egbtns" onclick="retry()"/>
                </div>
                
            </div>
        </div>
    </body>
</html>
