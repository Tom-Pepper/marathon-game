/**
 * Fight logic, including both players attack funcs and showing the fight result
 */
//NPC Enemy Attack func
import {arena, ATTACK, button, fightForm, HIT} from "./variables.js";
import {getRandom} from "./utils.js";
import {playerOne, playerTwo} from "./players.js";
import generateLog from "./logs.js";

const {name, changeHP, renderHP, ...rest} = playerOne;
const {name: enemyName, changeHP: enemyChangeHP, renderHP: enemyRenderHP,...restEnemy} = playerTwo;

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

//Fight Form listener
function fight (e) {
  e.preventDefault();

  const enemy = enemyAttack();
  const player = playerAttack();

  if (enemy.hit !== player.defence) {
    changeHP(enemy.value);
    renderHP();
    generateLog('hit', playerTwo, playerOne, enemy.value);
  }

  if (enemy.defence === player.hit) {
    generateLog('defence', playerOne, playerTwo, 0);
  }

  if (player.hit !== enemy.defence) {
    enemyChangeHP(player.value);
    enemyRenderHP();
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

//When the fight ends, remove listener and show reload button
function endFight () {
  fightForm.removeEventListener('submit', fight);
  fightForm.addEventListener('submit', () => window.location.reload());
  document.querySelectorAll('input').forEach(item => item.removeAttribute('required'));
  button.classList.add('.reloadWrap');
  button.textContent = 'Play again!';
  document.querySelectorAll('.inputWrap').forEach(item => item.classList.add('is-hidden'));
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

export default fight;
