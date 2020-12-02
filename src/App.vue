<template>
    <div id="app" class="app">
        <div id="header" :style="{backgroundColor: this.colorCard.color1}">
            <div id="header-main">
                <div id="header-body">
                    <img src="./assets/logo.png" style="width: 100px;height: 60px">
                </div>
                <el-menu
                        id="nav"
                        :default-active="'1'"
                        class="el-menu-demo"
                        mode="horizontal"
                        @select="handleSelect"
                        :background-color="this.colorCard.color1"
                        :text-color="this.colorCard.color5"
                        :active-text-color="this.colorCard.textColor">
                    <el-menu-item index="1" class="el-menu-item">首页</el-menu-item>
                    <el-menu-item index="2" class="el-menu-item">待扩展</el-menu-item>
                </el-menu>
            </div>
            <div id="header-user">
                <el-dropdown style="margin-right: 10px">
                    <span class="el-dropdown-link" :style="{color: this.colorCard.textColor}">
                        {{this.$store.state.user.nickName}}<i class="el-icon-arrow-down el-icon--right"></i>
                    </span>
                    <el-dropdown-menu slot="dropdown">
                        <el-dropdown-item>个人中心</el-dropdown-item>
                    </el-dropdown-menu>
                </el-dropdown>
                <el-avatar :size="80" fit="fill" :src="this.$store.state.user.icon"></el-avatar>
            </div>
        </div>
        <router-view class="page"/>
        <el-backtop>
            <i class="el-icon-top"></i>
        </el-backtop>
    </div>
</template>

<script>

    export default {
        name: 'App',
        methods: {
            handleSelect(index) {
                console.log(index)
            }
        },
        computed: {
            pageHeight() {
                let height = document.querySelector('#app').clientHeight;
                let headHeight = document.querySelector('header').clientHeight;
                return height - headHeight;
            }
        }
    }
</script>

<style>
    body {
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

    .page {
        width: 100%;
    }
</style>
