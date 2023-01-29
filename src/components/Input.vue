<template>
    <div>
        <input v-model="search" @input="handleInput" />
        <ul>
            <li v-for="city in filteredCities" :key="city.id">{{ city.name }}</li>
        </ul>
    </div>
</template>
  
  <script>
  import { mapState } from 'vuex';
  
  export default {
    name: 'InputAutocomplete',

    data() {
      return {
        search: ''
      };
    },
    computed: {
      ...mapState(['cities']),
     
    },
    methods: {
      handleInput() {
        this.$store.dispatch('searchCities', this.search);
      },
       filteredCities() {
        // return this.cities.filter(city => city.name.startsWith(this.search));
        console.log(this.cities);
      }
    }
  };
  </script>
  