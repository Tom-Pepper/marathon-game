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

//Log object
const logs = {
  start: 'Часы показывали [time], когда [player1] и [player2] бросили вызов друг другу.',
  end: [
    'Результат удара [playerWins]: [playerLose] - труп',
    '[playerLose] погиб от удара бойца [playerWins]',
    'Результат боя: [playerLose] - жертва, [playerWins] - убийца',
  ],
  hit: [
    '[playerDefence] пытался сконцентрироваться, но [playerKick] разбежавшись раздробил копчиком левое ухо врага.',
    '[playerDefence] расстроился, как вдруг, неожиданно [playerKick] случайно раздробил грудью грудину противника.',
    '[playerDefence] зажмурился, а в это время [playerKick], прослезившись, раздробил кулаком пах оппонента.',
    '[playerDefence] чесал <вырезано цензурой>, и внезапно неустрашимый [playerKick] отчаянно размозжил грудью левый бицепс оппонента.',
    '[playerDefence] задумался, но внезапно [playerKick] случайно влепил грубый удар копчиком в пояс оппонента.',
    '[playerDefence] ковырялся в зубах, но [playerKick] проснувшись влепил тяжелый удар пальцем в кадык врага.',
    '[playerDefence] вспомнил что-то важное, но внезапно [playerKick] зевнув, размозжил открытой ладонью челюсть противника.',
    '[playerDefence] осмотрелся, и в это время [playerKick] мимоходом раздробил стопой аппендикс соперника.',
    '[playerDefence] кашлянул, но внезапно [playerKick] показав палец, размозжил пальцем грудь соперника.',
    '[playerDefence] пытался что-то сказать, а жестокий [playerKick] проснувшись размозжил копчиком левую ногу противника.',
    '[playerDefence] забылся, как внезапно безумный [playerKick] со скуки, влепил удар коленом в левый бок соперника.',
    '[playerDefence] поперхнулся, а за это [playerKick] мимоходом раздробил коленом висок врага.',
    '[playerDefence] расстроился, а в это время наглый [playerKick] пошатнувшись размозжил копчиком губы оппонента.',
    '[playerDefence] осмотрелся, но внезапно [playerKick] робко размозжил коленом левый глаз противника.',
    '[playerDefence] осмотрелся, а [playerKick] вломил дробящий удар плечом, пробив блок, куда обычно не бьют оппонента.',
    '[playerDefence] ковырялся в зубах, как вдруг, неожиданно [playerKick] отчаянно размозжил плечом мышцы пресса оппонента.',
    '[playerDefence] пришел в себя, и в это время [playerKick] провел разбивающий удар кистью руки, пробив блок, в голень противника.',
    '[playerDefence] пошатнулся, а в это время [playerKick] хихикая влепил грубый удар открытой ладонью по бедрам врага.',
  ],
  defence: [
    '[playerKick] потерял момент и храбрый [playerDefence] отпрыгнул от удара открытой ладонью в ключицу.',
    '[playerKick] не контролировал ситуацию, и потому [playerDefence] поставил блок на удар пяткой в правую грудь.',
    '[playerKick] потерял момент и [playerDefence] поставил блок на удар коленом по селезенке.',
    '[playerKick] поскользнулся и задумчивый [playerDefence] поставил блок на тычок головой в бровь.',
    '[playerKick] старался провести удар, но непобедимый [playerDefence] ушел в сторону от удара копчиком прямо в пятку.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.',
    '[playerKick] не думал о бое, потому расстроенный [playerDefence] отпрыгнул от удара кулаком куда обычно не бьют.',
    '[playerKick] обманулся и жестокий [playerDefence] блокировал удар стопой в солнечное сплетение.'
  ],
  draw: 'Ничья - это тоже победа!'
};

//Variables
const arena = document.querySelector('.arenas');
const button = document.querySelector('.button');
const fightForm = document.querySelector('.control');
const chat = document.querySelector('.chat');
const date = new Date();
const normalize = (time) => (time.toString().length > 1 ? time : `0${time}`);
const currentTime = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;

const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
const ATTACK = ['head', 'body', 'foot'];

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

//Generates fight log
function generateLog (type, player1, player2, value) {
  const hitTime = `${normalize(new Date().getHours())}:${normalize(new Date().getMinutes())}`;

  switch (type) {
    case 'start':
      const startEl = logs[type]
        .replace('[time]', currentTime)
        .replace('[player1]', playerOne.name)
        .replace('[player2]', playerTwo.name)
      chat.insertAdjacentHTML('afterbegin', `<p>${startEl}</p>`);
      break;

    case 'hit':
      const hitEl = logs[type][getRandom([logs[type].length - 1])]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);

      const hitText = `<p>${hitTime}: ${hitEl} <br><span class="hit-value">${0 - value}</span>, ${player2.hp}/100</p>`;
      chat.insertAdjacentHTML('afterbegin', hitText);
      break;

    case 'defence':
      const defEl = logs[type][getRandom([logs[type].length - 1])]
        .replace('[playerKick]', player1.name)
        .replace('[playerDefence]', player2.name);
      const defText = `<p>${hitTime}: ${defEl} <br><span>${0 - value}</span>, ${player2.hp}/100</p>`;
      chat.insertAdjacentHTML('afterbegin', defText);
      break;

    case 'end':
      const endEl = logs['end'][getRandom(logs['end'].length - 1)]
        .replace('[playerWins]', player1)
        .replace('[playerLose]', player2);
      const endText = `<p>${hitTime}: ${endEl}</p>`;
      chat.insertAdjacentHTML('afterbegin', endText);
      break;

    case 'draw':
      chat.insertAdjacentHTML('afterbegin', `<p>${logs[type]}</p>p>`);
      break;
  }
}

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

//Player attack func
function playerAttack () {
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

  return attack;
}

//Fight Form listener
function fight (e) {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    playerOne.changeHP(enemy.value);
    playerOne.renderHP();
    generateLog('hit', playerTwo, playerOne, enemy.value);
  }

  if (enemy.defence === player.hit) {
    generateLog('defence', playerOne, playerTwo, 0);
  }

  if (player.hit !== enemy.defence) {
    playerTwo.changeHP(player.value);
    playerTwo.renderHP();
    generateLog('hit', playerOne, playerTwo, player.value);
  }

  if (player.defence === enemy.hit) {
    generateLog('defence', playerTwo, playerOne, 0);
  }

  if (playerOne.hp === 0 && playerTwo.hp > 0) {
    arena.insertAdjacentHTML('afterbegin', showResult(playerTwo.name, playerOne.name));
  } else if (playerOne.hp > 0 && playerTwo.hp === 0) {
    arena.insertAdjacentHTML('afterbegin', showResult(playerOne.name, playerTwo.name));
  } else if (playerOne.hp === 0 && playerTwo.hp === 0) {
    arena.insertAdjacentHTML('afterbegin', showResult());
  }
}

//Show fight result
function showResult(winner, loser) {
  if (winner && loser) {
    endFight();
    generateLog('end', winner, loser);
    return `<div class="loseTitle">${winner} wins!</div>>`;
  } else {
    endFight();
    generateLog('draw');
    return `<div class="loseTitle">Both dead!<br>Mua-ha-ha!</div>`;
  }
}

//When the fight ends, remove listener and show reload button
function endFight () {
  fightForm.removeEventListener('submit', fight);
  fightForm.addEventListener('submit', () => window.location.reload());
  document.querySelectorAll('input').forEach(item => item.removeAttribute('required'));
  button.classList.add('.reloadWrap');
  button.textContent = 'Play again!';
  document.querySelectorAll('.inputWrap').forEach(item => item.classList.add('is-hidden'));
}

//Render players on the fight arena and start to fight
arena.insertAdjacentHTML('beforeend', createPlayer('player1', playerOne));
arena.insertAdjacentHTML('beforeend', createPlayer('player2', playerTwo));
generateLog('start', playerOne, playerTwo);

fightForm.addEventListener('submit', fight);
