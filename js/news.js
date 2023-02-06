import { TopStoriesNews } from './ui.js'
const topStories = new TopStoriesNews

class News {
    #newsapiKey = 'ff7c02949fab423eb9e124f50daaa3cd'

    async getTopHeadlines() {
        
        try {
            let userIPInfo = JSON.parse(localStorage.getItem("client_ip"))

            const data = await fetch(`https://newsapi.org/v2/top-headlines?country=${userIPInfo.country.iso_code}&apiKey=${this.#newsapiKey}`)
            const resopnse = await data.json()
            topStories.topHeadlinesUI(resopnse)
        } catch (error) {
            console.log(error)
        }
    }

    async getEverythingNews(q) {
        let userIPInfo = JSON.parse(localStorage.getItem("client_ip"))
        const url = `https://newsapi.org/v2/everything?q=${q}&apiKey=${this.#newsapiKey}&language=${userIPInfo.country.language.iso_code}`

        if (!q || q === "") return

        try {
            const data = await fetch(url)
            const response = await data.json()
            topStories.searchNewsUI(response, q)
        } catch (error) {
            console.log(error)
        }
    }
}

export default new News