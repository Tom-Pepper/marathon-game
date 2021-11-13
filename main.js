//Players One object
const playerOne = {
  player: 1,
  name: 'Fedot',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
  weapon: [
    'Sushi',
    'Sake'
  ],
  attack: function () {
    console.log(this.name + 'Fight...');
  }
};

//Players Two object
const playerTwo = {
  player: 2,
  name: 'Vasilich',
  hp: 100,
  img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
  weapon: [
    'Vodka',
    'Pickle'
  ],
  attack: function () {
    console.log(this.name + 'Fight...');
  }
};

//Variables
const arena = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');
const drawTitle = `<div class="loseTitle">Both dead!<br>Mua-ha-ha!</div>`;

// Create player DOM
function createPlayer(playerClass, player) {
  return `
  <div class="${playerClass}">
    <div class="progressbar">
        <div class="life" style="width: ${player.hp}%;"></div>
        <div class="name">${player.name}</div>
    </div>
    <div class="character">
        <img src="${player.img}" />
    </div>
  </div>
  `;
}

//Randomized HP function
const randomHP = () => Math.ceil(Math.random() * 10);

//HP change function
function hpCalculator() {
  changeHP(playerOne);
  changeHP(playerTwo);

  if (playerOne.hp <= 0 && playerTwo.hp > 0) {
    arena.insertAdjacentHTML('afterbegin', playerWin(playerTwo.name));
  } else if (playerOne.hp > 0 && playerTwo.hp <= 0) {
    arena.insertAdjacentHTML('afterbegin' ,playerWin(playerOne.name));
  } else if (playerOne.hp <= 0 && playerTwo.hp <= 0) {
    arena.insertAdjacentHTML('afterbegin', drawTitle);
  }
}
//Random Button listener (works only when both players alive)
randomButton.addEventListener('click', hpCalculator);

//Change player HP
function changeHP(player) {
  const playerLife = document.querySelector('.player' + player.player + ' .life');
  player.hp -= randomHP();

  player.hp <= 0 ? playerLife.style.width = '0' : playerLife.style.width = player.hp + '%';

  if (player.hp <= 0) {
    randomButton.removeEventListener('click', hpCalculator);
    randomButton.style.background = '#d7d7d7';
    randomButton.style.color = '#000';
    randomButton.innerText = 'Play again!';
    randomButton.addEventListener('click', () => document.location.reload());
  }
}

//Player Win func
function playerWin(name) {
  return `<div class="loseTitle">${name} wins!</div>>`;
}

//Execute
arena.insertAdjacentHTML('beforeend', createPlayer('player1', playerOne));
arena.insertAdjacentHTML('beforeend', createPlayer('player2', playerTwo));
