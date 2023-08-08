/*----- constants -----*/
const PLAYERS = {
    '1': 'Player',
    '-1': 'Dealer',
}

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const originalDeck = buildDeck()

/*----- state variables -----*/
let dealerTotal, playerTotal, totalMoney, turn, winner

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

}

function renderMessage() {

}

function renderReset() {
    resetButton.style.visibility = totalMoney = 0 ? 'visible' : 'hidden'
}

function buildDeck() {
    const deck = []
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
    const copyDeck = [...originalDeck]
    const shuffledDeck = []
    while(copyDeck.length) {
        const rndIdx = Math.floor(Math.random() * copyDeck.length)
        shuffledDeck.push(copyDeck.splice(rndIdx, 1)[0])
    }
    return shuffledDeck
}

function playGame() {
    hit()
    stand()
}

function hit() {

}

function stand() {

}
