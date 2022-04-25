//点击开始游戏，startpage消失，游戏开始
//点击出现食物，出现三节蛇开始运动
//上下左右按钮控制蛇运动方向
//判断是否吃到食物，吃到食物后，食物消失，然后蛇长度+1
//判断蛇碰到墙或者碰到自己游戏结束，弹出分数框
var startBtn = document.getElementById('startBtn');
var startP = document.getElementById('startP');
var lose = document.getElementById('lose');
var scoreBox = document.getElementById('score')
var content = document.getElementById('content');
var startPage = document.getElementById('startPage');
var snakeMove;
var loserScore = document.getElementById('loserScore');
var close = document.getElementById('close');
var speed = 130;
var startGameBool = true;
var startPaushBool = true;
init();
function init(){
    //地图
    this.mapW = parseInt(getComputedStyle(content).width);
    this.mapH = parseInt(getComputedStyle(content).height);
    this.mapDiv = content;

    //食物
    this.foodW = 23;
    this.foodH = 23;
    //食物的坐标,初始都为0
    this.foodX = 0; 
    this.foodY = 0;
 

    //蛇的初始化属性

    //蛇的长和宽
    this.snakeW = 23;
    this.snakeH = 23;
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];

    //游戏属性
    this.direct = 'right';//默认运动方向
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    this.score =0;//分数
    bindEvent();
}

//开始游戏
function startGame(){
    startPage.style.display = 'none';
    food();
    snake();
   
}

//随机生成食物

function food(){
    var food = document.createElement('div');
    food.style.width = this.foodW +'px';
    food.style.height = this.foodH + 'px';
    food.style.position = 'absolute';
    this.foodX = Math.floor(Math.random()*(Math.floor(this.mapW /23)));
    this.foodY = Math.floor(Math.random()*(Math.floor(this.mapH /23)));
    food.style.left = this.foodX *23 +'px';
    food.style.top = this.foodY *23+ 'px';
    this.mapDiv.appendChild(food).setAttribute('class','food')
}

//随机生成一条蛇
function snake(){
    for(var i = 0;i < this.snakeBody.length;i++){
        var snake = document.createElement('div');
        snake.style.width = this.snakeW +'px';
        snake.style.height = this.snakeH +'px';
        snake.style.position = 'absolute';
        snake.style.left = this.snakeBody[i][0] * 23 +'px';
        snake.style.top = this.snakeBody[i][1] * 23 +'px';
        snake.classList.add(this.snakeBody[i][2]);
        this.mapDiv.appendChild(snake).classList.add('snake');
        switch(this.direct){
            case 'right':
            break;
            case 'up':
            snake.style.transform = 'rotate(270deg)'
            break;
            case 'left':
            snake.style.transform = 'rotate(180deg)'
            break;
            case 'down':
            snake.style.transform = 'rotate(90deg)'
            break;
            default:
            break;
        }

    }
}

//运动
function move(){
    for(var i = this.snakeBody.length-1;i>0;i--){
        this.snakeBody[i][0] = this.snakeBody[i - 1][0];
        this.snakeBody[i][1] = this.snakeBody[i - 1][1];
    }
    switch(this.direct){
        case 'right':
            this.snakeBody[0][0] += 1;
        break;
        case 'up':
            this.snakeBody[0][1] -= 1;
        break;
        case 'left':
            this.snakeBody[0][0] -= 1;
        break;
        case 'down':
            this.snakeBody[0][1] += 1;
        break;
        default:
        break;

    }
    removeClass('snake');
    snake();
    //判断蛇是否吃到食物
    if(this.snakeBody[0][0] == this.foodX && this.snakeBody[0][1] == this.foodY){
        var snakeEndX = this.snakeBody[this.snakeBody.length - 1][0];
        var snakeEndY = this.snakeBody[this.snakeBody.length - 1][1];
        switch(this.direct){
            case 'right':
                this.snakeBody.push([snakeEndX+1,snakeEndY,'body']);
            break;
            case 'up':
                this.snakeBody.push([snakeEndX,snakeEndY-1,'body']);
            break;
            case 'left':
                this.snakeBody.push([snakeEndX-1,snakeEndY,'body']);
            break;
            case 'down':
                this.snakeBody.push([snakeEndX,snakeEndY+1,'body']);
            break;
            default:
            break;
    
        }

        this.score +=1;
        scoreBox.innerHTML = this.score;
        removeClass('food');
        food();

    }

    //判断蛇是否碰到边界
    if(this.snakeBody[0][0] < 0 || this.snakeBody[0][0] >= Math.floor(this.mapW/23)){
        relodGame();
    }
    if(this.snakeBody[0][1] < 0 || this.snakeBody[0][1] >=Math.floor(this.mapH/23)){
        relodGame();
    }

    //判断蛇是否碰到自己的身体
    var snakeHX = this.snakeBody[0][0];
    var snakeHY = this.snakeBody[0][1];
    for(var i =1;i<this.snakeBody.length;i++){
        if(snakeHX == snakeBody[i][0] && snakeHY == snakeBody[i][1]){
            relodGame();
        }
    }
}
//如果碰到四壁或者自己的蛇尾就停止
function relodGame(){
    removeClass('snake');
    removeClass('food');
    clearInterval(snakeMove);
    this.snakeBody = [[3,1,'head'],[2,1,'body'],[1,1,'body']];

    //游戏属性
    this.direct = 'right';
    this.left = false;
    this.right = false;
    this.up = true;
    this.down = true;
    lose.style.display = 'block';
    startP.setAttribute('src','./images/start.png');
    
    loserScore.innerHTML = this.score;
    this.score =0;//分数
    scoreBox.innerHTML = this.score;

    startGameBool = true;
    startPaushBool = true;
   

   
}

//删除第一秒出现的蛇，紧接着渲染第二条蛇
function removeClass(className){
    var ele = document.getElementsByClassName(className);
    while(ele.length > 0){
        ele[0].parentNode.removeChild(ele[0]);
    }
}
//根据传的code值确定哪些方向可以改变
function setDerict(code){
    switch(code){
        case 37:
            if(this.left){
                this.direct = 'left';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 38:
            if(this.up){
                this.direct = 'up';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            
            break;
        case 39:
            if(this.right){
                this.direct = 'right';
                this.left = false;
                this.right = false;
                this.up = true;
                this.down = true;
            }
            break;
        case 40:
            if(this.down){
                this.direct = 'down';
                this.left = true;
                this.right = true;
                this.up = false;
                this.down = false;
            }
            
            break;
        default:
            break;
    }
}
function bindEvent(){

    // if(relodGame()){
    //     addEventListener("keydown",(e)=>{          
    //         if(e.code === "Space"){     
    //             lose.style.display = 'none';
    //             location.reload();    
    //             startAndPaush();
    //         }      
    // })
    // }
    addEventListener("keydown",(e)=>{          
        if(e.code === "Space"){       
            startAndPaush();
        }      
})

   
    close.onclick = function(){
        lose.style.display = 'none';
        location.reload();

    }
    startBtn.onclick = function () {      
        startAndPaush();
       
     }

     startP.onclick = function(){
        startAndPaush();
     }
}
function startAndPaush(){
    if(startPaushBool){
        if(startGameBool){
            startGame();
            startGameBool = false;
        }
        startP.setAttribute('src','./images/pause.png');
        document.onkeydown = function(e){
            console.log(e);
            var code = e.keyCode;
            if(code =='38' || '40'){
                if(e.preventDefault){
                    e.preventDefault();
                }else{
                    e.returnValue = false;
                }
                setDerict(code);
            }
           
        }
        
        snakeMove = setInterval(function(){
            move();
        },speed);
       
        startPaushBool =false;
        
        snake();

    }else{
        startP.setAttribute('src','./images/start.png');
        clearInterval(snakeMove);
        
        document.onkeydown = function(e){
            e.returnValue = false;
            return false;
            
        };
        
        startPaushBool = true;
        
        
    }
}

