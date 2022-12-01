const btn = document.querySelector('.button-prikol')
const place = document.querySelector('.placeholder')
const feedback = document.querySelector('.feedback')

const likeInfo = document.querySelector('.like_info')
const dislikeInfo = document.querySelector('.dislike_info')

function sendRequest(){
    fetch('/getPrikol')
        .then(response => response.json())
        .then(text => {
            setPrikol(text[0])
            picName = text[0]
            likeInfo.innerHTML = text[1]
            dislikeInfo.innerHTML = text[2]
        })

}

let picName = ''

function setPrikol(src){
    place.innerHTML = ''
    const pic = document.createElement('img')
    pic.classList.add('pic')
    feedback.classList.add('fixed')
    pic.src = src;
    place.append(pic)
}

btn.addEventListener('click', () => {
    sendRequest()
    feedback.classList.add('fixed')
    feedbckButtons.forEach(value => value.classList.remove('hiden'))
    feedbckButtons.forEach(value => value.classList.remove('inactive'))
})

const feedbckButtons = document.querySelectorAll('.feedback_button')
const dislikeBtn = document.querySelector('.dislike')
const likeBtn = document.querySelector('.like')

function sendVote(picName, vote){
    const request = {
        picName: picName,
        vote: vote
    }
    fetch('/feedback', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify(request)

    })
        .then(response => response.json())
        .then(text => {
            dislikeInfo.innerHTML = text[1]
            likeInfo.innerHTML = text[0]
        })
}

likeBtn.addEventListener('click', () => {
    if (!likeBtn.classList.contains('inactive')){
        sendVote(picName, 'like')
        feedbckButtons.forEach(value => value.classList.add('inactive'))
    }
})

dislikeBtn.addEventListener('click', () => {
    if (!likeBtn.classList.contains('inactive')){
        sendVote(picName, 'dislike')
        feedbckButtons.forEach(value => value.classList.add('inactive'))
    }
})