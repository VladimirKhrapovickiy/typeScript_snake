interface ISnake{
    snakeLenght: number;
    snakeCoords: number[][];
    snakeDirection: "UP" | "LEFT" | "RIGHT" | "DOWN";
    snakeHeadLocation: number[];
    resetHeadLocation: Function;
    resetSnake: Function;
    deleteSnake: Function;
    createSnake:Function;
    flashingAnimation: Function;
    moveSnake: Function;
};
interface IFood {
    location: number[];
    checkFood: Function;
    checkLocation: Function;
    createFood: Function;
    deleteFood: Function;
}
interface IDebuffConfuss{
    location: number[];
    checkIfEaten: Function;
    checkLocation: Function;
    createCell: Function;
    deleteCell: Function;
}

interface IField{
    fieldSize: number;
    x: number;
    y: number;
    setFieldSize: Function;
    getX: Function;
    getY: Function;
    createField: Function;
}
interface IWall{
    location:number[][],
    createWall: Function,
    deleteWall: Function,
    checkLocation: Function,
}
export let wall: IWall ={
    location:[],
    createWall (snakeCoords: number[][]):void{                                                          //// создание стены на поле
        let y = Math.ceil(Math.random() * field.getY());                            
        let x = Math.ceil(Math.random() * field.getX());;
        if (this.checkLocation([...snakeCoords, food.location, debuffConfuss.location], x ,y)){          ///если создал в координатах змеи, координаты генерятся заново
            return this.createWall(snakeCoords);
        }
        const newWalls: number[][] = [[x, y], [x +(Math.random() < 0.5 ? -1 : 1) , y + (Math.random() < 0.5 ? -1 : 1)], [x +(Math.random() < 0.5 ? -1 : 1) , y + (Math.random() < 0.5 ? -1 : 1)]]
        this.location.push(...newWalls)
        const wallCell:HTMLDivElement = document.createElement("div");
        wallCell.className = "wall_cell";
        newWalls.forEach(coords=>{
            let wallCellClone = wallCell.cloneNode(true)
            const fieldCell: Element | null = document.querySelector(`.x${coords[0]}_y${coords[1]}`) 
            fieldCell?.prepend(wallCellClone);
        })
    },
    deleteWall(wall: NodeListOf<Element>):void{                      //// удаление клетки с поля
        wall.forEach(e=>e.remove());
        this.location = []
    },
    checkLocation(coordsToCheck: number[][], x:number , y: number):boolean{                         //// проверка на то что координаты стены не совпадали с координатой змеи
        let result: boolean = false;
        coordsToCheck.forEach(e=>{
            if(e[0] === x && e[1] === y){
                result = true
            }
        })
        if (food.location == debuffConfuss.location) result = true
        return result;
    }
} 
export let field: IField={
    fieldSize: 0,
    x:0,
    y:0,
    setFieldSize(num: number){
        this.fieldSize = num;
    },
    getX(): number{
        return this.fieldSize/10
    },
    getY(){
        return this.fieldSize/10
    },
    createField(cellNumber: number): void{                              ////  создание игрового поля
        if(document.querySelectorAll(".game_cell"))document.querySelectorAll(".game_cell").forEach(e=> e.remove())
        this.setFieldSize(cellNumber);                               
        this.x = cellNumber/10;
        this.y = 1;
        const gameContainer: HTMLDivElement | null = document.querySelector(".game_container");
            if(gameContainer) {
                gameContainer.style.maxWidth = `${this.getX() * 15}px`;
                gameContainer.style.maxHeight = `${this.getY() * 15}px`;
            }
        while(this.y <= cellNumber/10){
            const gameCell:HTMLDivElement = document.createElement("div");
            gameCell.className = `game_cell x${this.x}_y${this.y}`;
            gameContainer?.prepend(gameCell);
            if(this.x <= 1) {
                this.y++;
                this.x = cellNumber/10;
            }else this.x--;
        }
    }
}


export  let debuffConfuss: IDebuffConfuss = {
    location: [],
    checkIfEaten(sankeHeadLocation: number[]):boolean{                             //// проверка на то что змея съела дебаф
        return sankeHeadLocation[0] === this.location[0] && sankeHeadLocation[1] === this.location[1]
    },
    checkLocation(snakeCoords: number[][]):boolean{                         //// проверка на то что координаты дебафа не совпадали с координатой змеи
        let result: boolean = false;
        snakeCoords.forEach(e=>{
            if(e[0] === this.location[0] && e[1] === this.location[1]){
                result = true
            }
        })
        if (food.location == debuffConfuss.location) result = true
        return result;
    },
    createCell (snakeCoords: number[][]):void{                                 //// создание еды на поле
        this.location[0] = Math.ceil(Math.random() * field.getX());
        this.location[1] = Math.ceil(Math.random() * field.getY());
        if (this.checkLocation(this.location, snakeCoords)){          ///если создал в координатах змеи, координаты генерятся заново
            return this.createCell(snakeCoords);
        }
        const debuffCell:HTMLDivElement = document.createElement("div");
        debuffCell.className = "debuff-confuss_cell";
        const fieldCell: Element | null = document.querySelector(`.x${this.location[0]}_y${this.location[1]}`) 
        fieldCell?.prepend(debuffCell);
    },
    deleteCell(debuffCell: NodeListOf<Element>):void{                      //// удаление клетки с поля
        debuffCell.forEach(e=>e.remove());
    },
};
export let snake: ISnake={
    snakeLenght: 2,
    snakeCoords: [[5,5], [5,6]],
    snakeDirection: "UP",
    snakeHeadLocation: [5,6],
    resetHeadLocation():void{
        this.snakeCoords[this.snakeCoords.length - 1] =  this.snakeHeadLocation
    },
    resetSnake():void{
        this.snakeLenght = 2;
        this.snakeCoords = [[5,5], [5,6]];
        this.snakeHeadLocation = [5,6],
        this.snakeDirection = "UP";
    },
    deleteSnake(snakeElement: NodeListOf<Element>):void{                        ////удаление змеи с поля
        snakeElement.forEach((e)=>e.remove());
    },
    createSnake():void{                                                         //// создание змеи на поле
        let n:number = 0;
        while(n < this.snakeLenght){
        const snakeCell:HTMLDivElement = document.createElement("div");
        snakeCell.className = "snake_cell";
        if(n === this.snakeLenght - 1) snakeCell.classList.add("snake_cell_head")
        const fieldCell: Element | null = document.querySelector(`.x${this.snakeCoords[n][0]}_y${this.snakeCoords[n][1]}`) 
        fieldCell?.prepend(snakeCell);
        n++;
        }
    },
    moveSnake(snake: ISnake):void{                                      //// перемещение змеи
        snake.deleteSnake(document.querySelectorAll('.snake_cell'));
        let snakeLastCell = snake.snakeCoords[0].map(e=>e);
        snake.snakeCoords.forEach((e , index, array)=>{
            if(index < array.length - 1){
                snake.snakeCoords[index][0] = snake.snakeCoords[index + 1][0];
                snake.snakeCoords[index][1] = snake.snakeCoords[index + 1][1];
            }else{
                if(snake.snakeDirection === "UP"){
                    if(snake.snakeHeadLocation [1] > field.getX() - 1){
                        snake.snakeHeadLocation [1] = 1;
                    }else{
                        snake.snakeHeadLocation [1]+=1;
                    }
                }else if(snake.snakeDirection === "DOWN"){
                    if(snake.snakeHeadLocation [1] < 2){
                        snake.snakeHeadLocation [1] = field.getX();
                    }else{
                        snake.snakeHeadLocation [1]-=1;
                    }
                }else if(snake.snakeDirection === "LEFT"){
                    if(snake.snakeHeadLocation [0] < 2){
                        snake.snakeHeadLocation [0] = field.getY();
                    }else{
                        snake.snakeHeadLocation [0]-=1;
                    }
                }else if(snake.snakeDirection === "RIGHT"){
                    if(snake.snakeHeadLocation [0] > field.getY() - 1){
                        snake.snakeHeadLocation [0] = 1;
                    }else{
                        snake.snakeHeadLocation [0]+=1;
                    }
                }
            }
            snake.resetHeadLocation();
        });
        if(debuffConfuss.checkIfEaten(snake.snakeHeadLocation)){
            document.querySelector(".game_container")?.classList.add('rotate');
            debuffConfuss.deleteCell(document.querySelectorAll('.debuff-confuss_cell'));
            debuffConfuss.createCell(snake.snakeCoords);
            setTimeout(()=>{document.querySelector(".game_container")?.classList.remove('rotate')}, 12000)
        }
        if(food.checkFood(snake.snakeHeadLocation)){
            snake.snakeLenght++;
            snake.snakeCoords.unshift(snakeLastCell);
            food.deleteFood(document.querySelectorAll('.food_cell'));
            food.createFood(snake.snakeCoords);
        }
        snake.createSnake();
    },
    flashingAnimation():void{
       let startFlashing = setInterval(() => {
            this.deleteSnake(document.querySelectorAll('.snake_cell'));
            setTimeout(()=>this.createSnake(), 500)
        }, 1000)
        setTimeout(()=> clearInterval(startFlashing), 5000);
    }
}
export let food: IFood = {
    location: [],
    checkFood(sankeHeadLocation: number[]):boolean{       
        console.log(this.location)                      //// проверка на то что змея съела еду
        return sankeHeadLocation[0] === this.location[0] && sankeHeadLocation[1] === this.location[1]
    },
    checkLocation(coordsToCheck: number[][], x:number , y: number):boolean{                         //// проверка на то что координаты стены не совпадали с координатой змеи
        let result: boolean = false;
        coordsToCheck.forEach(e=>{
            if(e[0] === x && e[1] === y){
                result = true
            }
        })
        if (food.location == debuffConfuss.location) result = true
        return result;
    },
    createFood (snakeCoords: number[][]):void{                                 //// создание еды на поле
        let x = Math.ceil(Math.random() * field.getX());
        let y = Math.ceil(Math.random() * field.getY());
        if (this.checkLocation([...snakeCoords, food.location, debuffConfuss.location], x ,y)){          ///если создал еду в координатах змеи, координаты еды создаются заново
            return this.createFood(snakeCoords);
        }
        this.location[0] = x;
        this.location[1] = y;
        const foodCell:HTMLDivElement = document.createElement("div");
        foodCell.className = "food_cell";
        const fieldCell: Element | null = document.querySelector(`.x${x}_y${y}`) 
        fieldCell?.prepend(foodCell);
    },
    deleteFood(foodElement: NodeListOf<Element>):void{                      //// удаление клетки с едой
        foodElement.forEach(e=>e.remove());
    },
};

export function checkCollision(snakeHeadLocation: number[], toCheck: number[][]){
    let result: boolean = false;
    toCheck.forEach(e=>{
        if(e[0] === snakeHeadLocation[0] && e[1] === snakeHeadLocation[1]) result = true;
    })
    return result;
}