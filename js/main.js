/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const deck = []

/*----- state variables -----*/
let shuffledDeck = []

let result, dealerTotal, playerTotal, dealerAceCount, playerAceCount, hidden, canHit, playerCards, message

/*----- cached elements  -----*/
const resetButton = document.getElementById('reset')

/*----- event listeners -----*/
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stand').addEventListener('click', stand)
resetButton.addEventListener('click', init)

/*----- functions -----*/
init ()

function init() {
    result = null
    dealerTotal = 0
    playerTotal = 0
    dealerAceCount = 0
    playerAceCount = 0
    hidden = null
    playerCards = []
    canHit = true

    document.querySelector('#dealercards').innerHTML = ''
    document.querySelector('#playercards').innerHTML = ''
    document.getElementById('result').innerHTML = ''
    document.getElementById('dealertotal').innerHTML = ''

    buildDeck()
    shuffleDeck()
    playGame()
    render()
}

function render() {
    renderPlayerTotal()
    renderMessage()
    renderReset()
}

function renderPlayerTotal() {
    playerTotal = reduceAce(playerTotal, playerAceCount)
    document.getElementById('playertotal').innerText = playerTotal
}

function renderMessage() {
    if (result === true) {
        if (playerTotal > 21) {
            message = 'Dealer Wins!'
        }
        else if (dealerTotal > 21) {
            message = 'You Win!'
        }
        else if (playerTotal === dealerTotal) {
            message = "It's a tie!"
        }
        else if (playerTotal > dealerTotal) {
            message = 'You Win!'
        }
        else if (playerTotal < dealerTotal) {
            message = 'Dealer Wins!'
        }
        document.getElementById('result').innerText = message
    }
}

function renderReset() {
    resetButton.style.visibility = result ? 'visible' : 'hidden'
}

function buildDeck() {
    suits.forEach(function(suit) {
        ranks.forEach(function(rank) {
            deck.push({
                face: `${suit}${rank}`,
                value: Number(rank) || (rank === 'A' ? 11 : 10)
            })
        })
    })
    return deck
}

function shuffleDeck() {
    const copyDeck = [...deck]
    while(copyDeck.length) {
        const rndIdx = Math.floor(Math.random() * copyDeck.length)
        shuffledDeck.push(copyDeck.splice(rndIdx, 1)[0])
    }
    return shuffledDeck
}

function playGame() {
    hidden = shuffledDeck.pop()
    dealerTotal += hidden.value
    dealerAceCount += checkAce(hidden)

    document.querySelector('#dealercards').appendChild(document.createElement('div')).setAttribute('class', 'card back-red')

    for (let i = 0; i < 1; i++) {
        let cardImg = document.querySelector('#dealercards').appendChild(document.createElement('div'));
        let card = shuffledDeck.pop();
        cardImg.setAttribute('class', `card ${card.face}`);
        dealerTotal += card.value;
        dealerAceCount += checkAce(card);
    }

    for (let i = 0; i < 2; i++) {
        let cardImg = document.querySelector('#playercards').appendChild(document.createElement('div'))
        let card = shuffledDeck.pop()
        cardImg.setAttribute('class', `card ${card.face}`)
        playerTotal += card.value
        playerAceCount += checkAce(card)
        playerCards.push(card.value)
    }

    render()
}

function hit() {
    if (!canHit) {
        return;
    }

    let cardImg = document.querySelector('#playercards').appendChild(document.createElement('div'))
    let card = shuffledDeck.pop()
    cardImg.setAttribute('class', `card ${card.face}`)
    playerTotal += card.value
    playerAceCount += checkAce(card)

    if (playerTotal > 21 && playerAceCount > 0) {
        playerTotal -= 10;
        playerAceCount--;
    }

    playerCards.push(card.value)

    if (playerTotal > 21) {
        canHit = false;
    }

    render()
}

function stand() {
    while(dealerTotal < 17) {
        let cardImg = document.querySelector('#dealercards').appendChild(document.createElement('div'))
        let card = shuffledDeck.pop()
        cardImg.setAttribute('class', `card ${card.face}`)
        dealerTotal += card.value
        dealerAceCount += checkAce(card)
        dealerTotal = reduceAce(dealerTotal, dealerAceCount)
    }
    
    document.querySelector('.card.back-red').classList.replace('back-red', hidden.face) 
    document.getElementById('dealertotal').innerText = dealerTotal

    result = true

    render()
}

function checkAce(card) {
    if (card.face.includes('A')) {
        return 1
    }
    return 0
}

function reduceAce(playerTotal, playerAceCount) {
    while (playerTotal > 21 && playerAceCount > 0) {
        playerTotal -= 10
        playerAceCount -= 1
    }
    return playerTotal
}