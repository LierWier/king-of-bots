export default {
    state: {
        is_record: false,
        a_photo: "",
        b_photo: "",
        a_username: "",
        b_username: "",
        a_steps: "",
        b_steps: "",
        record_loser: ""
    },
    getters: {
    },
    mutations: {
        updateIsRecord(state, is_record) {
            state.is_record = is_record
        },
        // updateSteps(state, data) {
        //     state.a_steps = data.a_steps
        //     state.b_steps = data.b_steps
        // },
        updateRecordInfo(state, data) {
            state.a_photo = data.a_photo
            state.b_photo = data.b_photo
            state.a_username = data.a_username
            state.b_username = data.b_username
            state.a_steps = data.a_steps
            state.b_steps = data.b_steps
        },
        updateRecordLoser(state, loser) {
            state.record_loser = loser
        }
    },
    actions: {
    },
    modules: {
    }
}