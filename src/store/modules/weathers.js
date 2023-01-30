import axios from "axios"

export default {
    state: {
        weathers : [],
        currentCity: {},
    },

    getters: {
        allWeathers: (state) => state.weathers,
        currentCity: (state) => state.currentCity
    },
    
    mutations: {
        add_weathers(state, weatherInfo) {
            state.weathers.push(weatherInfo)
        },
        current_city(state, currentWeather) {
            state.currentCity = currentWeather
        },
        update_weathers(state, weathers) {
            state.weathers = weathers
        }
    }, 

    actions: {
        getWeather({commit}, cityName) {
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=5b8d267e2732b727535922ed20c4d9c4`
            ).then( data => {
                const weatherInfo = data.data
                commit("add_weathers", weatherInfo);
            })
        },
        getCurrentWeather({commit}) {   
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=lviv&lang=ru&appid=5b8d267e2732b727535922ed20c4d9c4`
            ).then( data => {

                const currentWeather = data.data
                commit("current_city", currentWeather);
            })
        },
        deteleCard({commit, state}, id) {
            var weathers = state.weathers
            var index = weathers.findIndex(item => item.id === id)
            if (weathers && index || index === 0) {
                weathers.splice(index, 1)
            }
            commit('update_weathers', weathers)
        }
    }
}