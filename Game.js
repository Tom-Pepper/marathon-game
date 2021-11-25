/**
 * Game class — all the necessary methods to start game
 */
import {arena, ATTACK, button, fightForm, HIT} from "./variables.js";
import createPlayer, {getRandom} from "./utils.js";
import { playerTwo, playerOne } from "./Player.js";
import generateLog from "./logs.js";

const {name} = playerOne;
const {name: enemyName} = playerTwo;

//Enemy attack func
function enemyAttack () {
  const hit = ATTACK[getRandom(ATTACK.length) - 1];
  const defence = ATTACK[getRandom(ATTACK.length) - 1];
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
  // fightForm.removeEventListener('submit', this.fight);
  fightForm.addEventListener('submit', () => window.location.reload());
  document.querySelectorAll('input').forEach(item => item.removeAttribute('required'));
  button.classList.add('.reloadWrap');
  button.textContent = 'Play again!';
  document.querySelectorAll('.inputWrap').forEach(item => item.classList.add('is-hidden'));
}

class Game {
//Fight Form listener
  fight (e) {
    e.preventDefault();

    const player = playerAttack();
    const enemy = enemyAttack();

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
      arena.insertAdjacentHTML('afterbegin', showResult(enemyName, name));
    } else if (playerOne.hp > 0 && playerTwo.hp === 0) {
      arena.insertAdjacentHTML('afterbegin', showResult(name, enemyName));
    } else if (playerOne.hp === 0 && playerTwo.hp === 0) {
      arena.insertAdjacentHTML('afterbegin', showResult());
    }
  }

  start() {
    //Render players on the fight arena and start to fight
    arena.insertAdjacentHTML('beforeend', createPlayer('player1', playerOne));
    arena.insertAdjacentHTML('beforeend', createPlayer('player2', playerTwo));
    generateLog('start', playerOne, playerTwo);

    fightForm.addEventListener('submit', this.fight);
  }
}

export const game = new Game();
