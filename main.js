//starting start overlay
function openNav() {
  document.getElementById("myNav").style.display = "block";
}
openNav();

//closing start overlay
function closeNav() {
  document.getElementById("myNav").style.display = "none";
}
document.addEventListener("keydown", function() {
  if (event.keyCode == 27) {
    //alert('you pressed it!');
    closeNav();
  }
});

var title = "pictures/title.jpg";

//create the map
var map = [];
map[0] = "<i><u>KITCHEN</u></i>";
map[1] = "<i><u>MYSTERIOUS DOOR</u></i>";
map[2] = "<i><u>THE CRIME SCENE</u></i>";
map[3] = "<i><u>LIVING ROOM</u></i>";
map[4] = "<i><u>HALLWAY</u></i>";
map[5] = "<i><u>BATHROOM</u></i>";
map[6] = "<i><u>BEDROOM</u></i>";
map[7] = "<i><u>ENTRANCE</u></i>";
map[8] = "<i><u>GARAGE</u></i>";

//create the images
var images = [];
images[0] = "pictures/kitchen.jpg";
images[1] = "pictures/door.jpg";
images[2] = "pictures/crime-scene.jpg";
images[3] = "pictures/living-room.jpg";
images[4] = "pictures/hallway.jpg";
images[5] = "pictures/bathroom.jpg";
images[6] = "pictures/bedroom.jpeg";
images[7] = "pictures/entrance.jpg";
images[8] = "pictures/garage.jpg";

//create text descriptions
var textOutputs = [];
textOutputs[0] = "It seems to be a normal kitchen.<br><br>An unpleasant smell is coming from the door on the right.";
textOutputs[1] = "A creepy door appears before you.<br><br>What if I slipped <i>right</i> in?";
textOutputs[2] = /*document.createChild('button');*/ "A head, without it's body, rolls next to your shoe.<br><br>...";
textOutputs[3] = "Where is it!?<br><br>You notice the window is open.";
textOutputs[4] = "Several doors appear aside you.<br><br>Is this job even worth doing?";
textOutputs[5] = "The foul scent is near.<br><br>I need to take a long shower after this.";
textOutputs[6] = "A sense of nestalgia falls over you.<br><br>That'd be my room if she said no that night.";
textOutputs[7] = "An aroma stings your nose.<br><br>DAMN IT! I never wanted to take this case.";
textOutputs[8] = "No traces of blood here.<br><br>I wonder who lived here...";

//create closed doors
// var doors = [];
// doors[0] = true;
// doors[1] = false;
// doors[2] = true;
// doors[3] = true;
// doors[4] = true;
// doors[5] = true;
// doors[6] = true;
// doors[7] = true;
// doors[8] = true;

//player blocked messages
var blockedPathMessages = "Hmmm... I'm unable to go this way.";

//player's playersInventory
var playersInventory = [];
var countKey = 0;
var countStick = 0;
var countWindow = 0;

//set the button variables
/*var north = document.getElementById('north');
var northInput = north.addEventListener('click', function(){
north = actionsIKnow[0];
});*/

//set the player's start location
var mapLocation = 7;

//initialize the player's input
var playersInput = "";

//Initialize the gameMessage
var gameMessage = "";

/*creat an array of actions the game understands and a variable to stare the current aaction*/
var actionsIKnow = ["north", "east", "south", "west", "forward", "right", "back", "left", "up", "down", "straight", "walk", "inventory", "help", "joke", "advice"];
var action = "";

//the input and output fields
var output = document.querySelector("#output");
var input = document.querySelector("#input");
var textOutput = document.querySelector("#text");
//var door = document.querySelector("#door");

//the images
var image = document.querySelector("img");

//the enter button
var enterButton = document.getElementById("enter");
enterButton.style.cursor = "pointer";
enterButton.addEventListener("click", clickHandler, false);
document.addEventListener("keydown", function() {
  if (event.keyCode == 13) {
    //alert('you pressed it!');
    document.getElementById("enter").click();
    document.getElementById('input').value = "";
  }
});
document.addEventListener('click', function() {
  document.getElementById("enter").click();
  document.getElementById('input').value = "";
});

//display the player's location
render();

function clickHandler() {
  playGame();
}

function playGame() {
  //get the player's input and convert it to lowercase
  playersInput = input.value;
  playersInput = playersInput.toLowerCase();

  //reset these variables from the previous turn
  gameMessage = "";
  action = "";

  //figure out the player's actions
  for (var i = 0; i < actionsIKnow.length; i++) {
    if (playersInput.indexOf(actionsIKnow[i]) !== -1) {
      action = actionsIKnow[i];
      console.log("player's action: " + action);
      break;
    } //end of if
  } //end of for

  //choose the correct actions
  switch (action) {
    case "north":
      if (mapLocation > 2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8) {
        mapLocation -= 3;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "south":
      if (mapLocation < 5 && mapLocation !== 1 && mapLocation !== 2) {
        mapLocation += 3;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "east":
      if (mapLocation % 3 != 2 && mapLocation !== 6 && countKey !== 0) {
        mapLocation += 1;
        // } else if (mapLocation % 3 != 2 && mapLocation !== 6 && mapLocation !== 1 && countKey == 0) {
        //   mapLocation += 1;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "west":
      if (mapLocation % 3 != 0 && mapLocation !== 7) {
        mapLocation -= 1;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "forward":
      if (mapLocation > 2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8) {
        mapLocation -= 3;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "back":
      if (mapLocation < 5 && mapLocation !== 1 && mapLocation !== 2) {
        mapLocation += 3;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "right":
      if (mapLocation % 3 != 2 && mapLocation !== 6 /*|| mapLocation=false*/ ) {
        mapLocation += 1;
        // } if (door == true) {
        //   mapLocation += 1;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "left":
      if (mapLocation % 3 != 0 && mapLocation !== 7) {
        mapLocation -= 1;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "up":
      if (mapLocation > 2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8) {
        mapLocation -= 3;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "down":
      if (mapLocation < 5 && mapLocation !== 1 && mapLocation !== 2) {
        mapLocation += 3;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "straight":
      if (mapLocation > 2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8) {
        mapLocation -= 3;
      } else {
        gameMessage = blockedPathMessages;
      }
      break;

    case "walk":
      gameMessage = "Which way do I walk?";
      break;

    case "inventory":
      if (countKey == 0 && countStick == 0) {
        gameMessage = "You got nothing in your pockets.";
      } else {
        gameMessage = playersInventory;
      }
      //console.log(playersInventory);
      break;

    case "help":
      gameMessage = "Find out what happened by using your directions & inventory!";
      break;

    case "joke":
      gameMessage = jokeMessages;
      break;

    case "window":
      if (mapLocation == 3 && countStick == 0) {
        gameMessage = "Found a derpy stick outside.";
        playersInventory.push('Derpy Stick');
        actionsIKnow.push('stick');
        countStick++;
      } else if (mapLocation == 3 && countStick !== 0) {
        gameMessage = "I don't need to carry more useless sticks!";
      }
      break;

    case "key":
      if (mapLocation == 1 && countKey !== 0) {
        gameMessage = "The door unlocked!";
        playersInventory.pull('Mysterious Key');
      } else {
        gameMessage = "I don't need a key here.";
      }
      // switch (action) {
      //   case "right":
      //     if (mapLocation % 3 != 2 && mapLocation !== 6 && countKey !== 0) {
      //       mapLocation += 1;
      //     } else {
      //       gameMessage = blockedPathMessages;
      //     }
      //     break;
      //   case "east":
      //     if (mapLocation % 3 != 2 && mapLocation !== 6 && countKey !== 0) {
      //       mapLocation += 1;
      //     } else {
      //       gameMessage = blockedPathMessages;
      //     }
      //     break;
      //
      //   default:
      //
      // }
      break;

    case "stick":
      gameMessage = "Why in the hell did I pick this up? It can't do anything!";
      break;

    default:
      //action = "";
      //if(keyCode == 13){
      gameMessage = "I seem to be losing my thoughts.";
      //maybe i can add default messages that are random
      // } else {
      // gameMessage = "";
      //}
  } //end of switch(action)



  //special location events
  switch (mapLocation) {
    case 2:
      //alert("It's loaded!");
      if (mapLocation == 2 && countKey !== 0 /*&& action == key && door == false*/ ) {
        //alert('yes!');
        enterButton.addEventListener('click', function() {
          alert('Ewww... ...I guess I won?');

        });
      }
      break;

    case 5:
      if (mapLocation === 5 && countKey == 0) {
        //enterButton.addEventListener('click',function(){
        gameMessage = "Found a key in the sink!";
        playersInventory.push('Mysterious Key');
        actionsIKnow.push('key');
        countKey++;
        //});
        // } else if (mapLocation == 5 && countKey !== 0) {
        //   gameMessage = "I don't think I'd be that lucky to find another key in that room.";
      }
      break;

    case 3:
      if (mapLocation == 3 && countWindow == 0) {
        actionsIKnow.push('window');
        countWindow++;
      }
      // switch (action) {
      //   case "window":
      //   if (mapLocation==3 && countStick==0) {
      //     gameMessage="Found a derpy stick outside!";
      //     playersInventory.push('Derpy Stick');
      //     countStick++;
      //   }
      //   break;
      // default:
      //gameMessage="More sticks are useless!";

      //  }
      // if (mapLocation==3 && countStick==0 && playersInput=="window") {
      //   gameMessage="Found a derpy stick outside.";
      //   playersInventory.push('Derpy Stick');
      //   countStick++;
      // } else if (mapLocation==3 && countStick!==0 && playersInput=="window") {
      //   gameMessage="I don't need more useless sticks!";
      // }
      break;
    default:

  } //end of switch(mapLocation)

  //render the game
  render();
} //end of function playGame;

function render() {
  //render the loction
  output.innerHTML = map[mapLocation];
  image.src = images[mapLocation];
  textOutput.innerHTML = textOutputs[mapLocation];
  //door.innerHTML = doors[mapLocation];

  //display the game message
  text.innerHTML += "<br><br><em>" + gameMessage + "</em>";
  //text.innerHTML+="<em>"+walkMessage+"</em";
}
