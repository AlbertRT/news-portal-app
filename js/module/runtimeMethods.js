class RuntimeMethods {
    getLocalStorageItem(key) {
        localStorage.getItem(key)
    }
    localstorageStore(key, data) {
        localStorage.setItem(key, data)
    }
    removeLocalStorageItem(key) {
        localStorage.removeItem(key)
    }
    getClientGeoLocation(option) {
        return new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject, option)
        })
    }
    calculateDate(date) {
        const arrayDate = moment(date).toArray()
        let result = moment(arrayDate).fromNow()
        
        return result
    }
    async getUserIPInfo() {
        let data = await fetch('https://api.geoapify.com/v1/ipinfo?apiKey=7b82e79854a54c3ba7c02fc89f422648')

        let response = await data.json()
        // store to localstorage
        let localStorageData = {
            country: {
                iso_code: response.country.iso_code,
                name: response.country.name,
                native_name: response.country.name_native,
                language: {
                    iso_code: response.country.languages[0].iso_code,
                    name: response.country.languages[0].name,
                    native_name: response.country.languages[0].name_native
                }
            },
            ip: response.ip
        }
        localStorage.setItem("client_ip", JSON.stringify(localStorageData))
    }
}

export default new RuntimeMethods