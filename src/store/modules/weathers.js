import axios from "axios"

export default {
    state: {
        weathers : [],
        currentCity: {}
    },
    getters: {
        allWeathers: (state) => state.weathers,
        currentCity: (state) => state.currentCity
    },
    
    mutations: {
        update_weathers(state, weatherInfo) {
            state.weathers.push(weatherInfo)
            console.log(state.weathers);
        },
        current_city(state, currentWeather) {
            state.currentCity = currentWeather
        }
    },

    actions: {
        getWeather({commit}, cityName) {
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=5b8d267e2732b727535922ed20c4d9c4`
            ).then( data => {

                const weatherInfo = data.data
                commit("update_weathers", weatherInfo);
            
                console.log(weatherInfo);
            })
        },
        getCurrentWeather({commit}) {
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=lviv&lang=ru&appid=5b8d267e2732b727535922ed20c4d9c4`
            ).then( data => {

                const currentWeather = data.data
                commit("current_city", currentWeather);
            
                console.log(currentWeather);
            })
        }
    }
}