import runtimeMethods from "./module/runtimeMethods.js"

class UI {
    body
    main

    constructor() {
        this.body = document.querySelector('body')
        this.main = document.querySelector('section.main')
    }
}

export default new UI

export class ErrorUI extends UI {
    constructor() { super() }

    offline() {
        this.main.classList.add("offline")

        let div = `<div class="__offline">
            <div class="icon"><i class='bx bx-wifi-off'></i></div>
            <div class="message">
                <div class="title">Yo're offline :(</div>
                <div class="subtite">- Yo're in offline mode, please connect to internet to access all of the feature -</div>
                <div class="code">code: 12029</div>
            </div>
        </div>`
        this.main.insertAdjacentHTML("beforeend", div)

    }
}

export class WeaterWidget extends UI {
    constructor() { super() }
    
    renderWetherUI(data) {

        const rootParrent = document.querySelector('.weather_widget')
        const currentTemp = {
            parrent: document.querySelector('.__current_temperature'),
            child: {
                temp: document.querySelector('.temp')
            }
        }
        const clientLocationCurrentWeather = {
            parrent: document.querySelector('.__client_location-__current_weather'),
            child: {
                clientPosition: document.querySelector('._client_location'),
                currentWeather: document.querySelector('.__current-weather')
            }
        }
        const currentWeatherIcon = document.querySelector('.__weather_icon img')
        
        currentTemp.child.temp.innerHTML = Math.round(data.main.temp)
        clientLocationCurrentWeather.child.clientPosition.innerHTML = data.name
        clientLocationCurrentWeather.child.currentWeather.innerHTML = data.weather[0].main

        const dnPath = data.weather[0].icon.slice("")
        currentWeatherIcon.src = `./img/weather/${dnPath[2]}/${data.weather[0].icon}.png`
    }
    DailyWeatherUI(data) {
        const dailyWeatherCard = document.querySelector('.__hourly_weather')

        for (let i = 0; i < 5; i++) {
            const card = `<div class="__hourly_card">
                            <div class="__time">${moment(data.list[i].dt_txt).format("HH:mm")}</div>
                            <div class="_icon"><img src="./img/weather/${data.list[i].sys.pod}/${data.list[i].weather[0].icon}.png" alt=""></div>
                            <div class="_real_feals">${Math.round(data.list[i].main.temp)}&deg;</div>
                        </div>`
            dailyWeatherCard.insertAdjacentHTML("beforeend", card)
        }
    }
}

export class Notification extends UI {
    timout

    constructor() { super() }

    createNotification(message, option) {
        const notificationContainer = document.querySelector('.pop_up_notification_container')

        const _notification = document.createElement('div')
        _notification.classList.add('_notification')
        _notification.innerText = message
        notificationContainer.appendChild(_notification)

        setTimeout(() => {
            _notification.classList.add("show")
        }, 250)

        if (option.autoremove === true) {
            setTimeout(() => {
                this.remove()
            }, option.timeout);
        }

    }
    remove() {
        const _notification = document.querySelector('._notification')
        _notification.classList.remove('show')
        setTimeout(() => {
            _notification.remove()
        }, 250);
    }
}

export class TopStoriesNews extends UI {
    #container = document.querySelector('.news-list')
    #topStories = document.querySelector(".top-stories")
    constructor() { super() }

    topHeadlinesUI(data) {

        const ui = `<div class="top-stories">
                        <div class="title">Top stories</div>
                        <div class="top-stories-list">
                            <div class="top">
                                <div class="_0_news__first_news">
                                    <div class="news__card">
                                        <div class="__thumb"><img src="${data.articles[0].urlToImage}" alt=""></div>
                                        <div class="__news_provider">
                                            <div class="__provider_name">${data.articles[0].source.name}</div>
                                        </div>
                                        <div class="__news_title"><a href="${data.articles[0].url}">${data.articles[0].title}</a></div>
                                        <div class="__posted_on">${runtimeMethods.calculateDate(data.articles[0].publishedAt)}</div>
                                    </div>
                                </div>
                                <div class="_news__next">
                                    <div class="_news_card">

                                    </div>
                                </div>
                            </div>
                            <div class="other">
                                <div class="more_news_card">
                                    
                                </div>
                            </div>
                        </div>
                    </div>`
        this.#container.insertAdjacentHTML("beforeend", ui)
        const otherTopHeadlines = document.querySelector("._news_card") 
        const moreHeadlines = document.querySelector(".more_news_card")
        
        // !otherTopHeadlines
        for(let i = 1; i < 4; i++) {
            const cards = `<div class="_news">
                                <div class="_news_provider">
                                    <div class="_provider_name">${data.articles[i].source.name}</div>
                                </div>
                                <div class="_news_title"><a href="${data.articles[i].url}">${data.articles[i].title}</a></div>
                                <div class="_posted_on">${runtimeMethods.calculateDate(data.articles[i].publishedAt)}</div>
                            </div>`
            otherTopHeadlines.insertAdjacentHTML("beforeend", cards)
        }
        for (let i = 5; i < data.articles.length; i++) {
            const cards = `<div class="_news">
                                <div class="__thumb"><img src="${data.articles[i].urlToImage}" alt=""></div>
                                <div class="_news_provider">
                                    <div class="_provider_name">${data.articles[i].source.name}</div>
                                </div>
                                <div class="_news_title"><a href="${data.articles[i].url}">${data.articles[i].title}</a></div>
                                <div class="_posted_on">${runtimeMethods.calculateDate(data.articles[i].publishedAt)}</div>
                            </div>`
            moreHeadlines.insertAdjacentHTML("beforeend", cards)
        }
    }

    searchNewsUI(data, q) {

        const contain = document.querySelector(".news-list").contains(document.querySelector(".top-stories")) 
        if (contain) document.querySelector(".top-stories").remove()
        
        const ui = `<div class="_news_list">
        <div class="topic-title"></div>
        <div class="_topic_results">

        </div>
        </div>`
        const newslistContain = document.querySelector(".news-list").contains(document.querySelector("._news_list"))
        if (!newslistContain) this.#container.insertAdjacentHTML("beforeend", ui)
        
        let newsList = {
            parent: document.querySelector('._news_list'),
            child: {
                topic_title: document.querySelector('.topic-title'),
                topic_result: document.querySelector('._topic_results')
            }
        }

        newsList.child.topic_result.innerHTML = ""
        newsList.child.topic_title.innerText = q

        if (newsList.child.topic_result.childNodes.length < 0) newsList.parent.remove()

        for (let i = 0; i < 21; i++) {
            const result = `<div class="news_card">
                                <div class="_news_provider">
                                    <div class="_provider_name">${data.articles[i].source.name}</div>
                                </div>
                                <div class="__news_content">
                                    <div class="__news_title"><a href="${data.articles[i].url}">${data.articles[i].title}</a></div>
                                    <div class="__news_thumb"><img src="${data.articles[i].urlToImage}" alt=""></div>
                                </div>
                                <div class="_posted_on">${runtimeMethods.calculateDate(data.articles[i].publishedAt)}</div>
                            </div>`
            newsList.child.topic_result.insertAdjacentHTML("beforeend", result)       
        }
    }
}