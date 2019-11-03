<template>
    <div class="card">
        <div class="pic">
            <img v-lazy="product.productImage" :alt="product.productName" ref="img">
        </div>
        <div class="main">
            <div class="name">{{product.productName}}</div>
            <div class="price">{{product.salePrice|currency}}</div>
            <div class="btn-area" @click="addShoppingCart">加入购物车</div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Card",
        props: {
            product:{
                type: Object,
                required: true
            }
        },
        methods: {
            addShoppingCart() {
                this.$emit('addShoppingCart',this.product);
            }
        }
    }
</script>

<style scoped>
    .card {
        padding: 10px;
        background: #fff;
        border: 2px solid #e9e9e9;
    }

    img {
        width: 100%;
    }

    .card:hover {
        border-color: #ee7a23;
        -webkit-transform: translateY(-5px);
        transform: translateY(-5px);
        box-shadow: 0 0 10px #999;
    }

    .main {
        padding: 10px;
    }

    .name {
        font-size: 1.2rem;
        height: 2rem;
        line-height: 1.25em;
        padding-bottom: 10px;
        font-family: moderat, sans-serif;
        font-weight: 700;
        overflow: hidden;
    }

    .price {
        line-height: 30px;
        color: #d1434a;
        font-size: 1.25rem;
    }

    .btn-area {
        margin-top: 10px;
        height: 40px;
        line-height: 40px;
        text-align: center;
        font-size: 14px;
        font-family: moderat, sans-serif;
        font-weight: 700;
        border: 1px solid #d1434a;
        color: #d1434a;
        text-transform: uppercase;
        letter-spacing: .25em;
        white-space: nowrap;
        cursor: pointer;
    }
</style>