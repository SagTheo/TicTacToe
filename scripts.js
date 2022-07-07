const divs = document.querySelectorAll('.container div')
const box1 = document.querySelector('#1')
const box2 = document.querySelector('#2')
const box3 = document.querySelector('#3')
const box4 = document.querySelector('#4')
const box5 = document.querySelector('#5')
const box6 = document.querySelector('#6')
const box7 = document.querySelector('#7')
const box8 = document.querySelector('#8')
const box9 = document.querySelector('#9')

const threes = [
    [box1, box2, box3],
    [box4, box5, box6],
    [box7, box8, box9],
    [box1, box4, box7],
    [box2, box5, box8],
    [box3, box6, box9],
    [box1, box5, box9],
    [box3, box5, box7]
]

let player1 = true

const cross = 'x-lg.svg'
const circle = 'circle.svg'

const checkFullRow = () => {
    threes.forEach(array => {
        array.forEach(box => {
            
        })
    })
}

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
        }
    })
})