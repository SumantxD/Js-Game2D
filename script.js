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


//we will create a variable enemy1 and assign it to an object 
//an object is like a map in js

// enemy1 = {
//     x: 10,
//     y: 50,
//     width: 200, 
//     height: 200,
// }

//we will use class to create enemy

class Enemy {
    constructor(){
        this.x = 10;
        this.y = 10;
        this.height = 20;
        this.width = 20; 
    }

    //we will create the update method for the enemy movement
    update(){
        this.x++;
        this.y++;
    }
    //the draw method will be assigned to each enemy so that we don't have to call it over again for each enemy
    draw(){
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
};

const enemy1 = new Enemy();

function animate(){
    //we also have to delete the old paint
    ctx.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    // enemy1.x++;
    // enemy1.y++;
    enemy1.update();
    enemy1.draw();
    // ctx.fillRect(enemy1.x, enemy1.y, enemy1.width, enemy1.height);
    requestAnimationFrame(animate);
}

animate();

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
