import { WeaterWidget } from './ui.js'
import runtimeMethods from './module/runtimeMethods.js'

class Weather {
    #apiKey = '1a601a1ed61a8e6682deb2f5ac91eedd' 
    #geoLocationOption = {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
    }

    async getCurrentClientWeather() {
        
        try {
            let userIPInfo = JSON.parse(localStorage.getItem("client_ip"))

            const pos = await runtimeMethods.getClientGeoLocation(this.#geoLocationOption)
            const widget = new WeaterWidget
            
            let lon = pos.coords.longitude,
                lat = pos.coords.latitude

            const endpoint = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${this.#apiKey}&units=metric&lang=${userIPInfo.country.language.iso_code}`

            const data = await fetch(endpoint)
            
            let response = await data.json()
            widget.renderWetherUI(response)
            
        } catch (error) {
            console.log(error)
        }
    }

    async get5DayWeatherForcats() {

        try {
            const pos = await runtimeMethods.getClientGeoLocation(this.#geoLocationOption)
            
            const widget = new WeaterWidget
            
            let lon = pos.coords.longitude,
            lat = pos.coords.latitude
            
            const endpoint = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${this.#apiKey}&units=metric`
            
            const data = await fetch(endpoint)
            let response = await data.json()
            widget.DailyWeatherUI(response)
        } catch (error) {
            console.log(error)
        }

    }
}

export default new Weather