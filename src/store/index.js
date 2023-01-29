import {createStore} from 'vuex'
import weathers from './modules/weathers'

export default createStore({
   modules: {
      weathers,
   }
})
