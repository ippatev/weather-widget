import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    state: {
        weathers: []
    },
    mutations: {
        ADD_WEATHER(state, weather) {
            state.weathers.unshift(weather)
            localStorage.setItem("list", JSON.stringify(state.weathers))
        },
        SET_WEATHERS(state, weathers) {
            state.weathers = weathers
            localStorage.setItem("list", JSON.stringify(state.weathers))
        }
    },
    actions: {
        load({ state }) {
            state.weathers = localStorage.getItem("list")
                ? JSON.parse(localStorage.getItem("list"))
                : [];
        },
        remove({ state }, cityId) {
            state.weathers = state.weathers.filter(city => city.id !== cityId)
            localStorage.setItem("list", JSON.stringify(state.weathers))
        }
    }
});

export default store