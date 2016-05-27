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
=============

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

UPDATE: fixed the regex for leaderboards to include 
other characters, we also just integrated this to the
log in system. This way users don't have to worry 
about entering their score, they automatically 
have their scores entered into the leaderboard 
database.

Achievements - Sprint 3 
-----------------------

The achievements were a bit of a challenge. We opted
with implementing a login system over using session 
variables.  We thought it may be easier than
dealing with session variables.  Matt had 
some challenges implementing the login system
however, he was able to complete this and we added the
login feature to a drop down hamburger style 
menu system. 

Users that login will have their scores automatically
registered to the leaderboard under their name. Guests,
however will automatically be registered as guest on
the leaderboard.  

We have 3 achievements: Iron man, which is awarded
after a users survives for 3 minutes; Clean Sweep, is 
awarded when the user has a clear main board with no 
mini-game modules active after 3 minutes; On Fire, which 
is awarded when the user completes 10 mini-games in a 
row with no errors, however, for presentation purposes
we have set that achievement to 5 mini-games completed
with no errors. 

We created badges to award as well as little banners 
for display.  We created an account/profile page and 
in that page we will have a change password function, 
and display the achievements earned and information
about those achievements. 

We used the following sources for some of the icon 
creation for the achievements: 

http://icons.mysitemyway.com/
http://hawksmont.com
https://www.iconfinder.com/
http://www.endlessicons.com/

Unit Testing - Sprint 3
-----------------------

We have implemented some Javascript Unit Testing. 
We used QUnit, which is a javascript unit testing 
framework made by the makers of jQuery, and since
we are using jQuery i thought this was a good idea
to use as well. 

I selected two functions and wrote multiple tests for 
each of these functions.  Some of the stuff in our 
page is hard to test.  What i discovered was that 
generally things inside the $(document).ready() function
cannot be tested or is difficult to test.  I also 
learned that we need to put more stuff outside 
of the ready() function. 

I have JUnit tested in the past a bit and i was used to 
that but using this framework was a little more 
challenging mainly because I don't know javascript
that well. 

Sound - Sprint 3 
----------------

We created our own background music(BGM) using 
Soundation Studio.  The SFX were also create on 
this website as it is a great sound board 
with a lot of sounds and flexibility as well 
as a large amount of controls available to you
for customization.  

Implementing the sounds was not very hard. 
We also created a mute sound button with which
you can mute the sound.  This proved to be a bit 
of a headache however, i was about to complete this task
in a short few hours.  

Tutorial - Sprint 3
-------------------

Another thing we added during sprint 3 
was a tutorial.  We had already planned this but 
we also recieved feedback through our feedback form
that a tutorial is needed for some people.  Many people
are familiar with games these days and do not 
need the extra help but there are others out there
that do need that extra help.  

We created a slide show sort of tutorial where you 
will be shown slides with the premise of the game 
explained and certain elements of the game board will be 
shown to you and explained as we walk through how the 
game works. 

The tutorial is very simple and we would have liked 
to spend more time on it but with the short week, time 
got very short and we still have some important things
to implement.  


Anagram Dictionary - Sprint 3
-----------------------------

One of the things we did this week that was kind 
of unexpected and last minute was rework the anagram
dictionary.  Before, we had a relatively small 
dictionary but it was not so great, had a lot of poor 
words and was just generally frustrating.  

We found another word list that was over 100,000
words long so we wrote a script and had ourselves, and 
some of our friends help us out by filtering the word 
list one by one.  Of course before we did that we pulled 
out words that didn't fit with our length and other such
factors, however, we needed to also pull out proper 
nouns and such. 

This was a big pain and took a good amount of time, but 
we are happy ith the results as the anagram game works 
a lot better because of it and we get less/no 
silly words.  













