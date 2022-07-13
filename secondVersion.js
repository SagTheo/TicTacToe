const divs = document.querySelectorAll('.container div')
const box1 = document.querySelector('#r1-c1-d1')
const box2 = document.querySelector('#r1-c2')
const box3 = document.querySelector('#r1-c3-d2')
const box4 = document.querySelector('#r2-c1')
const box5 = document.querySelector('#r2-c2-d1-d2')
const box6 = document.querySelector('#r2-c3')
const box7 = document.querySelector('#r3-c1-d2')
const box8 = document.querySelector('#r3-c2')
const box9 = document.querySelector('#r3-c3-d1')
const reset = document.querySelector('.reset')
const modal = document.querySelector('dialog') 
const closeDialog = document.querySelector('.closeDialog')

const cross = "M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z"
const circle = "M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z"

const threes = {
    'r1': [box1, box2, box3],
    'r2': [box4, box5, box6],
    'r3': [box7, box8, box9],
    'c1': [box1, box4, box7],
    'c2': [box2, box5, box8],
    'c3': [box3, box6, box9],
    'd1': [box1, box5, box9],
    'd2': [box3, box5, box7]
}

let result
let player1 = true

// To check if there is a full row everytime a box is clicked on
const checkFullRow = (row) => {
    rowsToCheck = row.split('-')
    
    // Need to use forEach and not simple for loop here so that the return statement 
    // in the second if check stops the execution of the callback function of the forEach, 
    // and not the execution of checkFullRow(), so we can go through every item 
    // of rowsToCheck
    rowsToCheck.forEach(rowToCheck => {
        const first =  threes[rowToCheck][0]

        if (first.childNodes[1].childNodes[1].getAttribute('d') !== "") {
            const label = first.childNodes[1].childNodes[1].getAttribute('d')

            for (let i = 1; i < threes[rowToCheck].length; i++) {
                const current = threes[rowToCheck][i].childNodes[1].childNodes[1].getAttribute('d')
                if (current === "" || current !== label) {
                    return false
                }
            }

            threes[rowToCheck].forEach(box => {
                box.classList.add('full')
                box.childNodes[1].setAttribute('fill', 'white')
            })

            result = true
        }
    })

    return result
}

// To empty each box of the tic tac toe and start a new game
const resetGame = () => {
    divs.forEach(div => {
        div.childNodes[1].childNodes[1].setAttribute('d', "")
        div.classList.remove('full')
        div.childNodes[1].setAttribute('fill', '')
    })

    player1 = true
    result = false
}

reset.addEventListener('click', resetGame)
closeDialog.addEventListener('click', resetGame)

// To set the box that's clicked on to a cross or a circle
divs.forEach(div => {
    div.addEventListener('click', () => {
        if (player1) {
            if (div.childNodes[1].childNodes[1].getAttribute('d') === "") {
                div.childNodes[1].childNodes[1].setAttribute('d', cross)

                player1 = !player1
            }
        } else {
            if (div.childNodes[1].childNodes[1].getAttribute('d') === "") {
                div.childNodes[1].childNodes[1].setAttribute('d', circle)

                player1 = !player1
            }
        }

        // If full row, modal pops up to indicate end of game
        if (checkFullRow(div.getAttribute('id'))) {
            modal.showModal()
        }
    })
})