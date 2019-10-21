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
                        <el-button type="primary">查询</el-button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // @ is an alias to /src
    import Breadcrumb from '@/components/Breadcrumb.vue';

    export default {
        name: 'home',
        components: {
            Breadcrumb
        },
        data(){
            return {
                form:{
                    productName:'',
                    priceLevel:''
                }
            }
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
    .product-name{
        float: left;
        width: 45%;
    }
    .query-wrap{
        float: right;
    }
    .el-input,.el-select{
        width: 80%;
    }
    label{
        margin-right: 8px;
    }
</style>
