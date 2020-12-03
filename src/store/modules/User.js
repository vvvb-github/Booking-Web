const state = () => ({
    nickName: 'vvvb',
    icon: 'https://ss1.bdstatic.com/70cFvXSh_Q1YnxGkpoWK1HF6hhy/it/u=4053869279,3012795408&fm=11&gp=0.jpg',
    token: null
})

const mutations = {
    setNickName(state, payload) {
        state.nickName = payload
    },
    setIcon(state, payload) {
        state.icon = payload
    },
    setToken(state, payload) {
        state.token = payload
    }
}

export default {
    namespaced: true,
    state,
    mutations
}