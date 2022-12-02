let playerState = 'idle';

const dropdown  = document.getElementById('animations');

dropdown.addEventListener('change', function(e){

    playerState = e.target.value;

})

const canvas  = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

let gameSpeed = 15;

const backgroundLayer1 = new


const playerImage = new Image();//we have createed new image object
playerImage.src = 'shadow_dog.png';

// let x = 0;

const spriteWidth = 575;
const spriteHeight = 523;

//think of these as the row and column of a matrix 
// let frameX = 0;//the coordinate x axis //this is not the row but the column
// let frameY = 0;//the coordinate y axis //this is not the col but the row 

//we don't need the above two frame x and frame y //as now we have the exact coordinate

let gameFrame = 0;
const staggerFrame = 3; 



//this is all the animations for which the data we want to be created
const animationStates = [
    //each obj will contain the name of the animation and the no of franes in contains
    //for every row we will create such an object going from top to bottom 
    {
        name: 'idle',
        frames: 7,
    },
    {
        name: 'jump',
        frames:7,
    },
    {
        name: 'fall',
        frames:7,
    },
    {
        name: 'run',
        frames:9,
    },
    {
        name: 'dizzy',
        frames:11,
    },
    {
        name: 'sit',
        frames:5,
    },
    {
        name: 'roll',
        frames:7,
    },
    {
        name: 'bite',
        frames:7,
    },
    {
        name: 'getHit',
        frames:4,
    },
];

//for each type of animation we will store the data here
//data structure that will map location in the sprite sheet corresponding to each animation 
const spriteAnimation = [];

animationStates.forEach((state, index) => {

    //now for each iteration we will create an oject
    //we create a variable called frames and set it equal to an abject 
    let frames = {
        //inside the object we will have a property call loc "location" //that will be an empth array for now 
        loc: [],
        //an object in js can also be seen as a map 
    }

    //now for each frame of the current state
    for(let j = 0; j<state.frames; j++){
        let positionX = j*spriteWidth;
        let positionY = index*spriteHeight;
        //now lets push these values in the loc array 
        //we will create an object with two properties x and y and then push it 
        frames.loc.push({x:positionX, y:positionY});
    }

    spriteAnimation[state.name] = frames;//spriteAnimation is a map of name of the animation and the frames obj
    //from the obj we can access teh loc array 

});



function  animate(){

    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // ctx.fillRect(100,50,100,100);
    // x++;
    // ctx.drawImage(playerImage, 0, 0);

    //from where we want to cut from the sprite image //and where do we want to place it in our canvas
    

    // if(gameFrame%staggerFrame == 0){//the old method 
    //      if(frameX < 6){
    //         frameX++;
    //     }else{
    //         frameX = 0;
    //     }
    //     gameFrame = 0;
    // }

    //now we wll use more advance method to do the same task //using the gane frame and stagerring frame
    //this is for the horizontal positioning 

    //now we will create array of objects for better aniation to prevent overflow for each animation type

    //we will cycle through the sprite sheet like a matrix and will store the data for each type of animation the x and y coord.
 

    // spriteAnimation = [

    //     "idle" = {},
    //     "jump" = {},
    //     "run" = {},

    // ]

    //we want the location array for idle or jump from the spriteAnimation 

    let position  = Math.floor(gameFrame/staggerFrame)%spriteAnimation[playerState].loc.length;//.lengt is to get the length of the loc array related to idle animation 
    //staggeringFrame is to slow down the individual count 
    //and modulo is to bring it back to the starting horizontal position 

    let frameX = spriteWidth*position;
    let frameY = spriteAnimation[playerState].loc[position].y;//this has the complete precalculated value so we don't need any sort of multlipication 

    

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0,0, spriteWidth, spriteHeight);


    gameFrame++;

    requestAnimationFrame(animate);
}
//waiiting for tapaswini
animate();
