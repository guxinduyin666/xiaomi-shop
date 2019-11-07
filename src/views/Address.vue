<template>
    <div class="address container">
        <Breadcrumb title="收货地址"></Breadcrumb>
        <Progress :step="step"></Progress>
        <div class="page-title-normal checkout-title">
            <h2>收货人信息</h2>
        </div>
        <div class="addr-list-wrap">
            <ul class="addr-list clearfix">
                <li class="check" v-for="(receiver,index) in user.receiverInfo" :key="index">
                    <dl>
                        <dt>{{receiver.receiverName}}</dt>
                        <dd class="address">{{receiver.address}}</dd>
                        <dd class="tel">{{receiver.phone}}</dd>
                    </dl>
                    <div class="addr-opration addr-del" @click="deleteAddr(index)">
                        <i class="el-icon-delete addr-del-btn"></i>
                    </div>
                    <div class="addr-opration addr-set-default" v-show="!receiver.isDefault"
                         @click="setDefault(receiver)">设为默认地址
                    </div>
                    <div class="addr-opration addr-default" v-show="receiver.isDefault">默认地址</div>
                </li>
                <li class="addr-new">
                    <div class="add-new-inner">
                        <i class="el-icon-plus icon-add" @click="formVisible = true"></i>
                        <p>新增收货地址</p></div>
                </li>
            </ul>
        </div>
        <div class="page-title-normal checkout-title"><h2><span>货运方式</span></h2></div>
        <div class="shipping-method-wrap">
            <div class="shipping-method clearfix">
                <ul>
                    <li class="check">
                        <div class="name">京东快递</div>
                        <div class="price">包邮</div>
                        <div class="shipping-tips"><p>自签收后7天内退货，15天内换货，可享1次上门取件服务</p></div>
                    </li>
                </ul>
            </div>
        </div>
        <div class="next-btn-wrap">
            <el-button-group>
                <el-button type="primary">返 回</el-button>
                <el-button type="danger">去结算</el-button>
            </el-button-group>
        </div>
        <el-dialog title="新增收货人信息" :visible.sync="formVisible" width="400px" :center="true">
            <el-form :model="form">
                <el-form-item label="收货人姓名" :label-width="formLabelWidth">
                    <el-input v-model="form.receiverName" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货人电话" :label-width="formLabelWidth">
                    <el-input v-model="form.phone" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="收货人地址" :label-width="formLabelWidth">
                    <el-input v-model="form.address" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="formVisible = false">取 消</el-button>
                <el-button type="primary" @click="addNewAddre">新 增</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import Breadcrumb from '../components/Breadcrumb';
    import Progress from '../components/Progress';
    import User from '../API/user';

    export default {
        name: "Address",
        data() {
            return {
                step: 1,
                formVisible: false,
                form: {
                    receiverName: '',
                    phone: '',
                    address: ''
                },
                formLabelWidth: '100px'
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            }
        },
        components: {
            Breadcrumb,
            Progress
        },
        methods: {
            setDefault(receiver) {
                this.user.receiverInfo.forEach((item, index) => {
                    this.$set(this.user.receiverInfo[index], 'isDefault', false);
                })
                receiver.isDefault = true;
            },
            addNewAddre() {
                let receiver = this.form;
                this.user.receiverInfo.push(receiver);
                this.form = {
                    receiverName: '',
                    phone: '',
                    address: ''
                }
                this.formVisible = false;
            },
            deleteAddr(index) {
                this.user.receiverInfo.splice(index, 1);
            },
            updateReceiverInfo() {
                this.$store.commit('setUser', this.user);
                this.$cookie.set('user', JSON.stringify(this.user), 1);
                let {userName, receiverInfo} = this.user;
                User.updateReceiverInfo({userName, receiverInfo}).then((res) => {
                    console.log(res);
                })
            }
        },
        beforeDestroy(){
            this.updateReceiverInfo();
        }
    }
</script>

<style scoped>
    .page-title-normal {
        font-family: moderat, sans-serif;
        color: #333
    }

    .checkout-title h2 {
        padding: 20px 0;
        font-size: 16px;
        color: #605f5f
    }

    .addr-list li.check {
        border-color: #ee7a23;
        border-width: 2px
    }

    .addr-list li dt {
        line-height: 1em;
        padding: 0 25px 10px 0;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 16px
    }

    .addr-list li .address {
        height: 2.8517em;
        overflow: hidden
    }

    .addr-list li .tel {
        color: #605f5f;
        line-height: 1.2142
    }

    .addr-list li.check .addr-opration {
        display: block
    }

    .addr-list li .addr-default, .addr-list li .addr-set-default {
        bottom: 18px;
        left: 20px;
        color: #ee7a23
    }

    .addr-list li {
        position: relative;
        float: left;
        height: 162px;
        padding: 20px 20px 40px;
        background: #fff;
        border: 2px solid #e9e9e9;
        overflow: hidden;
        cursor: pointer;
        color: #333;
        box-sizing: border-box;
        width: 24%;
        margin-top: 1%;
        margin-right: 1.3%;
    }

    .addr-list li:nth-child(4n) {
        margin-right: 0;
    }

    .addr-list li.addr-new .add-new-inner {
        padding-top: 20px
    }

    .addr-list li.addr-new .add-new-inner .icon-add {
        display: inline-block;
        width: 50px;
        height: 50px
    }

    .addr-list li.addr-new .add-new-inner p {
        margin-top: 10px
    }

    .shipping-method-whiteglove li .price, .shipping-method li .price {
        height: 26px;
        font-weight: 700
    }

    .shipping-method-whiteglove li .shipping-tips, .shipping-method li .shipping-tips {
        height: 44px;
        margin-top: 20px;
        font-weight: 200;
        font-size: 14px;
        color: #666;
    }

    .shipping-method-whiteglove li, .shipping-method li {
        float: left;
        width: 23.8095%;
        height: 162px;
        margin: 0 1.587% 1.587% 0;
        padding: 20px;
        background: #fff;
        border: 2px solid #e9e9e9;
        font-size: 16px;
        line-height: 1.625;
        cursor: pointer;
        color: #333;
        box-sizing: border-box;
    }

    .next-btn-wrap {
        margin-top: 20px;
        text-align: right;
        box-shadow: 0 -3px 0 #DCDCDC;
    }

    .shipping-method-whiteglove li.check, .shipping-method-whiteglove li:hover, .shipping-method li.check, .shipping-method li:hover {
        border-color: #ee7a23
    }

    .btn, .btn {
        min-width: 200px
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
        box-sizing: border-box;
    }

    .btn--red, .btn--red[href] {
        background-color: #d1434a;
        border-color: #d1434a;
        color: #fff
    }

    .btn--red:hover, .btn--red[href]:hover {
        background-color: #f16f75;
        border-color: #f16f75;
        color: #fff
    }

    .addr-list li .addr-edit {
        top: 20px;
        right: 20px;
        width: 20px;
        height: 20px
    }

    .addr-list li .addr-del {
        bottom: 17px;
        right: 20px;
        width: 20px;
        height: 20px;
        font-size: 20px;
    }

    .addr-list li .addr-opration {
        position: absolute
    }

    .addr-list li.addr-new {
        text-align: center;
    }

    .addr-list li.addr-new .add-new-inner .icon-add {
        display: inline-block;
        width: 50px;
        height: 50px;
        font-size: 50px;
    }
</style>