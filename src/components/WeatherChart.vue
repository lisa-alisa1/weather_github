<template>
    <div>
      <canvas id="chart"></canvas>
    </div>
  </template>
  
  <script>
  import Chart from 'chart.js';
  import axios from "axios"
  
  export default {
    name: 'WeatherChart',
    data() {
      return {
        chart: null,
        hours: [],
        temperatures: []
      };
    },
    mounted() {
      this.fetchWeatherData();
    },
    methods: {
       fetchWeatherData() {
          axios.get(
            `http://api.openweathermap.org/data/2.5/forecast?q=lviv&appid=5b8d267e2732b727535922ed20c4d9c4`
          ).then(response => {
            const data = response.data
            console.log(data);
            this.hours = data.list.slice(0,13).map(item => item.dt_txt.slice(11, 16));
            console.log(this.hours);
            this.temperatures = data.list.slice(0,13).map(item => item.main.temp- 273);
            console.log(data.list);
            this.renderChart();
          })
      },
      renderChart() {
        this.chart = new Chart( document.getElementById('chart'), {
          type: 'line',
          data: {
            labels: this.hours,
            datasets: [
              {
                label: 'Temperature (°C)',
                data: this.temperatures,
                borderColor: 'yellow',
                fill: true
              }
            ]
          },
          options: {
            scales: {
              y: {
                beginAtZero: false
              }
            }
          }
        });
      }
    }
  };
  </script>
  

<style>
#chart {
    margin-top: 2%;
    height: 450px !important;
    width: 950px !important;
}
</style>