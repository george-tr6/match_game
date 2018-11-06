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
let total_possible_matches = 9;
let match_counter = 0; 

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
      attempts = attempts + 1;
      console.log(firstGuess);
      clicked.parentNode.classList.add('selected');
    } else {
      secondGuess = clicked.parentNode.dataset.name;
      // attempts = attempts + 1;
      console.log(secondGuess);
      clicked.parentNode.classList.add('selected');
    }

    if (firstGuess && secondGuess) {

      if (firstGuess === secondGuess) {
        matches = matches + 1;
        match_counter = match_counter + 1;
        // accuracy = null;
        if(match_counter === total_possible_matches){
          // alert('You Won!');
          // showModal();
          games_played = games_played + 1;
          console.log('You Won!')
      }
        setTimeout(match, delay);

      }
      setTimeout(resetGuesses, delay);
 
    }

    previousTarget = clicked;
  }

  dispalyStats();

});



const dispalyStats = () => {
document.querySelector('.games-played .value').innerHTML = games_played;
document.querySelector('.attempts .value').innerHTML = attempts;
accuracy = (matches / attempts)*100;
document.querySelector('.accuracy .value').innerHTML = accuracy.toFixed() + '%';

}

const resetStats = () => {
  accuracy = 0;
  matches = 0;
  attempts = 0;
  match_counter = 0;
}

const resetButtonClickHandler = () => {
  games_played = games_played + 1;
  resetStats();
  displayStats();
  //reset and randomize cards needed
  // remove modal if active
}

const resetButtonEventListener = () => {
  document.getElementsByClassName('.btn').addEventListener('click', event => {
    const btnClicked = event.target;
  });
}

// var guessAttempts = document.getElementsByClassName('value');

// var statsGroup = document.getElementById('stats');
// statsGroup.className = 'stats-container';
// statsGroup.appendChild(document.createTextNode('STATS '));
// statsGroup.appendChild(document.createTextNode('Games Played: '));
// statsGroup.appendChild(document.createTextNode('Attempts: '));
// statsGroup.appendChild(document.createTextNode(attempts));
// statsGroup.appendChild(document.createTextNode('Accuracy: '));

// document.getElementById('stats').firstChild.nextSibling.nodeValue = 'five';



// var newdiv = document.createElement("DIV");
// newdiv.appendChild(document.createTextNode("some text"));
// grid.appendChild(newdiv);