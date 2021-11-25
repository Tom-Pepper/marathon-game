import { playerOne, playerTwo } from "./players.js";
import createPlayer from "./players.js";

import generateLog from "./logs.js";

import { arena, fightForm } from "./variables.js";

import fight from "./fight_logic.js";

//Render players on the fight arena and start to fight
arena.insertAdjacentHTML('beforeend', createPlayer('player1', playerOne));
arena.insertAdjacentHTML('beforeend', createPlayer('player2', playerTwo));
generateLog('start', playerOne, playerTwo);

fightForm.addEventListener('submit', fight);
