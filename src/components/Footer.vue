<template>
    <div class="container footer">
        <div class="footer__inner">
            <div class="footer__secondary__nav">
                <span class="r-space-large">Copyright©2017-2020 wangchaochuan.club All Rights Reserved. </span>
                <span class="r-space-large">关于我们</span>
                <span class="r-space-large">版权所有 1980901451@qq.com</span>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Footer"
    }
</script>

<style scoped>
    .footer {
        background-color: #f5f7fc;
        color: #333;
        position: relative;
        border-top: 1px solid #33333326;
    }
    .footer__inner {
        height: 100px;
    }
    .footer__secondary__nav {
        position: absolute;
        top: 50%;
        -webkit-transform: translateY(-50%);
        transform: translateY(-50%);
        right: 36px;
    }
    .footer__secondary__nav span:first-child {
        margin-left: 0;
    }
    .r-space-large{
        margin-right: 32px;
    }
</style>