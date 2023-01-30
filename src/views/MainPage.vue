<template>
    <div class="main-container">
        <div class="logo">
            <img src="../assets/logo.png" alt="">
            <p> Weather forecast </p>
        </div>

        <div class="content-wrapper">
            <div class="buttons">
                <button @click="openMain()"> Главная </button>
                <button @click="openFavorites()" style="margin-left: 5px"> Избранное </button>
            </div>
            <div class="main-block" v-if="isMain">
                <div class="flex">
                    <div>
                        <input class="city-input" type="text" v-model="cityName" placeholder="Введите название города"/>
                        <img class="plus" @click="getWeatherInfo()" src="../assets/plus.png">
                    </div>
                </div>
                  
                <div v-if="isWeatherGet" class="wrapper">
                     <div class="weather-block">
                        <div class="content">
                            <p class="city-name"> {{ currentCity.name}} </p>
                            <div class="inline">
                                <p class="temp"> 
                                    {{ Math.round(currentCity.main.temp - 273) + '&deg;'}}
                                </p>
                                <img :src='`http://openweathermap.org/img/wn/${currentCity.weather[0].icon}.png`'>
                            </div>
                            <p class="clouds"> 
                                {{ currentCity.weather[0].main}} 
                            </p>
                            <p class="clouds"> 
                                {{ new Date(currentCity.dt * 1000).toLocaleTimeString() }} | {{ new Date(currentCity.dt * 1000).toLocaleDateString() }}
                            </p> 
                        </div>
                    </div>

                    <div class="weather-block" v-for="(city, index) in this.allWeathers" :key="index">
                        <div class="content">
                            <img id="close"  src="../assets/close.png" alt="" @click="this.deleteCard(city.id)" >
                            <p class="city-name"> {{ city.name }}</p>
                            <div class="inline">
                                <p class="temp"> {{ Math.round(city.main.temp - 273) + '&deg;'}}</p>
                                <img :src='`http://openweathermap.org/img/wn/${city.weather[0].icon}.png`'>
                            </div>
                            <p class="clouds"> {{ city.weather[0].main}}</p>
                            <p class="clouds"> 
                                {{ new Date(city.dt * 1000).toLocaleTimeString() }} | {{ new Date(city.dt * 1000).toLocaleDateString() }}
                            </p> 
                          
                        </div>
                    </div>
                </div>

                <div class="chart-wrapper">
                    <WeatherChart />
                </div>
            </div>
            <div class="favorites-block" v-if="isFavorites"></div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex'
import  WeatherChart  from '@/components/WeatherChart.vue'

export default {
    components: {
        WeatherChart
    },
    mounted() {
        this.getCurrentWeather().then(() => {
            this.isWeatherGet = true
        })
    },
    data() {
        return {
            isWeatherGet: false,
            isMain: true,
            isFavorites: false,
            cityName: '',
        }
    },
    computed: {
        ...mapGetters(['allWeathers', 'currentCity']),
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

        ...mapActions(["getWeather", 'getCurrentWeather', 'deteleCard']),
        getWeatherInfo() {
            this.getWeather(this.cityName).then(() => {
                this.isWeatherGet = true
                this.cityName = ''
            })
        },
        deleteCard(id) {
            this.deteleCard(id)
        }
    },
}
</script>


<style>

.logo {
    margin: 2% 2% 1% 1%;
    display: flex;
    align-items: center;
}
.logo img {
    height: 4rem;
    margin-right: 1%;
}
.logo p {
    font-size: 26px;
    font-weight: 500;
}
.main-block {
    height: 47rem;
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
.favorites-img {
    height: 2rem;
    margin-left: 1%;
}
.flex {
    display: flex;
    justify-content: space-between;
}

.flex button {
    height: 2rem;
    width: 9%;
    text-align: center;
    font-size: 15px;
    border: none;
    border-radius: 5px;
}

.flex > div {
    align-items: center;
    display: flex;
    width: 18%;
}

.weather-block {
    background-color: #287cbf2e;
    margin-top: 2%;
    height: 13rem;
    width: 23rem;
    border-radius: 10px;
    overflow: hidden;
    margin-left: 1%;
    box-shadow: 8px 5px 5px #194d772e;
}

.content {
    width: 100%;
    padding: 3%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: relative;
}

.content p {
    margin: 1%;
    font-size: 20px;
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

.city-input {
    border: none;
    height: 2rem;
    width: 80%;
    border-radius: 5px;
    margin-right: 4%;
    padding-left: 7px;
}

.plus {
    background: none;
    border: none;
    height: 22px;
}

#close {
    height: 1rem;
    position: absolute;
    left: 87%;
    bottom: 82%;
}
</style>