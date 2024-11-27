import { gameData } from './settings.js';
import { debuffConfuss, snake } from './entitys.js';
import { food } from './entitys.js';
import { field } from './entitys.js';
import { controls } from './controls.js';
import anime from './node_modules/animejs/lib/anime.es.js';
import { wall } from './entitys.js';
import { checkCollision } from './entitys.js';
controls;
let snakeInterval;
let wallInterval;
export function startGame() {
    if (snakeInterval !== undefined) {
        clearInterval(snakeInterval);
        snake.resetSnake();
        clearInterval(wallInterval);
    }
    field.createField(500);
    snake.createSnake();
    food.createFood(snake.snakeCoords);
    debuffConfuss.createCell(snake.snakeCoords);
    wallInterval = setInterval(() => { wall.createWall(snake.snakeCoords); console.log('wall'); }, 5000);
    snakeInterval = setInterval(() => {
        snake.moveSnake(snake);
        if (checkCollision(snake.snakeHeadLocation, [...snake.snakeCoords.slice(0, snake.snakeCoords.length - 2), ...wall.location])) {
            clearInterval(snakeInterval);
            snake.flashingAnimation();
            setTimeout(() => {
                snake.resetSnake();
                food.deleteFood(document.querySelectorAll('.food_cell'));
                debuffConfuss.deleteCell(document.querySelectorAll('.debuff-confuss_cell'));
                wall.deleteWall(document.querySelectorAll('.wall_cell'));
                return startGame();
            }, 5000);
        }
        ;
    }, gameData.speed);
    anime({
        targets: '.game_container .game_cell',
        scale: [
            { value: .1, easing: 'easeOutSine', duration: 200 },
            { value: 1, easing: 'easeInOutQuad', duration: 300 },
        ],
        delay: anime.stagger(50, { grid: [field.getX(), field.getY()], from: 'center' }),
    });
}
const audio = document.getElementById("mus");
document.addEventListener("click", (e) => {
    audio.play();
});
