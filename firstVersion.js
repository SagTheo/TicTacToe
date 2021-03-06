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
const button = document.querySelector('button')

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

let player1 = true

const cross = 'x-lg.svg'
const circle = 'circle.svg'

const checkFullRow = (row) => {
    rowsToCheck = row.split('-')
    
    // Need to use forEach and not simple for loop here so that the return statement 
    // in the second if check stops the execution of the callback function of the forEach, 
    // and not the execution of checkFullRow(), so we can go through every item 
    // of rowsToCheck
    rowsToCheck.forEach(rowToCheck => {
        const first =  threes[rowToCheck][0]

        if (first.firstChild.getAttribute('src') !== "") {
            const label = first.firstChild.getAttribute('src')

            for (let i = 1; i < threes[rowToCheck].length; i++) {
                const current = threes[rowToCheck][i].firstChild.getAttribute('src')
                if (current === "" || current !== label) {
                    return false
                }
            }

            threes[rowToCheck].forEach(box => {
                box.classList.add('full')
            })
        }
    })
}

// To empty each box of the tic tac toe and start a new game
button.addEventListener('click', () => {
    divs.forEach(div => {
        div.firstChild.setAttribute('src', "")
        div.classList.remove('full')
    })

    player1 = true
})

divs.forEach(div => {
    div.addEventListener('click', (e) => {
        // If check to prevent error related to user clicking on a box that's already 
        // been clicked(if clicks on img tag, won't be able to find its firstChild, 
        // because event will propagate and eventually be fired on the img element, not the div)
        if (e.target.nodeName !== 'IMG') {
            if (player1) {
                // If check to prevent user from clicking on a box and changing its content 
                // when it's already been set
                if (e.target.firstChild.getAttribute('src') === "") {
                    e.target.firstChild.setAttribute('src', cross)
                    player1 = !player1
                }
            } else {
                if (e.target.firstChild.getAttribute('src') === "") {
                    e.target.firstChild.setAttribute('src', circle) 
                    player1 = !player1
                }
            }

            checkFullRow(e.target.getAttribute('id'))
        }
    })
})