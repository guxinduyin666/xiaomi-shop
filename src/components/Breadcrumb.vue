<template>
    <div class="breadcrumb">
        <div class="container">
            <nav class="nav-breadcrumb">
                <a href="/">主页</a>
                <span>{{title}}</span>
            </nav>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Breadcrumb",
        props:{
            title:String
        }
    }
</script>

<style scoped>
    .breadcrumb {
        background-color: #F0F0F0;
    }

    .nav-breadcrumb {
        padding: 10px 0;
        line-height: 25px;
        font-size: 14px;
    }
    .nav-breadcrumb a {
        position: relative;
        margin-right: 16px;
        color: #999;
    }
    .nav-breadcrumb a:after {
        position: absolute;
        top: 3px;
        right: -12px;
        content: "/";
        line-height: 1.2;
    }
    .nav-breadcrumb a:hover, .nav-breadcrumb span {
        color: #d1434a;
    }
</style>