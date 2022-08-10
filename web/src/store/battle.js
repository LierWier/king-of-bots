const ModuleBattle = {
    state: {
        status: "matching",
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        game_map: null
    },
    getters: {
    },
    mutations: {
        updateSocket(state, socket) {
            state.socket = socket
        },
        updateOpponent(state, opponent) {
            state.opponent_username = opponent.username
            state.opponent_photo = opponent.photo
        },
        updateStatus(state, status) {
            state.status = status
        },
        updateGameMap(state, gameMap) {
            state.game_map = gameMap
        }
    },
    actions: {
    },
    modules: {
    }
}

export default ModuleBattle;