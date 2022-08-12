const ModuleBattle = {
    state: {
        status: "matching",
        socket: null,
        opponent_username: "",
        opponent_photo: "",
        opponent_default: {
            username: `我的对手`,
            photo: `https://cdn.acwing.com/media/article/image/2022/08/09/1_1db2488f17-anonymous.png`
        },
        game_map: null,
        playerA: {
            id: 0, sx: 0, sy: 0
        },
        playerB: {
            id: 0, sx: 0, sy: 0
        },
        gameObject: null,
        loser: "none",  // all/A/B
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
            state.playerA.id = ~~game.a_id  // 确保id都为number类型，防止以后在比较时出现bug
            state.playerA.sx = game.a_sx
            state.playerA.sy = game.a_sy
            state.playerB.id = ~~game.b_id  // 确保id都为number类型，防止以后在比较时出现bug
            state.playerB.sx = game.b_sx
            state.playerB.sy = game.b_sy
        },
        updateGameObject(state, gameObject) {
            state.gameObject = gameObject
        },
        updateLoser(state, loser) {
            state.loser = loser
        }
    },
    actions: {
    },
    modules: {
    }
}

export default ModuleBattle;