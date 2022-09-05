const ModuleLocalBattle = {
    state: {
        game_status: "",
        a_status: "",
        b_status: "",
    },
    getters: {
    },
    mutations: {
        updateGameStatus(state, status) {
            state.game_status = status
        },
        updateAStatus(state, status) {
            state.a_status = status
        },
        updateBStatus(state, status) {
            state.b_status = status
        }
    },
    actions: {
    },
    modules: {
    }
}

export default ModuleLocalBattle;