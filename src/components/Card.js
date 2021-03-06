export default class Card {
    constructor({ $target, data }) {
        this.data = data
        this.card = document.createElement('article')
        this.card.className = 'cat-card'
        this.card.dataset.id = data.id

        $target.appendChild(this.card)

        this.render()
    }

    render() {
        const { url, name } = this.data

        const cardImage = document.createElement('img')
        cardImage.className = 'card-image'
        cardImage.classList.add('lazy')
        cardImage.src = url

        const catName = document.createElement('p')
        catName.className = 'cat-name'
        catName.innerText = name

        this.card.appendChild(cardImage)
        this.card.appendChild(catName)
    }
}
