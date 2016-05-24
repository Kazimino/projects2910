# projects2910
Projects 2910

  WELCOME TO REACTOR  README 
==========================
*******************************
WHAT IS REACTOR? 
============

Reactor is a multitasking brain game that 
allows you to manage multiple modules.
The goal is to stop the reactor from melting 
down by solving the mini-game inside 
each module that is presented to you.  THere 
is a heat guage for each module, if 
the heat guage for an individual module 
gets full, your main heat bar will increase 
at an accelerated rate.  You want to mitigate 
the heat being passed on to the main heat bar 
by promptly solving each puzzle presented to you. 

THere is some "coolant" which counter acts the 
heat however it is set quite low right now and 
you will only see the effect of it when there are no active 
games.  

We have a leaderboard for the top times. 


The Code 
=======
Each game is split into it's own javascript file and
then incorporated into the game via the main 
script.js file. 

We've done our best to modularize the games.  You will see
in the script.js file there are module objects that allow us
to store each game object with data and answer; this allows 
us to have multiple types of the same game active which 
help stop game collisions while the main game is running. 

We have also separated the javascript functions from our 
jQuery functions.  At the top of script.js you will see the 
jQuery functions that run/do the main calls - ie. the game loop. 
Further down exists the javascript functions that run a lot 
of the main game.  


Css is used heavily in the project - the hexagons especially 
were a bit of a challenge. THey are created wiht multiple rectangular divs 
and use a mask/overflow to hide the excess stuffs.  
A lot of the CSS is changed within the javascript to achieve 
some of the effects that we need. 

As far as the game itself goes. We haven't used any sort 
of fancy frame work to make the game run. We don't have 
any sort of overall gameloop , we just use jQuery and it's object/
looping functions to run the game. 


The Structure 
=========

Our expert matthew has gone through the code
and organized it in to a useful sort of framework. 
Making it very easy for us game builders to come 
in with our game code and implement it into 
the game, and the game will populate the 
"activeArray" with "module" objects which 
allows nice control of the game.  

The HTML is a well nested, well structure page.  
We have structured it so that the "main" tag 
is responsive and everything inside main is built 
to be responsive.  All the different components
of the game are nested inside the 'main' tag,
and we use .css() and .animate() functions 
from jQuery to hide, move, and animate the 
different components of the game.  

Furthermore we are using a CDN in the html to 
link the jQuery file.  This way, we have a higher 
chance of jQuery already being on the clients 
computer.  

We have also added a bunch of different 
icon links so if people decide to "add to link 
to homepage", the icon will look nice regardless
of the device the user is using.  


Weekly Challenges 
============

Easter Egg - Week 1 
---------------------
Our easter egg is a humorous one. If you 
click the logo on the main menu screen 5 times, 
you will be given an alert prompt and the game 
will transition to the main game screen 
and you will be faced with a lovely picture of 
Chris in the center hexagon surrounded by 
reeses peanut buttercups.  

Simple and elegant. 

Leaderboard - Week 2 
-----------------------

The leaderboards were implemented by Matthew.
He had some challenges with writing scores 
to the leaderboard.  He was able to get it to
work with a little bit of hair pulling out.

We have placed a button on the main screen to 
allow you to go to the leaderboard and see the top 
scores. we will be implementing a get more scores 
button so users can see more scores. 

Users will also be alerted to the ranking they got 
after they finish their game. 


Future 
=====


We still have to add sounds and a tutorial. We 
are also considering adding powerups like 
a heat bar freeze, an increased coolant powerup, 
and a free module "pass".  We're not sure how to 
award these, this is just an idea because we are 
so far ahead at this point. 
You could call this scope creep however, being 
ahead, we don't feel it's going to be detremental to 
the project to add something. 















