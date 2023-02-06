import news from "./news.js"

class NavigationBar {
    #container = document.querySelector('.header')
    #newsTopic = document.querySelector('.header .topic-selection .topics-list .topics')

    topicSearch() {
        const topicList = this.#newsTopic.querySelectorAll('.topic')
        topicList.forEach(topic => {
            topic.addEventListener("click", () => {
                const topicQuery = topic.innerHTML
                const home = this.#newsTopic.querySelector('.home').classList.remove('active')
                const topicAttr = topic.getAttribute('data-topic')
                
                news.getEverythingNews(topicQuery)
            })
        })
    }
    home() {
        const _news_list = document.querySelector('._news_list').remove()
        news.getTopHeadlines()
    }
}

export default new NavigationBar