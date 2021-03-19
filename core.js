const canvas = document.getElementById('snake');
const ctx = canvas.getContext('2d');
const size = 20;//сторона ячейки в пх
let x = [14,13];//координаты змейки
let y = [14,14];

document.addEventListener("keydown", direction);

let dir = 'right';

function direction(event) {//остлеживание кнопок
    if(event.keyCode == 37 && dir != "right")
        dir = "left";
    else if(event.keyCode == 38 && dir != "down")
        dir = "up";
    else if(event.keyCode == 39 && dir != "left")
        dir = "right";
    else if(event.keyCode == 40 && dir != "up")
        dir = "down";
}


foodX = Math.floor(Math.random()*29);
foodY = Math.floor(Math.random()*29);


function food(){//генерация еды 
   ctx.fillStyle = 'red';
   ctx.fillRect(size*foodX, size*foodY, size, size);
}

function game_over(x,y){//проверка на столкновение
	for (var i = 1; i < x.length-1; i++) {
		if(x[0]==x[i] && y[0]==y[i]){
            clearInterval(animation_func);//остановка игры в случае столкновения 
		}
	}
}

food();

function move(){

ctx.beginPath();
ctx.clearRect(0, 0, 600, 600);//удаление ненужных клеток хвоста

food();

for (var i = 0; i < x.length-1; i++){ //отрисовка змейки
	ctx.fillStyle = 'orange';
	ctx.fillRect(size*x[i], size*y[i], size, size);
}


let cleanX = x[x.length-1];
let cleanY = y[y.length-1];




let snakeX = x[0];
let snakeY = y[0];

if(snakeX == foodX && snakeY==foodY){//если съел еду, то +1 клетка и перерисовка еды
ctx.clearRect(size*foodX, size*foodY, size, size);

foodX = Math.floor(Math.random()*29);
foodY = Math.floor(Math.random()*29);


}else{
x.pop();//удаление из массива последенего элемента
y.pop();
}

if(dir=='right'){//изменение значения головы на единицу
snakeX++;
}
else if(dir=='left'){
snakeX--;
}else if(dir=='up'){
snakeY--;
}else if(dir=='down'){
snakeY++
}else {
snakeX++;
}


x.unshift(snakeX);//обновление головы змеи
y.unshift(snakeY); 

if(x[0]>29){//выход за границы поля
x[0]=0;
}

if(x[0]<0){
x[0]=29;
}

if(y[0]<0){
y[0]=29;
}

if(y[0]>29){
y[0]=0;
}

game_over(x,y);

}

let animation_func = setInterval(move, 60);