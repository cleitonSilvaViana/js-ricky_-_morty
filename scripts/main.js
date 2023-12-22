const url = `https://rickandmortyapi.com/api/character/`
let nextUrl = null
const charactersList = []

const cardsContainer = document.querySelector('.cards__container')

const btnLoadMoreChars = document.querySelector('button')
btnLoadMoreChars.addEventListener('click', loadMoreChars)

const inputSearch = document.querySelector('#inpSearch')
inputSearch.addEventListener('input', searchPerson)

const specie = document.querySelector('#species')
specie.addEventListener('input', filterCharacters)

const gender = document.querySelector('#gender')
gender.addEventListener('input', filterCharacters)

const statusFilter = document.querySelector('#status')
statusFilter.addEventListener('input', filterCharacters)



async function fetchDatas(url) {
    fetch(url)
        .then(res => res.json())
        .then(res => {

            nextUrl = res.info.next

            if(nextUrl === null) {
                btnLoadMoreChars.classList.add('display-none')
            }

            createCard(res.results)
        })
}

function loadChars(param){
    const chars = (param) ? param : charactersList
    chars.forEach(el => {
        cardsContainer.appendChild(el)
    })
}

function loadMoreChars() {
    fetchDatas(nextUrl)
}

function clearCards() {
        cardsContainer.innerHTML = ''
}

function filterCharacters() {
    let filters = []
    let newUrl = null

    clearCards()

    if (specie.value !== 'all') filters.push(`species=${specie.value}`)
    if (gender.value !== 'all') filters.push(`gender=${gender.value}`)
    if (statusFilter.value !== 'all') filters.push(`status=${statusFilter.value}`)


    if (filters.length > 0) {
        filters = filters.join('&')
        newUrl = url + '?' + filters
    } else {
        newUrl = url
    }

    fetchDatas(newUrl)
}

function createCard(characters) {
    characters.forEach((char) => {
        const card = document.createElement('div')
        card.classList.add('card--character', 'card')

        const a = document.createElement('a')
        a.setAttribute('href', `/character/${char.id}`)

        const img = document.createElement('img')
        img.setAttribute('alt', `${char.name} photo`)
        img.setAttribute('src', `${char.image}`)

        const div = document.createElement('div')

        const name = document.createElement('h3')
        name.textContent = char.name

        const specie = document.createElement('p')
        specie.textContent = char.species

        const status = document.createElement('p')
        status.textContent = char.status
        const span = document.createElement('span')
        span.classList.add(char.status.toLowerCase(), 'circle')
        span.style.marginLeft = '8px'

        card.appendChild(a)
        a.appendChild(img)
        card.appendChild(div)
        div.appendChild(name)
        div.appendChild(specie)
        div.appendChild(status)
        status.appendChild(span)

        charactersList.push(card)
        cardsContainer.appendChild(card)
    })
}

function searchPerson() {
    if(inputSearch.value.trim() === '') return loadChars()
    clearCards()

    specie.value = 'all'
    gender.value = 'all'
    statusFilter.value = 'all'

    const characterSearch = []

    charactersList.forEach(char => {
        const name = char.querySelector('h3').textContent

        if(name.toLowerCase().includes(inputSearch.value.toLowerCase())) {
            characterSearch.push(char)
        }
    })

    loadChars(characterSearch)
}


fetchDatas(url)






