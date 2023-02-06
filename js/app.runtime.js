import ui, { Notification, ErrorUI } from "./ui.js"
import weather from "./weather.js"
import news from "./news.js"
import runtimeMethods from "./module/runtimeMethods.js"

const Notifications = new Notification
const error = new ErrorUI

class Runtime {
    constructor() {
        this.TodayDate()
        this.ClientOnlineStatus()
        weather.getCurrentClientWeather()
        weather.get5DayWeatherForcats()
        this.UserLocation()
    }
    
    TodayDate() {
        const date = moment().format("dddd, MMMM DD")
        let today = document.querySelector('.today')
        today.innerHTML = date
    }
    async UserLocation() {

        if (!localStorage.getItem("client_ip")) {
            await runtimeMethods.getUserIPInfo()
        }
        
        let data = JSON.parse(localStorage.getItem("client_ip"))
        
        const location = document.querySelector(".location")
        const lang = document.querySelector(".lang")

        location.innerHTML = data.country.native_name
        lang.innerHTML = data.country.language.name

        lang.setAttribute("data-lang", data.country.language.iso_code)
        location.setAttribute("data-country", data.country.iso_code)
    }

    ClientOnlineStatus() {
        if (!navigator.onLine) {
            Notifications.createNotification("You're offline, some other feature may not works", {
                autoremove: true,
                timeout: 5000
            })
            error.offline()
            
        } else {
            news.getTopHeadlines()
        }
        
        window.addEventListener("online", () => {
            Notifications.createNotification("Welcome back", {
                autoremove: true,
                timeout: 5000
            })
            news.getTopHeadlines()
            weather.getCurrentClientWeather()
            ui.main.classList.remove("offline")
            const __offline = document.querySelector('.__offline').remove()
        })
        window.addEventListener("offline", () => {
            Notifications.createNotification("Yo're disconected from internet", {
                autoremove: true,
                timeout: 5000
            })
        })
    }

}

export default new Runtime