import { setItem } from '../util/sessionStorage.js'

export default class SearchingSection {
    constructor({ $target, keywords, onSearch, onRandom }) {
        this.recent = keywords
        this.onSearch = onSearch
        this.onRandom = onRandom
        this.section = document.createElement('section')
        this.section.className = 'searching-section'

        $target.appendChild(this.section)

        this.render()
    }

    addRecentKeyword(keyword) {
        if (this.recent.includes(keyword)) return
        if (this.recent.length == 5) {
            this.recent.shift()
        }
        this.recent.push(keyword)
        setItem('keywords', this.recent)

        this.render()
    }

    render() {
        this.section.innerHTML = ''

        const randomBtn = document.createElement('span')
        randomBtn.className = 'random-btn'
        randomBtn.innerText = '🐱'

        const wrapper = document.createElement('div')
        wrapper.className = 'search-box-wrapper'

        const searchBox = document.createElement('input')
        searchBox.className = 'search-box'
        searchBox.placeholder = '고양이를 검색하세요.'

        const recentKeywords = document.createElement('div')
        recentKeywords.className = 'recent-keywords'

        this.recent.map((keyword) => {
            const link = document.createElement('span')
            link.className = 'keyword'
            link.innerText = keyword

            link.addEventListener('click', () => {
                this.onSearch(keyword)
            })

            recentKeywords.appendChild(link)
        })

        randomBtn.addEventListener('click', this.onRandom)
        searchBox.addEventListener('focus', function () {
            searchBox.value = ''
        })
        searchBox.addEventListener('keyup', (event) => {
            if (event.keyCode == 13 && searchBox.value.length > 0) {
                this.addRecentKeyword(searchBox.value)
                this.onSearch(searchBox.value)
            }
        })

        wrapper.appendChild(searchBox)
        wrapper.appendChild(recentKeywords)

        this.section.appendChild(randomBtn)
        this.section.appendChild(wrapper)
    }
}
