//First fighter object
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
  },
  renderHP: function () {
    this.hp === 0 ? elHP(this).style.width = '0' : elHP(this).style.width = this.hp + '%';
  }
};

//Second fighter object
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
  },
  renderHP: function () {
    this.hp === 0 ? elHP(this).style.width = '0' : elHP(this).style.width = this.hp + '%';
  }
};

//Variables
const arena = document.querySelector('.arenas');
const randomButton = document.querySelector('.button');

//Random Button listener (works only when both players alive)
randomButton.addEventListener('click', renderFight);

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

//When the fight ends, remove listener and show reload button
function endFight () {
  randomButton.removeEventListener('click', renderFight);
  randomButton.style.background = '#d7d7d7';
  randomButton.style.color = '#000';
  randomButton.innerText = 'Play again!';
  randomButton.addEventListener('click', () => document.location.reload());
}

//Change player HP function
function changeHP (player, hit) {
  if (player.hp > 0 && player.hp - hit > 0) {
    player.hp -= hit;
  } else if (player.hp > 0 && player.hp - hit <= 0) {
    player.hp = 0;
  }
}

//Returns player HP bar after hit
function elHP(player) {
  return document.querySelector('.player' + player.player + ' .life');
}

//Fight progress render
function renderFight() {
  changeHP(playerOne, randomHP());
  playerOne.renderHP();

  changeHP(playerTwo, randomHP());
  playerTwo.renderHP();

  if (playerOne.hp === 0 && playerTwo.hp > 0) {
    arena.insertAdjacentHTML('afterbegin', showResult(playerTwo.name));
  } else if (playerOne.hp > 0 && playerTwo.hp === 0) {
    arena.insertAdjacentHTML('afterbegin', showResult(playerOne.name));
  } else if (playerOne.hp === 0 && playerTwo.hp === 0) {
    arena.insertAdjacentHTML('afterbegin', showResult());
  }
}

//Show fight result
function showResult(name) {
  if (name) {
    endFight();
    return `<div class="loseTitle">${name} wins!</div>>`;
  } else {
    endFight();
    return `<div class="loseTitle">Both dead!<br>Mua-ha-ha!</div>`;
  }
}

//Execute
arena.insertAdjacentHTML('beforeend', createPlayer('player1', playerOne));
arena.insertAdjacentHTML('beforeend', createPlayer('player2', playerTwo));
