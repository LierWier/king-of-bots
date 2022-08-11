const ModuleBattle = {
    state: {
        status: "matching",
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        game_map: null,
        playerA: {
            id: 0, sx: 0, sy: 0
        },
        playerB: {
            id: 0, sx: 0, sy: 0
        },
        gameObject: null
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
        updateGame(state, game) {
            state.game_map = game.map
            state.playerA.id = game.a_id
            state.playerA.sx = game.a_sx
            state.playerA.sy = game.a_sy
            state.playerB.id = game.b_id
            state.playerB.sx = game.b_sx
            state.playerB.sy = game.b_sy
        },
        updateGameObject(state, gameObject) {
            state.gameObject = gameObject
        }
    },
    actions: {
    },
    modules: {
    }
}

export default ModuleBattle;