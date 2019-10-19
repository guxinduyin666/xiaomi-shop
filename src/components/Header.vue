<template>
    <div class="header">
        <div class="navbar">
            <div class="navbar-left-container">
                <img src="../assets/logo.jpg" alt="logo" class="navbar-brand-logo">
            </div>
            <div class="navbar-right-container">
                <div class="navbar-menu-container">
                    <span class="navbar-link" @click="login">登录</span>
                    <span class="navbar-link">注册</span>
                    <div class="navbar-cart-container">
                        <i class="icon iconfont icon-gouwuche"></i>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="登录" :visible.sync="dialogFormVisible" width="400px" :center="true">
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
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">登 录</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data() {
            return {
                dialogFormVisible: false,
                form: {
                    name: '',
                    password: ''
                },
                formLabelWidth: '100px'
            }
        },
        methods: {
            login() {
                this.dialogFormVisible = true;
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
    }

    .iconfont {
        font-size: 24px;
    }

    .navbar-link {
        height: 32px;
        line-height: 32px;
        cursor: pointer;
        padding-left: 15px;
    }
</style>