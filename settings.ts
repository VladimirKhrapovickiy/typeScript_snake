type Difficulty = "EASY" | "MEDIUM" | "HARD";
interface IGameData{
    speed: number;
    difficulty: Difficulty;
    music:HTMLAudioElement;
    setMusic(speed: number):void
    setDifficulty(difficulty: Difficulty ):void
}

export let gameData: IGameData ={
    speed:100,
    difficulty: "EASY",
    music: document.getElementById("mus") as HTMLAudioElement,
    setMusic(speed){
        this.speed = speed;
    },
    setDifficulty(difficulty){
        this.difficulty = difficulty;
    }
}