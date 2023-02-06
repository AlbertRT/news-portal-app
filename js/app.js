import runtime from './app.runtime.js'
import news from './news.js'
import navigationBar from './navigation.bar.js'
import theme from './theme.js'

runtime

const searchBar = document.querySelector('#searchNews')
searchBar.addEventListener("keyup", e => {
    if (e.key !== "Enter") return
    news.getEverythingNews(searchBar.value)
})

const themeSwitcher = document.querySelector('.theme_swither')
themeSwitcher.addEventListener('click', () => {
    const icon = themeSwitcher.querySelector(".bx")

    if (icon.classList.contains("bx-moon")) {
        theme.light()
    } else if (icon.classList.contains("bx-sun")) {
        theme.dark()
    } else {
        return
    }
})

const home = document.querySelector('.home')
home.addEventListener("click", () => {
    navigationBar.home()
})