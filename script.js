// let playerState = 'idle';

// const dropdown  = document.getElementById('animations');

// dropdown.addEventListener('change', function(e){

//     playerState = e.target.value;

// })

//to make vs code editor suggest the built in canvas methods //like the arc method to build a circle
/** @type{HTMLCanvasElement} */

const canvas  = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 800;
const CANVAS_HEIGHT = canvas.height = 700;

const collisionCanvas  = document.getElementById('collisionCanvas');
const collisionCtx = collisionCanvas.getContext('2d');
collisionCanvas.width = 806;
collisionCanvas.height = 706;

let gameFrame = 0;//this we will use to slow down the animation 



//we will create a variable enemy1 and assign it to an object 
//an object is like a map in js

// enemy1 = {
//     x: 10,
//     y: 50,
//     width: 200, 
//     height: 200,
// }

//we will use class to create enemy

const noOfEnemies = 100;//we will have 100 enemeis instanciated
const enemiesArray = [];//this will store all the enemies //initially it is empty we will fill it using the for loop 

const enemyImage = new Image();
enemyImage.src = 'enemy/enemy1.png';

class Enemy {
    constructor(){
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.spriteWidth = 293;//this can be calculated using the widht of the image divided by the no of sprites
        this.spriteHeight = 155;
        //the above are the original dimentions of the sprite image 
        //we will keep the rendered box size relative to the spreiteWidht and spriteHeight to preserve the aspect ratio



        this.height = this.spriteHeight/2.5;
        this.width = this.spriteWidth/2.5; 
        this.speed = Math.random()*4 -2;//this will generate a random no from -2 to +2

        this.frame = 0;//this will keep trach of wich frame we want to currently display
    }

    //we will create the update method for the enemy movement
    update(){
        this.x += this.speed;
        this.y += this.speed;

        if(gameFrame%2 === 0){

            this.frame > 4 ? this.frame = 0 : this.frame++;
            gameFrame = 0; 
        }

        //we want the frames to cycle

    }
    //the draw method will be assigned to each enemy so that we don't have to call it over again for each enemy
    draw(){
        ctx.strokeRect(this.x, this.y, this.width, this.height);
        // ctx.drawImage(enemyImage, this.x, this.y); //we can add the additional width and the height property which will scale the image into the small box 
        // ctx.drawImage(enemyImage, this.x, this.y, this.width, this.height); //but we don't really wnat that we wnat to corp out one farame at a time 
        // and we want to jump to the right by the amount of the individual sprite width to the right //to the amout of frame
        ctx.drawImage(enemyImage,this.frame*this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);//we will add additional 4 arguments to tell it that what are we want to crop out from the image 
        //the image we want to dray //4-> which part of the image we want to crop //4-> where we want to place the cropped image on the canvas
        //we wnat to move frame by frame untill the last one and then jump back to the last one 

    }
};

//we will create the total no of enemy using a for loop equal to the no of enemeies

// const enemy1 = new Enemy();
for(let i=0; i<noOfEnemies; i++){//this will create 100 enemies using the enemy class constructor
    enemiesArray.push(new Enemy());
}

//now time to add some real enemy using sprites

// const enemyRaven = new Image();
// enemyRaven.src = 'enemy_raven.png';

let life = 10;

//we will be making ravens from here
let ravens = [];

class Raven{//this will create all teh animated ravens
    constructor(){
        this.spriteWidth = 271;
        this.spriteHeight = 194;

        //we will keep the width and height of our spriteSheet relative to our sprite dimention to preserve the aspect ratio
        this.sizeModifier =  Math.random()*0.6 + 0.4;//we will have a value from 0.4 to 1
        this.width = this.spriteWidth*this.sizeModifier;
        this.height = this.spriteHeight*this.sizeModifier;
        this.x = canvas.width;//so that can fly to the left after creation
        this.y = (Math.random() * CANVAS_HEIGHT) - this.height;//we will make them randomly instanciate //-this.height so that the raven will not fall out of frame when we instanciate
        this.directionX = Math.random()*5 + 3;//the horizontal speed will be between 3 and 8 
        //we want the ravens to move up and down 
        this.directionY = Math.random() * 5 -2.5; 
        this.markForDeletion = false;
        this.image = new Image();
        this.image.src = 'enemy_raven.png';

        this.frame = 0;//the current frame that we are showing
        this.maxFrame = 4;//

        this.timeSinceFlap = 0;//this will accumulate the time //then we will make it cycle back to 0
        this.flapInterval = Math.random()*50 + 50;
        
        //to assign this raven a random color
        this.randonColor = [Math.floor(Math.random()*255), Math.floor(Math.random()*255), Math.floor(Math.random()*255)];//this will give three random RGB value to each raven object on creation 
        this.color = 'rgb(' + this.randonColor[0] + ',' + this.randonColor[1] + ',' + this.randonColor[2] + ')';

    }
    update(deltaTime){//to update the position of the raven and render it in it's new position 
        this.x -= this.directionX;
        this.y += this.directionY;//to move it up or down randonmy while going from left to right
        //for bounding back when hitting top or down boundary

        if(this.x < 0 - this.width){
            if(life > 0){
                life--;
            }
        }

        if(this.y < 0 || this.y > canvas.height - this.height){
            this.directionY = this.directionY * -1;
        }
        if(this.x < 0-this.width){
            this.markForDeletion = true;
        }
        // if(this.frame > this.maxFrame){
        //     this.frame = 0;
        // }else{
        //     this.frame ++;
        // }

        this.timeSinceFlap += deltaTime;

        if(this.timeSinceFlap >= this.flapInterval){//time to change the frame
            if(this.frame  > this.maxFrame) this.frame = 0;
            else this.frame++;
            this.timeSinceFlap = 0;
        }

    }
    //draw method will take these updated value 
    draw(){
        collisionCtx.fillStyle = this.color;
        collisionCtx.fillRect(this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.width, this.height);
    }
};

// const raven = new Raven();//we created a new raven object

let timeToNextRaven = 0;//will accumulate the time in ms values between frames untill it reaches a certain value
let ravenInterval = 500;//the will be the maximum accumulation value 
let lastTimer = 0;

ctx.font = "50px Impact";

let score = 0;//variable to mentain the current score


function drawScore(){
    ctx.fillStyle = "black";
    ctx.fillText("Score: " + score, 50, 75);
}

function drawLife(){
    ctx.fillStyle = "black";
    ctx.fillText("Life: " + life, 600, 75);
}

function drawGameOver(){
    ctx.fillStyle = "red";
    ctx.fillText("GAME OVER, your score is " + score, canvas.width/5, canvas.height/2);
}

//now time to add explosion on collision 
let explosion = [];
class Explosion{
    constructor(x, y, size){
        this.image = new Image();
        this.image.src = 'effect.png';
        this.spriteWidth = 200;
        this.spriteHeight = 179;
        this.size = size;
        this.x = x;
        this.y = y;
        this.frame = 0;//the current frame of the sprite
        this.sound = new Audio();
        this.sound.src = 'boom.wav';

        this.timeSinceFrame = 0;//this will accumulate time
        this.frameInterval = 200;

        this.markForDeletion = false;
    }
    update(deltaTime){
        if(this.frame === 0){
            this.sound.play();
        }
        this.timeSinceFrame += deltaTime;
        if(this.timeSinceFrame >= this.frameInterval){
            this.frame++;
            this.timeSinceFrame = 0;
            if(this.frame > 5){
                this.markForDeletion = true;
            }
        }
    }
    draw(){
        ctx.drawImage(this.image, this.frame * this.spriteWidth, 0, this.spriteWidth, this.spriteHeight, this.x, this.y, this.size, this.size);
        // ctx.drawImage(this.image, this.x, this.y, 100, 100);
    }
}

//now time to kill some ravens //we create an event listner for the click event 
window.addEventListener('click', function(e){//we will do colision detection by color
    const detectPixelColor = collisionCtx.getImageData(e.x, e.y, 1, 1);//the built in getImageDate method will return the color of the coordinate
    //we want to a scan an area of width and heigh of 1px
    console.log(detectPixelColor);
    //in some browserw we won't be able to call getImageData on the same canvas where we are drawing images //it will give an error
    //the error is for security purpose to prevent the canvas from being tainted from cross origin data

    //first we will assign differently coloured hitbox to each raven //for that we will create a seperate canvas which has only there hitboxes and no ravens
    //because when we click it we want to get color of that particular hitbox not of the black raven
    const pc = detectPixelColor.data;
    ravens.forEach(object => {
        if(object.randonColor[0] === pc[0] && object.randonColor[1] === pc[1] && object.randonColor[2] === pc[2]){
            object.markForDeletion = true;
            score++;
            //now time to add new explosion to the active explosion array 
            explosion.push(new Explosion(object.x, object.y, object.width))
            console.log(explosion);
        }
    })
})

function animate(timestamp){//by defalult js passes timestamp to requestAnimationFrame() as an argument //RAF passes it's callback function "animate in this case" automatic timestamps in miliseconds
    //we also have to delete the old paint
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    collisionCtx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    //animating the ravens

    //we will calculate the delta tme 
    let deltaTime = timestamp - lastTimer;

    lastTimer = timestamp;

    timeToNextRaven += deltaTime;

    if(timeToNextRaven >= ravenInterval){//time to create a new raven 
        timeToNextRaven = 0;
        //time to create a new raven 
        ravens.push(new Raven());
        //we will sort the raven so that the smmller ones appear in the back of the big ones
        ravens.sort(function(a,b){
            return a.width - b.width;
        })
    }
    drawScore();
    drawLife();
    // [] //we can create something called array literal by dropping square bracket like that
    [...ravens, ...explosion].forEach(object => object.update(deltaTime));
    [...ravens, ...explosion].forEach(object => object.draw());

    explosion = explosion.filter(object => !object.markForDeletion);

    ravens = ravens.filter(object => !object.markForDeletion);

    // console.log(ravens.length)
    //now we need to remove all the ravens that moved past the screen area
    //for that we will create new class property called marked for deletion and we will set it to false initially

    // raven.update();
    // raven.draw();

    //how to create a new raven periodically 
    //and we want to make sure that the periodic event is trigerred at the same interval on fast as well as slow systems
    //we will use time in miliseconds not in no of frames //for that we will be using timestamps

    //we will take tiem from the current loop save that value run the loop again with a new time stamp value and compare them to see how many miliseconds have been passed


    // enemy1.x++;
    // enemy1.y++;
    // enemy1.update();
    // enemy1.draw();

    //now for each frame we will loop through the enemies array and call the update and buidl mentod

    // enemiesArray.forEach(enemy => {//this will reffer to each individual object as enemy //as we cycle through the enemies array 
    //     //for each enemy we will call theri associated update and draw method 
    //     enemy.update();
    //     enemy.draw();
    // });

    gameFrame++;

    // ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
    if(life){
        requestAnimationFrame(animate);
    }else{
        drawGameOver();
    }
}

animate(0);

/* //the below code is for the sprite animation and teh parallax effect of background

let gameSpeed = 15;



const backgroundLayer1 = new Image();
backgroundLayer1.src = 'back/layer-1.png';
const backgroundLayer2 = new Image();
backgroundLayer2.src = 'back/layer-2.png';
const backgroundLayer3 = new Image();
backgroundLayer3.src = 'back/layer-3.png';
const backgroundLayer4 = new Image();
backgroundLayer4.src = 'back/layer-4.png';
const backgroundLayer5 = new Image();
backgroundLayer5.src = 'back/layer-5.png';

//since to run the game smoothly on online servers we need to make sure theat all the things are loaded 
//before making the game run 

window.addEventListener('load', function(){//when the page is fully loaded #-------------------------#

    
    

// const playerImage = new Image();//we have createed new image object
// playerImage.src = 'shadow_dog.png';

// let x = 0;

// const spriteWidth = 575;
// const spriteHeight = 523;

//think of these as the row and column of a matrix 
// let frameX = 0;//the coordinate x axis //this is not the row but the column
// let frameY = 0;//the coordinate y axis //this is not the col but the row 

//we don't need the above two frame x and frame y //as now we have the exact coordinate

// let gameFrame = 0;
// const staggerFrame = 3; 



//this is all the animations for which the data we want to be created
// const animationStates = [
    //     //each obj will contain the name of the animation and the no of franes in contains
    //     //for every row we will create such an object going from top to bottom 
//     {
    //         name: 'idle',
    //         frames: 7,
    //     },
    //     {
        //         name: 'jump',
//         frames:7,
//     },
//     {
    //         name: 'fall',
    //         frames:7,
    //     },
//     {
    //         name: 'run',
    //         frames:9,
    //     },
    //     {
        //         name: 'dizzy',
        //         frames:11,
        //     },
        //     {
//         name: 'sit',
//         frames:5,
//     },
//     {
    //         name: 'roll',
//         frames:7,
//     },
//     {
//         name: 'bite',
//         frames:7,
//     },
//     {
    //         name: 'getHit',
    //         frames:4,
//     },
// ];

//for each type of animation we will store the data here
//data structure that will map location in the sprite sheet corresponding to each animation 
// const spriteAnimation = [];

// animationStates.forEach((state, index) => {
    
    //     //now for each iteration we will create an oject
    //     //we create a variable called frames and set it equal to an abject 
    //     let frames = {
        //         //inside the object we will have a property call loc "location" //that will be an empth array for now 
        //         loc: [],
        //         //an object in js can also be seen as a map 
        //     }
        
        //     //now for each frame of the current state
        //     for(let j = 0; j<state.frames; j++){
            //         let positionX = j*spriteWidth;
            //         let positionY = index*spriteHeight;
            //         //now lets push these values in the loc array 
            //         //we will create an object with two properties x and y and then push it 
            //         frames.loc.push({x:positionX, y:positionY});
            //     }
            
//     spriteAnimation[state.name] = frames;//spriteAnimation is a map of name of the animation and the frames obj
//     //from the obj we can access teh loc array 

// });


// let x = 0;
// let x2 = 2400;//we will use two image for smooth transition 

//we will create a class for each layer and then store them in an array and iterate over them to render them 

const slider = document.getElementById('slider');
slider.value = gameSpeed;x

const showGameSpeed = document.getElementById('showGameSpeed');//to show game speed on the screen 
showGameSpeed.innerHTML = gameSpeed;

slider.addEventListener('change', function(e){
    gameSpeed = e.target.value;
    showGameSpeed.innerHTML = e.target.value;
});

class Layer{
    constructor(image, speedModifier){
        this.x = 0;
        this.y = 0;
        this.width = 2400;  
        this.height = 700;
        // this.x2 = this.width;//we dont need it any longer //we can calculate the position of the two image using a single variable x and that way they will always be in sinc
        this.image = image;//create a property named image and assign to the image we have 
        this.speedModifier = speedModifier;
        this.speed = gameSpeed * this.speedModifier;//we take the global game speed and multiply it with the speed modifier to get the current speed of the layer
        //this way each layer will move with different speed but they will still be tied with the global game speed
    }
    update(){//this method will morve layers horizontially //by changing their this.x and this.x2 property
        this.speed = gameSpeed * this.speedModifier;//to make sure that our game speed is dyynamic and always reactive to the global game speed variable 
        if(this.x <= -this.width){//modifyig the if statement according to single variable settings
            // this.x = this.width + this.x2 - this.speed;
            this.x = 0;//we will remove reference to this.x2
        }
        // if(this.x2 <= -this.width){//we comment out the if for x2 as we don't need it any longer
        //     this.x2 = this.width + this.x - this.speed;
        // }
        this.x = Math.floor(this.x - this.speed);
        // this.x2 = Math.floor(this.x2 - this.speed); //since x2 has been removed 
    }
    draw(){//this method will take information about this layer object and to draw it on canvas
        //every time the update method will run to change the horizontal x position draw will run again to redraw the image at the new position 
        ctx.drawImage(this.image, this.x, this.y, this.width, this.height);
        ctx.drawImage(this.image, this.x + this.width, this.y, this.width, this.height);//we will replace teh this.x2 with this.x2
        //and add width to this.x2 as the other image will be after it which is the same distance as it's width 
    }
    
}


const layer1 = new Layer(backgroundLayer1, 0.2);//we created an instance of the js class with it's custom properties
const layer2 = new Layer(backgroundLayer2, 0.4);
const layer3 = new Layer(backgroundLayer3, 0.6);
const layer4 = new Layer(backgroundLayer4, 0.8);
const layer5 = new Layer(backgroundLayer5, 1);

const gameObject = [layer1, layer2, layer3, layer4, layer5];




function  animate(){
    
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    
    gameObject.forEach(object => {
        object.update();
        object.draw();
    });
    
    // layer4.update();
    // layer4.draw();
    
    requestAnimationFrame(animate);
    
    // ctx.drawImage(backgroundLayer4, x,0);
    // ctx.drawImage(backgroundLayer4, x2,0);
    
    
    // //the method below can be a bit dodgy 
    // //so we will take two image to simulate it smoothly
    // if(x <= -2400){//we will reset to zero 
    //     x = 2400 + x2 - gameSpeed;
    // }else{//else we will keep moving back 
    //     x -= gameSpeed;
    // }
    
    // if(x2 <= -2400){//we will reset to zero 
    //     x2 = 2400 + x - gameSpeed;
    // }else{//else we will keep moving back 
    //     x2 -= gameSpeed;
    // }
    
    
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
        
        // let position  = Math.floor(gameFrame/staggerFrame)%spriteAnimation[playerState].loc.length;//.lengt is to get the length of the loc array related to idle animation 
        // //staggeringFrame is to slow down the individual count 
        // //and modulo is to bring it back to the starting horizontal position 
        
        // let frameX = spriteWidth*position;
        // let frameY = spriteAnimation[playerState].loc[position].y;//this has the complete precalculated value so we don't need any sort of multlipication 
        
        
        
        // ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0,0, spriteWidth, spriteHeight);
        
        
        // gameFrame++;
        
    }
    //waiiting for tapaswini
    animate();
});
*/
