<template coments>
    <div class="home">
        <!--面包屑导航组件-->
        <Breadcrumb title="商品列表"></Breadcrumb>
        <div class="">

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
        }
    }
</script>
