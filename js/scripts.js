
class CreactGame {
    constructor(boardSize, boardLevel) {
        this.boardLevel = boardLevel;
        this.boardSize = boardSize;

        this.abcAxis = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v'];
        this.gameDataObj = [];
        this.marinesCount = 0;
        this.levelInPresentage = 0;
        this.boardCellsAmount = Math.pow(this.boardSize, 2);
        this.boardElement = document.getElementById('gameBoard');
        this.countOfSubmarineFound = 0;
    }

    createBoardDataGame() {
        for (let i = 0; i < this.boardSize; i++) {
            for (let j = 0; j < this.boardSize; j++) {
                this.gameDataObj.push({ y: this.abcAxis[i], x: j, isMarine: 0, isFound: null })
            }
        }
        this.addSubmarines();
        this.createBoadHtml();
        this.addEventOnButtons();
        this.createAxises();
    }

    addSubmarines() {
        this.levelInPresentage = Math.round(this.boardCellsAmount * this.boardLevel * 10 / 100);
        var submarinesArr = [];
        while (submarinesArr.length !== this.levelInPresentage) {
            var randomPlaceForMarine = Math.floor(Math.random() * this.boardCellsAmount + 1);
            if (submarinesArr.includes(randomPlaceForMarine)) { } else {
                submarinesArr.push(randomPlaceForMarine)
            }
        }
        for (let item of submarinesArr) {
            this.gameDataObj[item - 1].isMarine = item;
        }
    }

    createBoadHtml() {
        let boardHtml = '';
        this.gameDataObj.forEach((item, i) => {
            if ((i + 1) / this.boardSize, (/\./g).test(((i + 1) / this.boardSize).toString())) {
                boardHtml += `<button aria-label="row: ${item.y}, col: ${item.x}" data-id="${item.isMarine}" class="board-btn ${item.isMarine > 0 ? 'yes' : 'no'}"></button>`;
            } else {
                boardHtml += `<button aria-label="row: ${item.y}, col: ${item.x}" data-id="${item.isMarine}" class="board-btn ${item.isMarine > 0 ? 'yes' : 'no'}"></button>`;
                boardHtml = `<div>${boardHtml}</div>`;
                this.boardElement.innerHTML = this.boardElement.innerHTML + boardHtml;
                boardHtml = '';
            }
        });
        this.boardElement.innerHTML = this.boardElement.innerHTML + boardHtml;
    }

    addEventOnButtons() {
        var buttons = document.querySelectorAll('.board-btn');
        buttons.forEach((element) => {
            element.addEventListener('click', this.findSubmarines.bind(this));
        });
    };

    findSubmarines(event) {
        if (!this.gameDataObj[event.target.getAttribute('data-id') - 1]?.isFound) {
            if (event.target.getAttribute('data-id') > 0) {
                this.gameDataObj[event.target.getAttribute('data-id') - 1].isFound = true;
                event.target.setAttribute('data-found', true);
                event.target.classList.add('busmarine-not-found');
                this.countOfSubmarineFound++;
                document.getElementById('countOfSubmarines').textContent = this.countOfSubmarineFound;
            } else {
                event.target.classList.add('busmarine-found');
            }
        }
        this.winingScreen();
    }
    createAxises() {
        let axisX = '';
        let axisY = '';
        for (let i = 0; i < this.boardSize; i++) {
            axisX += `<span>${this.abcAxis[i].toUpperCase()}</span>`
            axisY += `<span>${i}</span>`
        };
        document.querySelector(".game-board-inner").insertAdjacentHTML('afterbegin', `<div class="axis-x-container">${axisX}</div>`);
        document.querySelector(".game-board-inner").insertAdjacentHTML('afterbegin', `<div class="axis-y-container">${axisY}</div>`);

    }

    winingScreen() {
        if (this.countOfSubmarineFound === this.levelInPresentage) {
            var buttons = document.querySelectorAll('.board-btn');
            buttons.forEach((element) => {
                element.removeEventListener('click', this.findSubmarines.bind(this));
                element.setAttribute('tabindex', -1);
            });
            this.boardElement.classList.add('finish-the-game');
            document.querySelector('.border').style.display = 'none';
            document.querySelector('.axis-x-container').style.display = 'none';
            document.querySelector('.win-pop').style.display = 'block';
            document.querySelector('.win-pop').focus();
        }
    }
}



const NewBoardGame = new CreactGame(10, 1);
NewBoardGame.createBoardDataGame();
