const cardsContainer = document.querySelector('.cards__container')

const url = `https://rickandmortyapi.com/api/character/`
let nextUrl = null

const btnLoadMoreChars = document.querySelector('button').addEventListener('click', loadMoreChars)

const specie = document.querySelector('#species')
const gender = document.querySelector('#gender')
const statusFilter = document.querySelector('#status')

specie.addEventListener('input', filterCharacters)
gender.addEventListener('input', filterCharacters)
statusFilter.addEventListener('input', filterCharacters)


function fetchDatas(url) {
    console.log(url)
    fetch(url)
        .then(res => res.json())
        .then(res => {
            console.log(res)
            nextUrl = res.info.next
            createCard(res.results)
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
        console.log(newUrl)
    } else {
        newUrl = url
    }

    fetchDatas(newUrl)
}

function createCard(characters) {

    characters.forEach((char) => {
        const card = document.createElement('div')
        card.classList.add('card--character')
        card.classList.add('card')

        const a = document.createElement('a')
        a.setAttribute('href', `/character/${char.id}`)

        const img = document.createElement('img')
        img.setAttribute('alt', `${char.name} photo`)
        img.setAttribute('src', `${char.image}`)

        const div = document.createElement('div')

        const h3 = document.createElement('h3')
        h3.textContent = char.name

        const p = document.createElement('p')
        p.textContent = char.species


        card.appendChild(a)
        a.appendChild(img)
        card.appendChild(div)
        div.appendChild(h3)
        div.appendChild(p)


        cardsContainer.appendChild(card)
    })
}

fetchDatas(url)








