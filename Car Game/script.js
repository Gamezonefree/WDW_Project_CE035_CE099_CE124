const starting = new Audio('music/start.mp3')
const crash = new Audio('music/crash.wav')
const voice = new Audio('music/voice.mp3')

const keys = { ArrowUp: false, ArrowLeft: false, ArrowDown: false, ArrowRight: false};
const enemySpeed = 3;

let menu = document.querySelector('.menu');
let leftSide = document.querySelector(".left-side");
let dialogBox = document.querySelector(".dialog-box");
let road = document.querySelector(".road");
let score = document.querySelector(".score");
let rightSide = document.querySelector("right-side");

let player = {score: 0, highScore: 0};
menu.addEventListener("click", pauseResume);
dialogBox.addEventListener("click", setUp);
window.addEventListener("keydown", keyDown);
window.addEventListener("keyup", keyUp);
voice.play();
function pauseResume(){
    if(player.pause){
        voice.pause();
        menu.innerText="Pause";
        menu.classList.remove("pause");
        menu.classList.add("resume");
        player.pause = false;
        window.requestAnimationFrame(gamePlay);
    }
    else{
        menu.innerText="Resume";
        menu.classList.remove("resume");
        menu.classList.add("pause");
        player.pause = true;
    }    
}

function keyDown(k) {
    if(k.key==' '){
        if(player.start)
            pauseResume();
    }
    k.preventDefault();
    keys[k.key] = true;
}
function keyUp(k) {
    k.preventDefault();
    keys[k.key] = false;
}

function restart(){
    if(parseInt(player.score)>player.highScore)
        player.highScore = parseInt(player.score);
    player.score = 0;
    menu.classList.remove("hidden");
    let road = document.querySelector(".road");
    while(road.firstChild){
        road.removeChild(road.lastChild);
    }
}

function setUp() {
    starting.play();
    player.start = true;
    player.pause = false;
    player.speed = 5;
    if(player.score){
        
        restart();
    }
    window.requestAnimationFrame(gamePlay);
    road.classList.remove("hidden");
    score.classList.remove("hidden");
    menu.classList.remove("hidden");
    dialogBox.classList.add("hidden");

    for (let i = 0, k=33.33; i < 2; i++, k+=k) {
        for (let j = 0; j < 6; j++) {
            let roadLine = document.createElement('div');
            roadLine.setAttribute('class', 'lines');
            roadLine.y = (j*150-150);
            roadLine.style.top = roadLine.y +"px";//(i-1)*(100)
            roadLine.style.marginLeft = k+"%";
            road.appendChild(roadLine);
        }
    }

    let car = document.createElement('div');
    car.setAttribute('class', 'car');
    road.appendChild(car);

    player.x = car.offsetLeft;
    player.y = car.offsetTop;

    for (let j=0; j<4; j++) {
        let enemyCar = document.createElement('div');
        enemyCar.setAttribute('class', 'enemy');
        enemyCar.y = ((j+1)*300)*-1;
        enemyCar.style.top = enemyCar.y +"px";//(i-1)*(100)
        enemyCar.style.backgroundColor = randomColor();
        enemyCar.style.left = Math.floor(Math.random()*(road.offsetWidth-100)+50)+"px";
        road.appendChild(enemyCar);
    }
}

function randomColor(){
    function a(){
        let hex = Math.floor(Math.random()*256).toString(16);
        return ("0" + String(hex)).substr(-2);
    }
    return "#"+a()+a()+a();
}

function endGame(){
    dialogBox.innerHTML = `<p>Game Over<br />Your score was ${parseInt(player.score)}<br />Click here to Restart the game.</p>`;
    dialogBox.classList.remove("hidden");
    menu.classList.add("hidden");
    // road.classList.add("hidden");
    player.start = false;
}

function moveEnemyCar(car){
    let enemyCar = document.querySelectorAll('.enemy');
    enemyCar.forEach(function(item){
        if(isCollide(car, item)){
            crash.play();
            window.cancelAnimationFrame(gamePlay);
            endGame();
            return true;
        }
        if(item.y>=699){
            item.style.left = Math.floor(Math.random()*(road.offsetWidth-100)+50)+"px";
            item.y=-484;
        }
        item.y += player.speed-enemySpeed;
        item.style.top = item.y + "px";
    });
}

function moveLines(){
    let lines = document.querySelectorAll('.lines');
    lines.forEach(function(item){
	if(item.y >= 700){
	    item.y -= 900;
	}
        item.y += player.speed;
        item.style.top = item.y +"px";//(i-1)*(100)
    });
}

function isCollide(a,b){
    let aRect = a.getBoundingClientRect();
    let bRect = b.getBoundingClientRect();
    return !((aRect.bottom<bRect.top)||(aRect.top>bRect.bottom)||(aRect.left>bRect.right)||(aRect.right<bRect.left));
}

function gamePlay() {

    voice.play();
    let car = document.querySelector('.car');
    let roadArea = road.getBoundingClientRect();
    if(player.pause){
        return;
    }
    if (player.start) {
        
        moveLines();
        moveEnemyCar(car);
        if (keys.ArrowUp) {
            if(player.y >= 150)
                player.y -= player.speed;
            else if(player.speed<20)
                player.speed += 0.1;
        }
        else if (keys.ArrowDown){
            if(player.y <= roadArea.height - car.offsetHeight-10) { player.y += player.speed; }
            else if(player.speed>5){player.speed -= 0.1;}
        }
        else if (keys.ArrowLeft && player.x >= 35) {player.x -= player.speed;}
        else if (keys.ArrowRight && player.x <= roadArea.width - 55) {player.x += player.speed;}

        car.style.top = player.y + "px";
        car.style.left = player.x + "px";
        window.requestAnimationFrame(gamePlay);

        document.querySelector('.score').innerText = "Score : " + parseInt(player.score) + "\nHigh Score : "+ player.highScore;
        player.score += player.speed/5;
    }
}
