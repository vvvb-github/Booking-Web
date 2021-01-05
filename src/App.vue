<template>
    <div id="app" :style="{backgroundColor: this.colorCard.color5}">
        <div id="header" :style="{backgroundColor: this.colorCard.color1}">
            <div id="header-main">
                <div id="header-body">
                    <img src="./assets/logo.png" style="width: 100px;height: 60px">
                </div>
                <el-menu
                        id="nav"
                        :default-active="'/'"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        :background-color="this.colorCard.color1"
                        :text-color="this.colorCard.color5"
                        :active-text-color="this.colorCard.textColor">
                    <el-menu-item index="/" class="el-menu-item">首页</el-menu-item>
                    <el-menu-item index="/my-order" class="el-menu-item">我的订单</el-menu-item>
                </el-menu>
            </div>
            <div id="header-user">
                <el-dropdown v-if="this.$store.state.user.token!=''" style="margin-right: 10px"
                    @command="avatarClick">
                    <span class="el-dropdown-link" :style="{color: this.colorCard.textColor}">
                        {{this.$store.state.user.nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item v-for="(path,index) in avatarPaths" :key="index" :command="path">
                            {{avatarLabels[index]}}
                        </el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-button type="text" v-else :style="{color: this.colorCard.textColor}"
                id="login-btn" @click="login">登录/注册</el-button>
                <el-avatar :size="80" fit="fill" :src="iconSrc"></el-avatar>
            </div>
        </div>
        <router-view/>
        <el-backtop>
            <i class="el-icon-top"></i>
        </el-backtop>
    </div>
</template>

<script>

    export default {
        name: 'App',
        data() {
            return {
                avatarLabels: ['个人中心','注销账户'],
                avatarPaths: ['/profile','/login'],
            }
        },
        methods: {
            handleSelect(index) {
                this.$router.push(index)
            },
            login() {
                this.$router.push('/login')
            },
            avatarClick(path) {
                console.log(path);
                this.$router.push(path)
            }
        },
        computed: {
            iconSrc() {
                if(this.$store.state.user.token!='') return this.$store.state.user.icon;
                else return 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png';
            },
        },
    }
</script>

<style>
    html {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
    body {
        width: 100%;
        height: 100%;
        padding: 0;
        margin: 0;
    }
    #app {
        width: 100%;
        height: 100%;
        overflow-x: hidden;
    }
    #header {
        width: 100%;
        /*background-color: black;*/
        display: flex;
        align-items: center;
    }
    #header-main {
        width: 70%;
        height: 100%;
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        align-items: center;
        justify-content: space-around;
    }
    #header-body {
        width: 90%;
        display: flex;
        justify-content: flex-start;
    }
    #nav {
        width: 90%;
    }
    #header-user {
        width: 25%;
        height: 100px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
    }
    .el-dropdown-link {
        cursor: pointer;
        /*color: orange;*/
        font-size: 20px;
    }

    #login-btn {
        font-size: 20px;
        margin-right: 10px;
    }
</style>
