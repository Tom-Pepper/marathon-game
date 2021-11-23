//Variables
export const arena = document.querySelector('.arenas');
export const button = document.querySelector('.button');
export const fightForm = document.querySelector('.control');
export const chat = document.querySelector('.chat');
export const date = new Date();
export const normalize = (time) => (time.toString().length > 1 ? time : `0${time}`);
export const currentTime = `${normalize(date.getHours())}:${normalize(date.getMinutes())}`;

export const HIT = {
  head: 30,
  body: 25,
  foot: 20,
}
export const ATTACK = ['head', 'body', 'foot'];
