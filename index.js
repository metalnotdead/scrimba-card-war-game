let deckId 
const newDeckBtn = document.getElementById("new-deck")
const drawBtn = document.getElementById("draw-btn")
const cardContainer = document.getElementById("cards")
const header = document.getElementById("winner-text")
const remainingText = document.getElementById("remainingcard")
const myScoreText = document.getElementById("myscore")
const computerScoreText = document.getElementById("computer-score")
const tieScoreText = document.getElementById("tie-score")
let computerScore = 0
let myScore = 0
let tieScore = 0
let handleClick = function(){
    fetch("https://apis.scrimba.com/deckofcards/api/deck/new/shuffle")
    .then(response => response.json())
    .then(data => {
    remainingText.textContent = `Remaining Cards: ${data.remaining}` 
    deckId = data.deck_id
    drawBtn.disabled = false

    })
}
let drawClick = function(){
    fetch(`https://apis.scrimba.com/deckofcards/api/deck/${deckId}/draw?count=2`)
    .then(response => response.json())
    .then(data => {
        console.log(data.cards)
        cardContainer.children[0].innerHTML = `
        <img src=${data.cards[0].image} class="card"/> 
        `
        cardContainer.children[1].innerHTML = `
        <img src=${data.cards[1].image} class="card"/> 
        `
        const winnerText = determineCardWinner(data.cards[0],data.cards[1])
        header.textContent = winnerText
        remainingText.textContent = `Remaining Cards: ${data.remaining} `

        if (data.remaining === 0){
            drawBtn.disabled = true
            if (computerScore > myScore){
                header.textContent = `Computer Won the WAR!`
                
            } else if (computerScore < myScore){
                header.textContent = `You Won the WAR!`
                
            } else {
                header.textContent = "It's a WAR!"
                }
    
        } 
        })
        
    }
newDeckBtn.addEventListener("click", handleClick)
drawBtn.addEventListener("click", drawClick)


function determineCardWinner(card1,card2){
    const valueOptions = ["2","3","4","5","6","7","8","9","10","JACK","QUEEN","KING","ACE"]
    const card1ValueIndex = valueOptions.indexOf(card1.value)
    const card2ValueIndex = valueOptions.indexOf(card2.value)

    if (card1ValueIndex > card2ValueIndex){
        computerScore++;
        computerScoreText.textContent = `Computer Score: ${computerScore}`
        return "Card 1 Wins!"
        
    } else if (card1ValueIndex < card2ValueIndex){ 
        myScore++;
        myScoreText.textContent = `My Score: ${myScore}`
        return "Card 2 Wins!"
    } else {
        tieScore++;
        tieScoreText.textContent = `Tie: ${tieScore}`

        return "Its a tie!"
    }
}

