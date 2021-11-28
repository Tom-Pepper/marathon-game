//Player class
export class Player {
  constructor(props) {
    this.player = props.player;
    this.name = props.name;
    this.hp = props.hp;
    this.img = props.img;
    this.weapon = props.weapon;
  }

  //Change player HP function
  changeHP (hit) {
    if (this.hp > 0 && this.hp - hit > 0) {
      this.hp -= hit;
    } else if (this.hp > 0 && this.hp - hit <= 0) {
      this.hp = 0;
    }
  }

  //Returns player HP bar after hit
  elHP() {
    return document.querySelector('.player' + this.player + ' .life');
  }

  //Renders player HP after hit
  renderHP() {
    this.hp === 0 ? this.elHP().style.width = '0' : this.elHP().style.width = this.hp + '%';
  }

  createPlayer() {
    return `
  <div class="player${this.player}">
    <div class="progressbar">
        <div class="life" style="width: ${this.hp}%;"></div>
        <div class="name">${this.name}</div>
    </div>
    <div class="character">
        <img src="${this.img}" />
    </div>
  </div>
  `;
  }
}

//Player 1 object
// export const playerOne = new Player({
//   player: 1,
//   name: 'Fedot',
//   hp: 100,
//   img: 'http://reactmarathon-api.herokuapp.com/assets/liukang.gif',
//   weapon: [
//     'Sushi',
//     'Sake'
//   ],
// });
//
// //Player 2 object
// export const playerTwo = new Player({
//   player: 2,
//   name: 'Vasilich',
//   hp: 100,
//   img: 'http://reactmarathon-api.herokuapp.com/assets/subzero.gif',
//   weapon: [
//     'Vodka',
//     'Pickle'
//   ],
// });

