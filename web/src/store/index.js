import { createStore } from 'vuex'
import ModuleUser from "@/store/user";
import ModuleBattle from "@/store/battle";
import record from "@/store/record";

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
        battle: ModuleBattle,
        record: record
    }
})
