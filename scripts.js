const divs = document.querySelectorAll('.container div')

let player1 = true

const cross = 'x-lg.svg'
const circle = 'circle.svg'

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