<template>
    <div class="main-container">
        <div class="logo">
            logo
        </div>
        <div class="content-wrapper">
            <div class="buttons">
                <button @click="openMain()"> Главная </button>
                <button @click="openFavorites()" style="margin-left: 5px"> Избранное </button>
            </div>

            <div class="main-block" v-if="isMain">
                <div class="flex">
                    <div>
                        <input  v-model="cityName" type="text">
                        <button @click="getWeatherInfo()">get</button>
                    </div>
                    <button>
                        В избранное 
                    </button>
                   
                </div>

                <div v-if="isWeatherGet" class="wrapper">
                    <div class="weather-block" v-for="(card, index) in this.allCard" :key="index">
                        <div class="content">
                            <!-- {{ allCard }} -->
                            <p class="city-name"> {{ card.name }}</p>
                            <div class="inline">
                                <p class="temp"> {{ Math.round(card.main.temp - 273) + '&deg;'}}</p>
                                <img :src='`http://openweathermap.org/img/wn/${card.weather[0].icon}.png`'>
                            </div>
                            
                            <p class="clouds"> {{ card.weather[0].main}}</p>
                            <p class="clouds"> {{ new Date(card.dt).toLocaleTimeString()}}</p>
                            

                            <!-- <div class="sort">
                                <div>день</div>
                                <div> на 5 дней</div>
                            </div> -->
                        </div>
                    </div>
                </div>
                
            </div>
            <div class="favorites-block" v-if="isFavorites">
                hello
            </div>
        </div>
    </div>
</template>


<script>
import { mapActions, mapGetters } from 'vuex'

export default {
    data() {
        return {
            cityName:  '',
            isWeatherGet: false,
            isMain: true,
            isFavorites: false
        }
    },
    computed: {
        ...mapGetters(['allCard']),
    },
    methods: {
        openMain() {
            this.isMain = true
            this.isFavorites = false
        },
        openFavorites() {
            this.isMain = false
            this.isFavorites = true
        },

        ...mapActions(["getWeather"]),
        getWeatherInfo() {
            this.getWeather(this.cityName).then(() => {
                this.isWeatherGet = true
            })
        }
    },
}
</script>
<style>
.logo {
    margin: 2%;
}
.main-block {
    height: 20rem;
    background-color: rgba(255, 255, 255, 0.555);
    width: 75%;
    padding: 1%;
}
.favorites-block {
        height: 10rem;
        background-color: rgba(255, 255, 255, 0.555);
        width: 50%;
        padding: 1%;
    }

.weather {
    height: 3rem;
    background-color: rgb(190, 72, 72);
    width: 40%;
    margin-top: 3%;
}

.buttons button {
    border: none;
    height: 2rem;
    width: 8%;
    border-radius:  5px 5px 0 0 ;
    background-color: rgba(255, 255, 255, 0.555);
}

.flex {
    display: flex;
    justify-content: space-between;
}

.weather-block {
    background-color: #9ec0db;
    margin-top: 2%;
    height: 12rem;
    width: 23rem;
    border-radius: 10px;
    overflow: hidden;
    margin-left: 1%;
}

.content {
    width: 100%;
    padding: 3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
}

.content p {
    margin: 1%;
}
 .sort {
    display: flex;
 }
.sort div {
    height: 1.5rem;
    width: 20%;
    background: none;
    display: flex;
    align-items: center;
    justify-content: center;
}

    
.wrapper {
    display: flex;
}

.inline {
    display: flex;
    align-items: center;
}
</style>