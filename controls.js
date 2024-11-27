import { gameData } from "./settings.js";
import { startGame } from "./index.js";
import { snake } from "./entitys.js";
export let controls = {
    startButton: document.querySelector("#btn_start"),
    easyButton: document.querySelector("#btn_dif_easy"),
    mediumButton: document.querySelector("#btn_dif_medium"),
    hardButton: document.querySelector("#btn_dif_hard"),
};
function clearBackgroundOnButtons() {
    document.querySelectorAll(".btn-neon_inner").forEach((e) => e.classList.remove("color-pink"));
}
controls.easyButton.addEventListener("click", () => {
    gameData.setDifficulty('EASY');
    gameData.speed = 100;
    startGame();
    clearBackgroundOnButtons();
    for (const child of controls.easyButton.children) {
        child.classList.add("color-pink");
    }
    ;
});
controls.mediumButton.addEventListener("click", () => {
    gameData.setDifficulty("MEDIUM");
    gameData.speed = 50;
    startGame();
    clearBackgroundOnButtons();
    for (const child of controls.mediumButton.children) {
        child.classList.add("color-pink");
    }
    ;
});
controls.hardButton.addEventListener("click", () => {
    gameData.setDifficulty("HARD");
    gameData.speed = 25;
    startGame();
    clearBackgroundOnButtons();
    for (const child of controls.hardButton.children) {
        child.classList.add("color-pink");
    }
    ;
});
controls.startButton.addEventListener("click", () => {
    startGame();
});
window.addEventListener('keypress', (e) => {
    switch (e.keyCode) {
        case 100:
        case 1074:
            if (snake.snakeDirection != "LEFT")
                snake.snakeDirection = "RIGHT";
            break;
        case 97:
        case 1092:
            if (snake.snakeDirection != "RIGHT")
                snake.snakeDirection = "LEFT";
            break;
        case 119:
        case 1094:
            if (snake.snakeDirection != "DOWN")
                snake.snakeDirection = "UP";
            break;
        case 115:
        case 1099:
            if (snake.snakeDirection != "UP")
                snake.snakeDirection = "DOWN";
            break;
    }
});
