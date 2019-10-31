<template coments>
    <div class="home">
        <!--面包屑导航组件-->
        <Breadcrumb title="商品列表"></Breadcrumb>
        <div class="accessory-result-page">
            <div class="container">
                <div class="filter-nav">
                    <div class="product-name">
                        <label>商品名</label>
                        <el-input v-model="form.productName" placeholder="请输入商品名"></el-input>
                    </div>
                    <div class="product-name">
                        <label>价格区间</label>
                        <el-select v-model="form.priceLevel" placeholder="请选择价格区间">
                            <el-option label="全部" value="all"></el-option>
                            <el-option label="0-100元" value="1"></el-option>
                            <el-option label="100元-500元" value="2"></el-option>
                            <el-option label="500元-1000元" value="3"></el-option>
                            <el-option label="1000元-2000元" value="4"></el-option>
                        </el-select>
                    </div>
                    <div class="query-wrap">
                        <el-button type="primary" @click="queryProductByName">查询</el-button>
                    </div>
                </div>
            </div>
        </div>
        <div class="product-list-wrap">
            <div class="container">
                <ul class="product-list">
                    <li class="list-item" v-for="product in productList" :key="product.productId">
                        <Card :productImage="product.productImage" :name="product.productName"
                              :price="product.salePrice"></Card>
                    </li>
                </ul>
            </div>
            <div v-infinite-scroll="loadMore"
                 infinite-scroll-disabled="busy"
                 infinite-scroll-distance="100"
                 infinite-scroll-immediate-check="true"
                 style="text-align: center;">
                <img src="../assets/imgs/loading.gif" alt="" class="loading" v-show="loading">
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Breadcrumb from '@/components/Breadcrumb.vue';
    import Card from '@/components/Card.vue';
    import product from '@/API/product.js';

    export default {
        name: 'home',
        components: {
            Breadcrumb,
            Card
        },
        data() {
            return {
                form: {
                    productName: '',
                    priceLevel: ''
                },
                productList: [],
                currentPage: 1,
                busy: false,
                loading: false
            }
        },
        methods: {
            init() {
                let req = {
                    page: 1,
                    pageSize: 10
                }
                this.queryProductList(req);
            },
            queryProductList(queryObj, flag = false) {
                product.findProductList(queryObj).then(res => {
                    let result;
                    if (res.state == '0000') {
                        result = res.result;
                        result.forEach(product => {
                            product.productImage = require('../assets/imgs/' + product.productImage);
                        })
                        if (flag) {
                            this.loading = false;
                            if (result.length < 10) this.busy = true;
                            result = this.productList.concat(result);
                        }
                        this.productList = result;
                    } else {
                        this.$message.error(res.msg);
                    }
                }).catch(err => {
                    console.log(err)
                })
            },
            queryProductByName() {
                let req = {
                    page: this.currentPage,
                    pageSize: 10,
                    productName:this.form.productName,
                    priceLevel:this.form.priceLevel
                }
                this.queryProductList(req);
            },
            loadMore() {
                this.busy = true;
                this.currentPage++;
                setTimeout(() => {
                    let req = {
                        page: this.currentPage,
                        pageSize: 10,
                        productName:this.form.productName,
                        priceLevel:this.form.priceLevel
                    }
                    this.loading = true;
                    this.queryProductList(req,true);
                }, 500)
                this.busy = false;
            }
        },
        mounted() {
            this.init()
        }
    }
</script>

<style scoped>
    .filter-nav {
        height: 55px;
        line-height: 55px;
        margin: 40px 0 20px;
        padding: 0 20px;
        background: #FFF;
        text-align: right;
        overflow: hidden;
    }

    .product-name {
        float: left;
        width: 45%;
    }

    .query-wrap {
        float: right;
    }

    .el-input, .el-select {
        width: 80%;
    }

    label {
        margin-right: 8px;
    }

    .product-list {
        display: flex;
        flex-wrap: wrap;
        margin-bottom: 24px;
    }

    .list-item {
        width: 19%;
        margin-top: 1%;
        margin-right: 1.25%;
    }

    .list-item:nth-child(5n) {
        margin-right: 0;
    }

    .container {
        overflow-y: hidden;
    }

    .loading {
        height: 100px;
    }
</style>
