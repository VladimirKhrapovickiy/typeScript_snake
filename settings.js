export let gameData = {
    speed: 100,
    difficulty: "EASY",
    music: document.getElementById("mus"),
    setMusic(speed) {
        this.speed = speed;
    },
    setDifficulty(difficulty) {
        this.difficulty = difficulty;
    }
};
