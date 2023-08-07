/*----- constants -----*/
const PLAYERS = {
    '1': 'Player',
    '-1': 'Dealer',
}

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
