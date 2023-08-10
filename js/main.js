/*----- constants -----*/
const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const deck = []

/*----- state variables -----*/
let totalMoney, result

let dealerTotal = 0
let playerTotal = 0

let dealerAceCount = 0
let playerAceCount = 0

let hidden

let shuffledDeck = []

let playerCards = []

let canHit = true

/*----- cached elements  -----*/
const resetButton = document.getElementById('reset')

/*----- event listeners -----*/
document.getElementById('bet').addEventListener('click', playGame)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stand').addEventListener('click', stand)

/*----- functions -----*/
init ()

function init() {
    totalMoney = 1000
    winner = null
    buildDeck()
    shuffleDeck()
    render()
}

function render() {
    renderTotals()
    renderMessage()
    renderReset()
}

function renderTotals() {
    document.getElementById('playertotal').innerText = playerTotal 
}

function renderMessage() {
    if (result === true) {
        let message = ''
        if (playerTotal > 21) {
            message = 'You Lose!'
        }
        else if (dealerTotal > 21) {
            message = 'You Win!'
        }
        else if (playerTotal === dealerTotal) {
            message = 'Tie!'
        }
        else if (playerTotal > dealerTotal) {
            message = 'You Win!'
        }
        else if (playerTotal < dealerTotal) {
            message = 'You Lose!'
        }
        document.getElementById('result').innerText = message
    }
}

function renderReset() {
    resetButton.style.visibility = totalMoney = 0 ? 'visible' : 'hidden'
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
    playerCards.push(card.value)

    if (reduceAce(playerTotal, playerAceCount) > 21) {
        canHit = false
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
    }
    
    dealerTotal = reduceAce(dealerTotal, dealerAceCount)
    playerTotal = reduceAce(playerTotal, playerAceCount)

    canHit = false
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