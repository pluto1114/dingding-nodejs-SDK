import Vue from 'vue'
import Vuex from 'vuex'
import { api } from './api'

const remote = process.env.VUE_APP_REMOTE == '1'

const HOST = process.env.VUE_APP_IP

Vue.use(Vuex)
if (!remote) {
  localStorage.ddKey = 'pluto1114'
}
export default new Vuex.Store({
  state: {
    host: HOST,
    remote:remote,
    dduser: remote ? null : { userid: 'manager8036', upDepart:319411090, name: '高健', mobile: '18698401720', avatar: 'https://static.dingtalk.com/media/lADPBbCc1a_esH_NAkDNAkA_576_576.jpg', points: '16', leader: true, point:0, god:1, ukey:'nmlt', },
    // dduser: null,
  },
  mutations: {
    updateDduser(state, payload) {
      state.dduser = payload
    },
    updateJsconfig(state, payload) {
      state.jsconfig = payload
    },
  },
  actions: {
    /* dingding相关 */
    fetchCorpid(context, payload) {
      console.log('corpid', `${HOST}/v1/dd/corpid`)
      return api(`${HOST}/v1/dd/corpid`)
    },
    fetchUserinfo(context, payload) {
      return api(`${HOST}/v1/dd/userinfo?code=${payload.code}`)
    },   
    fetchJsconfig({ state }, payload) {
      return api(`${HOST}/v1/dd/jsconfig`, { params: payload })
    },

    fetchMyOrderCount(context, payload) {
      return api(`${HOST}/v1/order/count`, { params: payload })
    },
    fetchOrderList(context, payload) {
      return api(`${HOST}/v1/order/index`, { params: payload })
    },
    saveOrder(context, payload) {
      return api(`${HOST}/v1/order/save`, { method:'post', data: payload })
    },
    finishOrder(context, payload) {
      return api(`${HOST}/v1/order/finish`, { method:'put', data: payload })
    },
  }
})
