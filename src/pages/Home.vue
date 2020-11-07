<template>
    <div>
        <el-button id="dock-btn" icon="el-icon-caret-right" @click="dockVisible=true"></el-button>
        <el-drawer
                direction="ltr"
                :visible.sync="dockVisible"
                :with-header="false"
                title="Title"
                id="dock">
            <el-menu
                    id="dock-nav"
                    :default-active="'1'"
                    class="el-menu-demo"
                    @select="dockSelect"
                    background-color="black"
                    text-color="#fff"
                    active-text-color="rgba(255,150,0,1)">
                <el-menu-item index="1" class="el-menu-item">全部</el-menu-item>
                <el-menu-item index="2" class="el-menu-item">类别</el-menu-item>
            </el-menu>
        </el-drawer>
        <div id="container">
            Home
        </div>
    </div>
</template>

<script>
    export default {
        name: "Home",
        data() {
            return {
                dockVisible: false,
            }
        },
        methods: {
            dockSelect(index) {
                console.log(index)
            }
        }
    }
</script>

<style scoped>
    #dock-btn {
        position: fixed;
        left: 0;
        top: 40%;
        width: 20px;
        height: 100px;
        z-index: 1;
        padding: 0;
        background-color: black;
        color: orange;
    }
    #container {
    }
    #dock {
        width: 1000px;
    }
    #dock-nav {
        width: 100%;
        height: 100%;
    }
</style>