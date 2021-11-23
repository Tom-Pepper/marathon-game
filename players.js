//First fighter object
export const playerOne = {
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
export const playerTwo = {
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

export default createPlayer;
