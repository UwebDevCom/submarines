
class CreactGame {
    constructor(boardSize, boardLevel){
        this.boardLevel = boardLevel;
        this.boardSize = boardSize;
        this.abcAxis  = ['a','b','c','d','e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'];
        this.gameDataObj= [];
        this.marinesCount = 0;
        this.boardCellsAmount = Math.pow(this.boardSize,2);
        this.boardElement = document.getElementById('gameBoard');
    }   

    createBoardDataGame(){
        for(let i = 0; i< this.boardSize ; i++) {
            for(let j = 0; j< this.boardSize ; j++) {
                this.gameDataObj.push({y: this.abcAxis[i],x : j ,isMarine: 0 })  
            }
        }
        this.addSubmarines(this.boardLevel);
    }

    addSubmarines(level){
       var levelInPresentage =  Math.round(this.boardCellsAmount*level*10/100);
       var submarinesArr = [];
       while(submarinesArr.length !==levelInPresentage){
           var randomPlaceForMarine = Math.floor(Math.random()*this.boardCellsAmount +1);
           if(submarinesArr.includes(randomPlaceForMarine)){}else{
            submarinesArr.push(randomPlaceForMarine)
        }
       }
       for(let item of submarinesArr){
           this.gameDataObj[item-1].isMarine = item;
       }
       console.log(this.gameDataObj)
    }

    createBoadHtml(){
        let boardHtml = '';
       this.gameDataObj.forEach((item, i)=>{
        console.log((i+1)/this.boardSize, (/\./g).test(((i+1)/this.boardSize).toString()))
        if((i+1)/this.boardSize, (/\./g).test(((i+1)/this.boardSize).toString())) {
            boardHtml += `<button>${item.isMarine}</button>`;
        }else {
            boardHtml += `<button>${item.isMarine}</button>`;
            boardHtml =`<div>${boardHtml}</div>`;
            this.boardElement.innerHTML = this.boardElement.innerHTML +  boardHtml;
            boardHtml = '';
        }
        });
        this.boardElement.innerHTML = this.boardElement.innerHTML + boardHtml;
    }
}

const NewGame = new CreactGame(6,3); 


NewGame.createBoardDataGame();
NewGame.createBoadHtml();