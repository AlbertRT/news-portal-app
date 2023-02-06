class Theme {
    #icon = document.querySelector(".theme_swither .bx")

    dark() {
        this.#icon.classList.remove("bx-sun")
        this.#icon.classList.add("bx-moon")
        document.body.classList.remove("theme__dark")

        const allChildEl = document.querySelectorAll("*").forEach(child => {
            child.classList.remove("dark__theme")
        })
    }
    light() {
        this.#icon.classList.remove("bx-moon")
        this.#icon.classList.add("bx-sun")
        document.body.classList.add("theme__dark")

        const allChildEl = document.querySelectorAll("*").forEach(child => {
            child.classList.add("dark__theme")
        })
    }
}

export default new Theme