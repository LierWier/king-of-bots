import { createStore } from 'vuex'
import ModuleUser from "@/store/user";
import ModuleBattle from "@/store/battle";

export default createStore({
    state: {
    },
    getters: {
    },
    mutations: {
    },
    actions: {
    },
    modules: {
        user: ModuleUser,
        battle: ModuleBattle
    }
})
