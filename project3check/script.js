let inputDir={x: 0,y: 0};
const foodSound =new Audio('assets/sound/food.mp3');
const gameOverSound= new Audio('assets/sound/gameover.mp3');
const moveSound= new Audio('assets/sound/move.mp3');
const musicSound= new Audio('assets/sound/music.mp3');
let speed=3;
let lastPaintTime =0;
let score=0;
let snakeArr=[{x:13,y:15}];
food={x:9 , y:9};
musicSound.loop =true;


//Game Functions
function main(ctime){
    window.requestAnimationFrame(main);
    if ((ctime- lastPaintTime)/1000<1/speed){
        return;
    }
    // console.log("pritom");
    lastPaintTime =ctime;
    gameEngine();
}







function isCollide(snake) {
    // If you bump into yourself 
    for (let i = 1; i < snakeArr.length; i++) {
        if(snake[i].x === snake[0].x && snake[i].y === snake[0].y){
            return true;
        }
    }
    // If you bump into the wall
    if(snake[0].x >= 18 || snake[0].x <=0 || snake[0].y >= 18 || snake[0].y <=0){
        return true;
    }
        
    return false;
}



function gameEngine(){
    //updating the snake array and food
    if(isCollide(snakeArr)){
        gameOverSound.play();
        musicSound.pause();
        inputDir={x:0,y:0}
        alert("GameOver.press any key to play again");
        snakeArr = [{x: 13, y: 15}];
         musicSound.play();
        score = 0; 
    }
    //if you have eaten the food, icremat the score and regenarate the food
if(snakeArr[0].y===food.y && snakeArr[0].x===food.x){
    snakeArr.unshift({x: snakeArr[0].x+inputDir.x, y: snakeArr[0].y+inputDir.y});
 let a = 2;
let b = 16;
food = {x: Math.round(a + (b-a)* Math.random()), y: Math.round(a + (b-a)* Math.random())}
}
for (let i = snakeArr.length - 2; i>=0; i--) { 
    snakeArr[i+1] = {...snakeArr[i]};
}

snakeArr[0].x += inputDir.x;
snakeArr[0].y += inputDir.y;




    //render the snake and the food
board.innerHTML="";
snakeArr.forEach ((e, index)=>{
    snakeElement = document.createElement('div');
    snakeElement.style.gridRowStart=e.y;
    snakeElement.style.gridColumnStart=e.x;
    if(index==0){
        snakeElement.classList.add('head');
    }else{snakeElement.classList. add('snake');

    }
   
    board.appendChild(snakeElement);
});

//displayfood
    foodElement = document.createElement('div');
    foodElement.style.gridRowStart=food.y;
    foodElement.style.gridColumnStart=food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);







}

window.requestAnimationFrame(main);
window.addEventListener('keydown', e =>{
        inputDir = {x: 0, y: 1} // Start the game
    moveSound.play();
    switch (e.key) {
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;

        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;
        default:
            break;
    }

});