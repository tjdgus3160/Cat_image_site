export default class DetailModal {
    constructor({ $target }) {
        this.isVisible = false
        this.data = null
        this.modalWrapper = document.createElement('section')
        this.modalWrapper.className = 'modal-wrapper'
        this.modalWrapper.classList.add('hidden')

        $target.appendChild(this.modalWrapper)

        this.render()
    }

    toggleModal() {
        this.isVisible = !this.isVisible

        const modal = document.querySelector('.modal-wrapper')
        modal.classList.toggle('hidden')
    }

    setState(data) {
        this.toggleModal()
        this.data = data
        this.render()
    }

    onClose() {
        this.toggleModal()
        this.data = null
        this.modalWrapper.innerHTML = ''
    }

    render() {
        if (!this.isVisible) return

        const { url, name, origin, temperament } = this.data

        const overlay = document.createElement('div')
        overlay.className = 'overlay'

        const modalContents = document.createElement('section')
        modalContents.className = 'modal-contents'

        const modalHeader = document.createElement('header')
        modalHeader.className = 'modal-header'

        const modalBody = document.createElement('div')
        modalBody.className = 'modal-body'

        const modalImage = document.createElement('img')
        modalImage.className = 'modal-image'
        modalImage.src = url

        const modalName = document.createElement('p')
        modalName.className = 'modal-name'
        modalName.innerText = name

        const modalOrigin = document.createElement('p')
        modalOrigin.className = 'modal-origin'
        modalOrigin.innerText = origin

        const modalTemperament = document.createElement('p')
        modalTemperament.className = 'modal-temperament'
        modalTemperament.innerText = temperament

        const closeBtn = document.createElement('span')
        closeBtn.className = 'close-btn'
        closeBtn.innerText = 'X'

        closeBtn.addEventListener('click', () => {
            this.onClose()
        })
        overlay.addEventListener('click', () => {
            this.onClose()
        })
        window.addEventListener('keyup', (event) => {
            if (event.keyCode == 27 && this.isVisible) {
                this.onClose()
            }
        })

        modalHeader.appendChild(closeBtn)
        modalBody.appendChild(modalImage)
        modalBody.appendChild(modalName)
        modalBody.appendChild(modalOrigin)
        modalBody.appendChild(modalTemperament)

        modalContents.appendChild(modalHeader)
        modalContents.appendChild(modalBody)

        this.modalWrapper.appendChild(overlay)
        this.modalWrapper.appendChild(modalContents)
    }
}
