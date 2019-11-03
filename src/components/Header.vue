<template>
    <div class="header">
        <div class="navbar">
            <div class="navbar-left-container">
                <img src="../assets/logo.jpg" alt="logo" class="navbar-brand-logo">
            </div>
            <div class="navbar-right-container">
                <div class="navbar-menu-container" v-show="!user.userName">
                    <span class="navbar-link" @click="showLoginForm">登录</span>
                    <span class="navbar-link" @click="showRegisterForm">注册</span>
                    <div class="navbar-cart-container" @click="goShoppingCart">
                        <i class="icon iconfont icon-gouwuche"></i>
                    </div>
                </div>
                <div class="navbar-menu-container" v-show="user.userName">
                    <span class="navbar-link">{{user.userName}}</span>
                    <span class="navbar-link" @click="loginOut">退出</span>
                    <div class="navbar-cart-container" @click="goShoppingCart">
                        <i class="icon iconfont icon-gouwuche"></i>
                        <span v-show="this.num>0" class="listNum">{{this.num}}</span>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="登录" :visible.sync="loginFormVisible" width="400px" :center="true">
            <el-form :model="loginForm">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="loginForm.name" autocomplete="off" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="loginForm.password"
                              autocomplete="off"
                              show-password
                              prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="loginFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="login">登 录</el-button>
            </div>
        </el-dialog>
        <el-dialog title="注册" :visible.sync="registerFormVisible" width="400px" :center="true">
            <el-form :model="form">
                <el-form-item label="用户名" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" :label-width="formLabelWidth">
                    <el-input v-model="form.password"
                              autocomplete="off"
                              show-password
                              prefix-icon="el-icon-lock"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="registerFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="register">注 册</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import User from '@/API/user.js';

    export default {
        name: "Header",
        data() {
            return {
                loginFormVisible: false,
                registerFormVisible: false,
                loginForm: {
                    name: '',
                    password: ''
                },
                form: {
                    name: '',
                    password: ''
                },
                formLabelWidth: '100px'
            }
        },
        computed: {
            user() {
                return this.$store.state.user;
            },
            num() {
                let shoppingCartList = this.$store.state.user.shoppingCartList, total = 0;
                total = Array.isArray(shoppingCartList) ? shoppingCartList.reduce((total, item) => {
                    return total + item.num;
                }, 0) : 0;
                return total;
            }
        },
        mounted() {
            let user = JSON.parse(this.$cookie.get('user')) || {};
            this.setUser(user)
        },
        methods: {
            showLoginForm() {
                this.loginFormVisible = true;
            },
            showRegisterForm() {
                this.registerFormVisible = true;
            },
            login() {
                let userName = this.loginForm.name,
                    password = this.loginForm.password;
                User.login({userName, password}).then((resp) => {
                    this.loginFormVisible = false;
                    if (resp.result.length > 0) {
                        this.$message({
                            message: '恭喜你，登录成功！',
                            type: 'success'
                        });
                        this.setUser(resp.result[0]);
                        this.$cookie.set('user', JSON.stringify(this.user), 1);
                    } else {
                        this.$message({
                            message: '用户名或密码错误！',
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    this.loginFormVisible = false;
                    this.$message({
                        message: err,
                        type: 'error'
                    })
                })
            },
            register() {
                let userName = this.form.name,
                    password = this.form.password;
                User.register({userName, password}).then((res) => {
                    this.registerFormVisible = false;
                    if (res.state == '0000') {
                        this.$message({
                            message: '恭喜你，注册成功！',
                            type: 'success'
                        });
                    } else {
                        this.$message({
                            message: res.msg,
                            type: 'error'
                        });
                    }
                }).catch((err) => {
                    this.registerFormVisible = false;
                    this.$message({
                        message: err,
                        type: 'error'
                    })
                })
            },
            loginOut() {
                this.setUser({});
                if(this.$route.path!='/'){
                    this.$router.replace('/');
                }
                this.$cookie.set('user', JSON.stringify(this.user), 1);
            },
            setUser(user) {
                this.$store.commit('setUser', user);
            },
            goShoppingCart() {
                this.$router.push('/shoppingCart');
            }
        }
    }
</script>

<style scoped>
    .header {
        width: 100%;
        background-color: #fff;
        font-family: moderat, sans-serif;
        font-size: 16px;
    }

    .navbar, .navbar-left-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
    }

    .navbar {
        -webkit-box-pack: justify;
        -ms-flex-pack: justify;
        justify-content: space-between;
        -ms-flex-line-pack: center;
        align-content: center;
        width: 100%;
        height: 70px;
        max-width: 1280px;
        margin: 0 auto;
        padding: 5px 20px 10px;
        padding-left: 60px;
    }

    .navbar-left-container {
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        margin-left: -20px;
    }

    .navbar-brand-logo {
        height: 50px;
    }

    .navbar-menu-container, .navbar-right-container {
        display: -webkit-box;
        display: -ms-flexbox;
        display: flex;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
    }

    .navbar-right-container {
        -webkit-box-pack: start;
        -ms-flex-pack: start;
        justify-content: flex-start;
    }

    .navbar-menu-container {
        -webkit-box-pack: end;
        -ms-flex-pack: end;
        justify-content: flex-end;
        padding-top: 10px;
    }

    .navbar-cart-container {
        padding-left: 15px;
        cursor: pointer;
        position: relative;
    }
    .listNum{
        -webkit-box-pack: center;
        -ms-flex-pack: center;
        justify-content: center;
        -webkit-box-align: center;
        -ms-flex-align: center;
        align-items: center;
        position: absolute;
        top: -9px;
        right: -11px;
        width: 20px;
        border-radius: 10px;
        color: #fff;
        background-color: #eb767d;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
    }
    .iconfont {
        font-size: 24px;
    }

    .iconfont:hover {
        color: #F60;
    }

    .navbar-link {
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        padding-left: 15px;
    }
</style>