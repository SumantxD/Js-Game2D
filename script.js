const canvas  = document.getElementById('canvas1');

const ctx = canvas.getContext('2d');

const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();//we have createed new image object
playerImage.src = 'shadow_dog.png';

// let x = 0;

const spriteWidth = 575;
const spriteHeight = 523;

//think of these as the row and column of a matrix 
let frameX = 0;//the coordinate x axis //this is not the row but the column
let frameY = 0;//the coordinate y axis //this is not the col but the row 

let gameFrame = 0;
const staggerFrame = 1; 

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


    let position  = Math.floor(gameFrame/staggerFrame)%6;//staggeringFrame is to slow down the individual count 
    //and modulo is to bring it back to the starting horizontal position 

    frameX = spriteWidth*position;


    ctx.drawImage(playerImage, frameX, frameY*spriteHeight, spriteWidth, spriteHeight, 0,0, spriteWidth, spriteHeight);


    gameFrame++;

    requestAnimationFrame(animate);
}
animate();
