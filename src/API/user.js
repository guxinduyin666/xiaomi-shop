import * as http from './index';

export default {
    login: params => {
        return http.POST('/users/login', params)
    },
    register: params => {
        return http.POST('/users/register', params)
    },
    updateShoppingCartList: params => {
        return http.POST('/users/updateShoppingCartList', params)
    },
    getShoppingCartList: params => {
        return http.POST('/users/getShoppingCartList', params)
    },
    updateReceiverInfo: params => {
        return http.POST('/users/updateReceiverInfo', params)
    }
}