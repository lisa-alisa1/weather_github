import axios from "axios"

export default {
    state: {
        cards : []
    },
    getters: {
        allCard: (state) => state.cards
    },
    mutations: {
        update_card(state, cardInfo) {
            state.cards.push(cardInfo)
            console.log(state.cards);
        }
    },
    actions: {
        getWeather({commit}, cityName) {
            axios.get(
                `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&lang=ru&appid=5b8d267e2732b727535922ed20c4d9c4`
            ).then( data => {

                const cardInfo = data.data
                commit("update_card", cardInfo);
            
                console.log(cardInfo);
            })
        }
    }
}