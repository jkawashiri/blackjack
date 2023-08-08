/*----- constants -----*/
const PLAYERS = {
    '1': 'Player',
    '-1': 'Dealer',
}

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const deck = []

/*----- state variables -----*/
let dealerTotal, playerTotal, totalMoney, turn, winner
let dealerCards = []
let playerCards = []
let shuffledDeck = []

/*----- cached elements  -----*/
const resetButton = document.getElementById('reset')

/*----- event listeners -----*/
document.getElementById('bet').addEventListener('click', playGame)
document.getElementById('hit').addEventListener('click', hit)
document.getElementById('stand').addEventListener('click', stand)

/*----- functions -----*/
init ()

function init() {
    dealerTotal = 0
    playerTotal = 0
    totalMoney = 1000
    turn = 1
    winner = null
    render()
}

function render() {
    renderTotals()
    renderMessage()
    renderReset()
    buildDeck()
    getShuffledDeck()
}

function renderTotals() {
    playerTotal = playerCards.reduce((acc, curr) => acc + curr, 0)
    document.getElementById('playertotal').innerHTML = playerTotal
    
    dealerTotal = dealerCards.reduce((acc, curr) => acc + curr, 0)
    document.getElementById('dealertotal').innerHTML = dealerTotal
}

function renderMessage() {

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

function getShuffledDeck() {
    const copyDeck = [...deck]
    while(copyDeck.length) {
        const rndIdx = Math.floor(Math.random() * copyDeck.length)
        shuffledDeck.push(copyDeck.splice(rndIdx, 1)[0])
    }
    return shuffledDeck
}

function playGame() {
    let dealerClass1 = document.querySelector('#dealercards').appendChild(document.createElement('div'))
    let dealerCard1 = shuffledDeck.pop()
    dealerClass1.setAttribute('class', `card ${dealerCard1.face}`)

    let dealerClass2 = document.querySelector('#dealercards').appendChild(document.createElement('div'))
    let dealerCard2 = shuffledDeck.pop()
    dealerClass2.setAttribute('class', `card ${dealerCard2.face}`)
    
    dealerCards.push(dealerCard1.value, dealerCard2.value)

    let playerClass1 = document.querySelector('#playercards').appendChild(document.createElement('div'))
    let playerCard1 = shuffledDeck.pop()
    playerClass1.setAttribute('class', `card ${playerCard1.face}`)

    let playerClass2 = document.querySelector('#playercards').appendChild(document.createElement('div'))
    let playerCard2 = shuffledDeck.pop()
    playerClass2.setAttribute('class', `card ${playerCard2.face}`) 
    
    playerCards.push(playerCard1.value, playerCard2.value)

    hit()
    stand()
    render()
}

function hit() {
    
}

function stand() {

}
