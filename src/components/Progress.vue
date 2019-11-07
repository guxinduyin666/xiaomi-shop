<template>
    <div class="check-step clearfix">
        <ul>
            <li :class="{'cur':step>0}">
                <span>确认 收货地址</span>
            </li>
            <li :class="{'cur':step>1}">
                <span>核对 订单信息</span>
            </li>
            <li :class="{'cur':step>2}">
                <span>支付 方式</span>
            </li>
            <li :class="{'cur':step>3}">
                <span>成功提交 订单</span>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "Progress",
        props:{
            step:{
                type:Number,
                required: true
            }
        }
    }
</script>

<style scoped>
    .check-step li {
        position: relative;
        float: left;
        -ms-flex: 1;
        -webkit-box-flex: 1;
        flex: 1;
        width: 25%;
        line-height: 1.25em;
        padding: 0 1em 1.25em;
        border-bottom: 2px solid #ccc;
        color: #999;
        text-align: center;
        font-weight: 700;
        text-transform: capitalize;
        box-sizing: border-box;
    }
    .check-step li.cur {
        border-color: #d1434a;
        color: #d1434a;
    }
    .check-step li:after {
        position: absolute;
        bottom: -7px;
        left: 50%;
        margin-left: -7px;
        content: "";
        width: 14px;
        height: 14px;
        border-radius: 50%;
        background: #ccc;
    }
    .check-step li.cur:after {
        background: #d1434a;
    }
</style>