/*----- constants -----*/
const PLAYERS = {
    '1': 'Player',
    '-1': 'Dealer',
}

const suits = ['s', 'c', 'd', 'h']
const ranks = ['02', '03', '04', '05', '06', '07', '08', '09', '10', 'J', 'Q', 'K', 'A']
const originalDeck = buildDeck()

/*----- state variables -----*/
let dealerTotal, playerTotal, cards, turn, winner

/*----- cached elements  -----*/


/*----- event listeners -----*/


/*----- functions -----*/
init ()

function init() {
    cards = []
    dealerTotal = 0
    playerTotal = 0
    turn = 1
    winner = null
    render()
}

function render() {
    renderCards()
    renderTotals()
    renderMessage()
}

function renderCards() {

}

function renderTotals() {

}

function renderMessage() {

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
