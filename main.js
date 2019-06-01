//start overlay
function openNav() {
  document.getElementById("myNav").style.display = "block";
}
openNav();
function closeNav() {
  document.getElementById("myNav").style.display = "none";
}

//create the map
var map=[];
map[0]="<i><u>Kitchen</u></i>";
map[1]="<i><u>Door</u></i>";
map[2]="<i><u>Crime Scene</u></i>";
map[3]="<i><u>Living Room</u></i>";
map[4]="<i><u>Hallway</u></i>";
map[5]="<i><u>Bathroom</u></i>";
map[6]="<i><u>Bedroom</u></i>";
map[7]="<i><u>Entrance</u></i>";
map[8]="<i><u>Garage</u></i>";

//create the images
var images=[];
images[0]="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fmobilehomeliving.org%2Fwp-content%2Fuploads%2F01-Kitchen-012-After.jpg&f=1";
images[1]="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fcdn2.newsok.biz%2Fcache%2Fr960-fb55f96c478389d6b0a9be30d27cd641.jpg&f=1";
images[2]="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fs-media-cache-ak0.pinimg.com%2F736x%2F95%2F5f%2F08%2F955f08e7e41327828077f3e88c481e5c.jpg&f=1";
images[3]="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Ftse1.mm.bing.net%2Fth%3Fid%3DOIP.Rso7P5do-zzfjpiMNsJ_xQHaFj%26pid%3DApi&f=1";
images[4]="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fwww.ingame.de%2Ffiles%2F2014%2F08%2FP.T.-thumbnail.jpg&f=1";
images[5]="https://proxy.duckduckgo.com/iu/?u=http%3A%2F%2Fhomedesignapps.com%2Fwp-content%2Fuploads%2F2017%2F01%2Faverage-cost-for-a-contractor-to-remodel-a-bathroom.jpg&f=1";
images[6]="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Favocadoexplosion.files.wordpress.com%2F2011%2F04%2Fdsc_0257.jpg&f=1";
images[7]="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fblog.storage.com%2Fwp-content%2Fuploads%2F2015%2F07%2FEntryway-Hacks-large.jpg&f=1";
images[8]="https://proxy.duckduckgo.com/iu/?u=https%3A%2F%2Fhgtvhome.sndimg.com%2Fcontent%2Fdam%2Fimages%2Fhgtv%2Ffullset%2F2007%2F10%2F4%2F0%2Fhdswt301_2cb_Garage-after.jpg.rend.hgtvcom.1280.960.suffix%2F1400941779004.jpeg&f=1";

//create text descriptions
var textOutputs = [];
textOutputs[0] = "It seems to be a normal kitchen.<br><br>An unpleasant smell is coming from the door on the right.";
textOutputs[1] = "A creepy door appears before you.<br><br>What if I slipped <i>right</i> in?";
textOutputs[2] = /*document.createChild('button');*/"A head, without it's body, rolls next to your shoe.<br><br>...";
textOutputs[3] = "Where is it!?<br><br>You notice the window is open.";
textOutputs[4] = "Several doors appear aside you.<br><br>Is this job even worth doing?";
textOutputs[5] = "The foul scent is near.<br><br>I need to take a long shower after this.";
textOutputs[6] = "A sense of nestalgia falls over you.<br><br>That'd be my room if she said no that night.";
textOutputs[7] = "An aroma stings your nose.<br><br>DAMN IT! I never wanted to take this case.";
textOutputs[8] = "No traces of blood here.<br><br>I wonder who lived here...";

//player blocked messages
var blockedPathMessages="Hmmm... I'm unable to go this way.";

//player's playersInventory
var playersInventory = [];

let countKey = 0;

//set the button variables
/*var north = document.getElementById('north');
var northInput = north.addEventListener('click', function(){
north = actionsIKnow[0];
});*/

//set the player's start location
var mapLocation=7;

//initialize the player's input
var playersInput="";

//Initialize the gameMessage
var gameMessage="";

/*creat an array of actions the game understands and a variable to stare the current aaction*/
var actionsIKnow=["north","east","south","west","forward","right","back","left","up","down","straight","walk","inventory","joke","help"];
var action="";

//the input and output fields
var output=document.querySelector("#output");
var input=document.querySelector("#input");
var textOutput = document.querySelector("#text");

//the images
var image=document.querySelector("img");

//the button
var enterButton=document.getElementById("enter");
enterButton.style.cursor="pointer";
enterButton.addEventListener("click", clickHandler, false);
document.addEventListener("keydown", function(){
  if(event.keyCode==13){
    //alert('you pressed it!');
    document.getElementById("enter").click();
  }
});
//display the player's location
render();

function clickHandler(){
  playGame();
}

function playGame(){
  //get the player's input and convert it to lowercase
  playersInput=input.value;
  playersinput=playersInput.toLowerCase();

  //reset these variables from the previous turn
  gameMessage="";
  action="";



  //figure out the player's actions
  for(var i=0;i<actionsIKnow.length;i++){
    if(playersInput.indexOf(actionsIKnow[i])!==-1){
      action=actionsIKnow[i];
      console.log("player's action: "+action);
      break;
    }//end of if
  }//end of for

  //choose the correct actions
  switch(action){
    case "north":
      if(mapLocation>2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8){
        mapLocation-=3;
      }else {
        gameMessage=blockedPathMessages;
      }
      break;

    case "south":
      if(mapLocation<5 && mapLocation !== 1 && mapLocation !== 2){
        mapLocation+=3;
      }else {
        gameMessage=blockedPathMessages;
      }
      break;

    case "east":
      if(mapLocation%3!=2 && mapLocation !== 6){
      mapLocation+=1;
      } else {
        gameMessage=blockedPathMessages;
      }
    break;

    case "west":
      if(mapLocation%3!=0 && mapLocation !== 7){
      mapLocation-=1;
      }else {
        gameMessage=blockedPathMessages;
      }
    break;

    case "forward":
      if(mapLocation>2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8){
        mapLocation-=3;
      }else {
        gameMessage=blockedPathMessages;
      }
      break;

    case "back":
      if(mapLocation<5 && mapLocation !== 1 && mapLocation !== 2){
        mapLocation+=3;
      }else {
        gameMessage=blockedPathMessages;
      }
      break;

    case "right":
      if(mapLocation%3!=2 && mapLocation !== 6){
      mapLocation+=1;
      } else {
        gameMessage=blockedPathMessages;
      }
    break;

    case "left":
      if(mapLocation%3!=0 && mapLocation !== 7){
      mapLocation-=1;
      }else {
        gameMessage=blockedPathMessages;
      }
    break;

    case "up":
      if(mapLocation>2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8){
        mapLocation-=3;
      }else {
        gameMessage=blockedPathMessages;
      }
      break;

    case "down":
      if(mapLocation<5 && mapLocation !== 1 && mapLocation !== 2){
        mapLocation+=3;
      }else {
        gameMessage=blockedPathMessages;
      }
      break;

      case "straight":
        if(mapLocation>2 && mapLocation !== 4 && mapLocation !== 5 && mapLocation !== 8){
          mapLocation-=3;
        }else {
          gameMessage=blockedPathMessages;
        }
        break;

      case "walk":
        gameMessage="Which way do I walk?";
        break;

      case "inventory":
        gameMessage=playersInventory;
        break;

      case "help":
        gameMessage="Find out what happened by using your directions & inventory!"
        break;

      case "joke":
        gameMessage=jokeMessages;
        break;

      // case 2:
      //   alert('This is crazy!');
      //   break;

    default:
      gameMessage="I seem to be losing my thoughts.";
      //maybe i can add default messages that are random
  }//end of switch(action)

//special location events
switch (mapLocation) {
  case 2:
    //alert("It's loaded!");
    enterButton.addEventListener('click',function(){
      alert('ew...')

    });
    break;

  case 5:
  if(mapLocation===5 && countKey==0){

        //enterButton.addEventListener('click',function(){
          gameMessage="Found a key in the sink!";
          playersInventory.push('key');
          countKey++;
        //});

  }
    break;

  default:

}//end of switch(mapLocation)

  //render the game
  render();
}//end of function playGame;
function render(){
  //render the loction
  output.innerHTML=map[mapLocation];
  image.src=images[mapLocation];
  textOutput.innerHTML=textOutputs[mapLocation];

  //display the game message
  text.innerHTML+="<br><br><em>"+gameMessage+"</em>";
  //text.innerHTML+="<em>"+walkMessage+"</em";
}
