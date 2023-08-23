let arr = []
let winner = document.querySelector('.winner')
let game = document.querySelector('.game')
let btnWrapper = document.querySelector('.btn-wrapper')
let resetBtn = document.querySelector('.resetBtn')
let playWithPerson = document.querySelector('.playWithPerson')
let isPlayWithPerson = false
let playWithBot = document.querySelector('.playWithBot')
let count = 0
let playerFirst = 'Игрок 1'
let playerSecond = 'Игрок 2'
let draw = 'Ничья'
let possibleCombinations = []
playWithPerson.addEventListener('click', (e) => {
    game.style.display = 'block'
    btnWrapper.style.display = 'none'
    isPlayWithPerson = true
    resetGame()
})

playWithBot.addEventListener('click', (e) => {
    game.style.display = 'block'
    btnWrapper.style.display = 'none'
    resetGame()
})

const resetGame = () => {
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

    possibleCombinations = []
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            possibleCombinations.push([i, j])
        }
    }
}

const checkIsVictory = () => {
    if (isVictory(arr)) {
        if (isVictory(arr) === draw) {
            winner.innerText = `победила ${isVictory(arr)}`
        } else {
            winner.innerText = `победил ${isVictory(arr)}`
        }

        setTimeout(() => {
            resetBtn.parentElement.style.display = 'flex'
        }, 500)

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

const moveBot = () => {

    if (possibleCombinations.length) {
        let randNum = Math.floor(Math.random() * possibleCombinations.length)
        item.forEach(el => {
            if (possibleCombinations[randNum][0] === +el.dataset.row && possibleCombinations[randNum][1] === +el.dataset.col) {
                el.innerText = 'o'
                arr[el.dataset.row][el.dataset.col] = 1
            }
        })
        possibleCombinations = possibleCombinations.filter(item => {
            return item[0] !== possibleCombinations[randNum][0] || item[1] !== possibleCombinations[randNum][1]
        })
        checkIsVictory()
    }
}

const handlerChangeValue = (e) => {
    if (e.currentTarget.innerText === '') {
        count += 1
        if (count % 2 === 0 && isPlayWithPerson) {
            e.currentTarget.innerText = 'o'
            arr[e.target.dataset.row][e.target.dataset.col] = 1
        } else {
            e.currentTarget.innerText = 'x'
            arr[e.target.dataset.row][e.target.dataset.col] = -1
        }
        if (!isPlayWithPerson) {
            possibleCombinations = possibleCombinations.filter(el => {
                return el[0] !== +e.target.dataset.row || el[1] !== +e.target.dataset.col
            })
            setTimeout(() => {
                moveBot()
            }, 200)

        }
    }
    checkIsVictory()
}

const item = document.querySelectorAll('span')
item.forEach((el) => {
    el.addEventListener('click', handlerChangeValue)
})

resetBtn.addEventListener('click', resetGame)
