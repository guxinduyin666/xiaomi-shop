<template>
    <div class="shoppingCart container">
        <Breadcrumb title="购物车"></Breadcrumb>
        <div class="page-title-normal">
            <div class="page-title-h2">
                <h2>我的购物车</h2>
            </div>
        </div>
        <div class="item-list-wrap">
            <div class="cart-item">
                <div class="cart-item-head">
                    <ul>
                        <li>商品</li>
                        <li>单价</li>
                        <li>数量</li>
                        <li>小计</li>
                        <li>操作</li>
                    </ul>
                </div>
                <ul class="cart-item-list">
                    <li v-for="product in producctList" :key="product.producctId">
                        <div class="cart-tab-1">
                            <div class="cart-item-check">
                                <el-checkbox v-model="product.checked"></el-checkbox>
                            </div>
                            <div class="cart-item-pic">
                                <img :src="product.productImage" alt="" style="width:100%;">
                            </div>
                            <div class="cart-item-title">
                                <div class="item-name">{{product.productName}}</div>
                            </div>
                        </div>
                        <div class="cart-tab-2">
                            <div class="item-price">{{product.salePrice|currency}}</div>
                        </div>
                        <div class="cart-tab-3">
                            <div class="item-quantity">
                                <el-input-number v-model="product.num" @change="handleChange" :min="1"
                                                 :max="10"></el-input-number>
                            </div>
                        </div>
                        <div class="cart-tab-4">
                            <div class="item-price-total">{{product.totalPrice|currency}}</div>
                        </div>
                        <div class="cart-tab-5">
                            <div class="cart-item-opration">
                                <i class="el-icon-delete"></i>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="cart-foot-wrap">
            <div class="cart-foot-inner clearfix">
                <div class="cart-foot-l">
                    <div class="item-all-check">
                        <el-checkbox v-model="checkAll" label="全选"></el-checkbox>
                    </div>
                </div>
                <div class="cart-foot-r">
                    <div class="item-total">
                        总价：<span class="total-price">{{totalPrice|currency}}</span>
                    </div>
                    <div class="btn-wrap">
                        <a href="" class="btn btn--red">去结算</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
    import Breadcrumb from '@/components/Breadcrumb.vue';
    import User from "../API/user";

    export default {
        name: 'shoppingCart',
        data() {
            return {
                producctList: [],
                checkAll: false
            }
        },
        components: {
            Breadcrumb
        },
        computed: {
            totalPrice() {
                return 99;
            },
            user() {
                return this.$store.state.user;
            }
        },
        methods: {
            handleChange() {

            },
            init() {
                let req = {userName: this.user.userName}, result;
                User.getShoppingCartList(req).then((res) => {
                    if (res.state == '0000') {
                        result = res.data;
                        this.producctList = result;
                    }
                })
            }
        },
        mounted() {
            this.init();
        }
    }
</script>
<style scoped>
    .page-title-normal {
        font-family: moderat, sans-serif;
        color: #333;
    }

    .page-title-normal h2 {
        padding: 40px 0 20px;
        font-size: 22px;
        text-transform: uppercase;
        letter-spacing: .25em;
        font-weight: 700;
    }

    .cart-item {
        display: table;
        width: 100%;
    }

    .cart-item-head {
        display: table-header-group;
        width: 100%;
    }

    .cart-item-head li {
        display: table-cell;
        height: 40px;
        line-height: 40px;
        background: #605f5f;
        color: #fff;
        text-align: center;
        text-transform: uppercase;
        font-family: moderat, sans-serif;
        letter-spacing: .25em;
    }

    .cart-item-head li:nth-child(2), .cart-item-head li:nth-child(3), .cart-item-head li:nth-child(4), .cart-item-head li:nth-child(5) {
        padding: 0 10px;
    }

    .cart-item-list {
        display: table-row-group;
    }

    .cart-item-head ul {
        display: table-row;
        width: 100%;
    }

    .el-icon-delete {
        font-size: 22px;
        cursor: pointer;
    }

    .cart-item-list > li {
        position: relative;
        display: table-row;
        padding: 32px 0;
        background: #fff;
    }

    .cart-item-list .cart-tab-1 {
        min-height: 72px;
        padding: 32px 0;
        text-align: left;
        border-left: 1px solid #e9e9e9;
    }

    .cart-item-list .cart-item-check {
        float: left;
        padding: 30px 0 0 20px;
    }

    .cart-foot-wrap .cart-foot-inner:after {
        visibility: hidden;
        display: block;
        content: " ";
        clear: both;
    }

    .cart-item-list .cart-item-pic {
        float: left;
        width: 80px;
        height: 80px;
        margin-left: 20px;
        border: 1px solid #e9e9e9;
        overflow: hidden;
    }

    .cart-item-list .cart-item-title {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        min-height: 76px;
        padding: 0 20px;
        -ms-flex-wrap: wrap;
        flex-wrap: wrap;
    }

    .cart-item-list .cart-item-title .item-name {
        width: 100%;
        line-height: 76px;
        color: #000;
        font-family: moderat, sans-serif;
        font-weight: 700;
    }

    .cart-item-list .cart-tab-2 {
        padding-top: 64px;
    }

    .cart-item-list .item-price-total {
        color: #d1434a;
        font-size: 16px;
    }

    .cart-item-list > li > div {
        position: relative;
        display: table-cell;
        text-align: center;
        vertical-align: top;
        border-bottom: 1px solid #e9e9e9;
        height: 100%;
    }

    .cart-item-list .item-price {
        font-size: 16px;
        color: #333;
    }

    .cart-item-list .cart-tab-3 {
        padding-top: 48px;
    }

    .cart-item-list .cart-tab-4 {
        padding-top: 64px;
    }

    .cart-item-list .cart-tab-5 {
        padding-top: 62px;
        border-right: 1px solid #e9e9e9;
    }

    .cart-foot-wrap {
        margin-top: 20px;
        background: #fff;
        border: 1px solid #e9e9e9;
        font-size: 16px;
    }

    .cart-foot-wrap .cart-foot-l {
        float: left;
        padding: 0 22px;
        line-height: 54px;
    }

    .cart-foot-wrap .item-all-check {
        float: left;
    }

    .cart-foot-wrap .cart-foot-r {
        float: right;
    }

    .cart-foot-wrap .item-total {
        float: left;
        margin: 0 30px 0 0;
        color: #999;
        font-size: 16px;
        text-align: right;
        line-height: 54px;
    }

    .cart-foot-wrap .item-total .total-price {
        margin-left: 6px;
        color: #d1434a;
        font-size: 1.125em;
        font-weight: 700;
        line-height: 1.2;
    }

    .cart-foot-wrap .btn-wrap, .cart-foot-wrap .next-btn-wrap {
        float: right;
    }

    .btn {
        height: 55px;
        line-height: 54px;
        padding: 0 10px;
        text-decoration: none;
    }

    .btn, .btn[href] {
        display: inline-block;
        text-align: center;
        font-size: 14px;
        font-family: moderat, sans-serif;
        font-weight: 700;
        border: 1px solid #d1434a;
        color: #d1434a;
        text-transform: uppercase;
        letter-spacing: .25em;
        white-space: nowrap;
    }

    .btn--red, .btn--red[href] {
        background-color: #d1434a;
        border-color: #d1434a;
        color: #fff;
    }

    .btn--red:hover, .btn--red[href]:hover {
        background-color: #f16f75;
        border-color: #f16f75;
        color: #fff;
    }
</style>
