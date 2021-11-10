//Players One object
const playerOne = {
  name: 'Fedot',
  hp: 80,
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
  name: 'Vasilich',
  hp: 20,
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

//Execute
arena.insertAdjacentHTML('beforeend', createPlayer('player1', playerOne));
arena.insertAdjacentHTML('beforeend', createPlayer('player2', playerTwo));
