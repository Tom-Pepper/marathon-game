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
  changeHP,
  elHP,
  renderHP,
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
  changeHP,
  elHP,
  renderHP,
};

//Variables
const arena = document.querySelector('.arenas');
const button = document.querySelector('.button');
const fightForm = document.querySelector('.control');
const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

//Random Button listener (works only when both players alive)
// randomButton.addEventListener('click', renderFight);

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
const getRandom = (num) => Math.ceil(Math.random() * num);

//When the fight ends, remove listener and show reload button
function endFight () {
  fightForm.removeEventListener('submit', fight);
  fightForm.addEventListener('submit', () => window.location.reload());
  document.querySelectorAll('input').forEach(item => item.removeAttribute('required'));
  button.classList.add('.reloadWrap');
  button.textContent = 'Play again!';
  document.querySelectorAll('.inputWrap').forEach(item => item.classList.add('is-hidden'));
}

//Change player HP function
function changeHP (hit) {
  if (this.hp > 0 && this.hp - hit > 0) {
    this.hp -= hit;
  } else if (this.hp > 0 && this.hp - hit <= 0) {
    this.hp = 0;
  }
}

//Returns player HP bar after hit
function elHP() {
  return document.querySelector('.player' + this.player + ' .life');
}

//Renders player HP after hit
function renderHP() {
  this.hp === 0 ? this.elHP().style.width = '0' : this.elHP().style.width = this.hp + '%';
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

//Render players on the fight arena
arena.insertAdjacentHTML('beforeend', createPlayer('player1', playerOne));
arena.insertAdjacentHTML('beforeend', createPlayer('player2', playerTwo));

//NPC Enemy Attack func
function enemyAttack () {
  const hit = ATTACK[getRandom(3) - 1];
  const defence = ATTACK[getRandom(3) - 1];
  return {
    value: getRandom(HIT[hit]),
    hit,
    defence,
  }
}

//Fight Form listener
function fight (e) {
  e.preventDefault();
  const enemy = enemyAttack();
  const  attack = {};

  for (let item of fightForm) {
    if (item.checked && item.name === 'hit') {
      attack.value = getRandom(HIT[item.value]);
      attack.hit = item.value;
    }
    if (item.checked && item.name === 'defence') {
      attack.defence = item.value;
    }
    item.checked = false;
  }

  if (enemy.hit !== attack.defence) {
    playerOne.changeHP(enemy.value);
    playerOne.renderHP();
  }

  if (attack.hit !== enemy.defence) {
    playerTwo.changeHP(attack.value);
    playerTwo.renderHP();
  }

  if (playerOne.hp === 0 && playerTwo.hp > 0) {
    arena.insertAdjacentHTML('afterbegin', showResult(playerTwo.name));
  } else if (playerOne.hp > 0 && playerTwo.hp === 0) {
    arena.insertAdjacentHTML('afterbegin', showResult(playerOne.name));
  } else if (playerOne.hp === 0 && playerTwo.hp === 0) {
    arena.insertAdjacentHTML('afterbegin', showResult());
  }
}

fightForm.addEventListener('submit', fight);
