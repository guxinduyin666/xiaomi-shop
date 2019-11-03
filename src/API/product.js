import * as http from './index';

export default {
    findProductList:params=>{
        return http.GET('/product/getProductList',params)
    }
}