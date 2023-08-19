let arr = [
    [null, null, null],
    [null, null, null],
    [null, null, null],
]
let winner = document.querySelector('.winner')
let resetBtn = document.querySelector('.resetBtn')
let count = 0
let playerFirst = 'Игрок 1'
let playerSecond = 'Игрок 2'
let draw = 'Ничья'

const resetGame = () => {
    if (isVictory(arr)) {
        item.forEach(el => {
            el.innerText = ''
        })
        count = 0
        resetBtn.parentElement.style.display = 'none'
        winner.innerText = ''
        arr = [
            [null, null, null],
            [null, null, null],
            [null, null, null],
        ]
    }
}

const isVictory = (items) => {
    for (let i = 0; i < 3; i++) {
        let rowSum = items[i][0] + items[i][1] + items[i][2];
        let colSum = items[0][i] + items[1][i] + items[2][i];
        if (rowSum === 3 || colSum === 3) {
            return playerSecond
        }
        if (rowSum === -3 || colSum === -3) {
            return playerFirst
        }
    }
    if (arr[0][0] + arr[1][1] + arr[2][2] === 3)
        return playerSecond
    else if (arr[0][0] + arr[1][1] + arr[2][2] === -3)
        return playerFirst

    if (arr[2][0] + arr[1][1] + arr[0][2] === 3)
        return playerSecond
    else if (arr[2][0] + arr[1][1] + arr[0][2] === -3)
        return playerFirst
    if (items[0].indexOf(null) === -1 &&
        items[1].indexOf(null) === -1 &&
        items[2].indexOf(null) === -1
    ) {
        return draw
    }
    return false
}

const handlerChangeValue = (e) => {
    if (e.currentTarget.innerText === '') {
        count += 1
        if (count % 2 === 0) {
            e.currentTarget.innerText = 'x'
            arr[e.target.dataset.row][e.target.dataset.col] = 1
        } else {
            e.currentTarget.innerText = 'o'
            arr[e.target.dataset.row][e.target.dataset.col] = -1
        }
    }
    if (isVictory(arr)) {
        if (isVictory(arr) === draw) {
            winner.innerText = `победила ${isVictory(arr)}`
        } else{
            winner.innerText = `победил ${isVictory(arr)}`
        }

        setTimeout(() => {
            resetBtn.parentElement.style.display = 'flex'
        }, 500)

    }
}

const item = document.querySelectorAll('span')
item.forEach((el) => {
    el.addEventListener('click', handlerChangeValue)
})

resetBtn.addEventListener('click', resetGame)
