const cardsArray = [{
        'name': 'daisy',
        'img': 'images/Daisy_Duck.png',
    },
    {
        'name': 'donald',
        'img': 'images/Donald_Duck.png',  
    },
    {
        'name': 'goofy',
        'img': 'images/Goofy.png',  
    },
    {
        'name': 'mickey',
        'img': 'images/Mickey.png',  
    },
    {
        'name': 'minnie',
        'img': 'images/Minnie-Mouse.png',  
    },
    {
        'name': 'piglet',
        'img': 'images/Piglet.png',  
    },
    {
        'name': 'pluto',
        'img': 'images/Pluto.png',  
    },
    {
        'name': 'tigger',
        'img': 'images/Tigger.png',  
    },
    {
        'name': 'pooh',
        'img': 'images/Winnie-the-pooh.png',  
    },
];

const gameGrid = cardsArray
  .concat(cardsArray)
  .sort(() => 0.5 - Math.random());

let firstGuess = '';
let secondGuess = '';
let count = 0;
let previousTarget = null;
let delay = 1200;

let matches = 0;
let attempts = 0;
let accuracy = 0;
let games_played = 0;

const game = document.getElementById('game');
const grid = document.createElement('section');
grid.setAttribute('class', 'grid');
game.appendChild(grid);

gameGrid.forEach(item => {
  const { name, img } = item;

  const card = document.createElement('div');
  card.classList.add('card');
  card.dataset.name = name;

  const front = document.createElement('div');
  front.classList.add('front');

  const back = document.createElement('div');
  back.classList.add('back');
  back.style.backgroundImage = `url(${img})`;

  grid.appendChild(card);
  card.appendChild(front);
  card.appendChild(back);
});

const match = () => {
  const selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.add('match');
  });
};

const resetGuesses = () => {
  firstGuess = '';
  secondGuess = '';
  count = 0;
  previousTarget = null;

  var selected = document.querySelectorAll('.selected');
  selected.forEach(card => {
    card.classList.remove('selected');
  });
};

grid.addEventListener('click', event => {

  const clicked = event.target;

  if (
    clicked.nodeName === 'SECTION' ||
    clicked === previousTarget ||
    clicked.parentNode.classList.contains('selected') ||
    clicked.parentNode.classList.contains('match')
  ) {
    return;
  }

  if (count < 2) {
    count++;
    if (count === 1) {
      firstGuess = clicked.parentNode.dataset.name;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {
      if (firstGuess === secondGuess) {
        setTimeout(match, delay);
      }
      setTimeout(resetGuesses, delay);
    }
    previousTarget = clicked;
  }

});



// var newdiv = document.createElement("DIV");
// newdiv.appendChild(document.createTextNode("some text"));
// grid.appendChild(newdiv);