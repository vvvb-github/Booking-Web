const state = () => ({
    nickName: 'vvvb',
    icon: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=921151223,1267112089&fm=11&gp=0.jpg',
    token: null,
    email: '1405205313@qq.com',
    phone: '15850601693',
    realName: '宋一凡',
    idNumber: '10000000000000000000',
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
    },
    setEmail(state, payload) {
        state.email = payload
    },
    setPhone(state, payload) {
        state.phone = payload
    },
    setRealName(state, payload) {
        state.realName = payload
    },
    setIdNumber(state, payload) {
        state.idNumber = payload
    }
}

export default {
    namespaced: true,
    state,
    mutations
}