<template>
    <div id="container">
        <el-card :body-style="leftStyle" id="left-card">
            <el-avatar :size="300" :src="this.$store.state.user.icon" shape="square"></el-avatar>
            <el-button size="small" style="margin-top: 5px; margin-bottom: 50px;">更换头像</el-button>
            <span id="nickname" v-if="show.nickName">
                {{this.$store.state.user.nickName}}
                <el-button type="text" icon="el-icon-edit" class="edit-btn"
                           @click="show.nickName=false"></el-button>
            </span>
            <div class="edit-div" v-else>
                <el-input v-model="info.nickName"></el-input>
                <el-button type="success" circle icon="el-icon-check" class="dec-btn"
                           @click="nickNameEdit"></el-button>
                <el-button type="danger" circle icon="el-icon-delete" class="dec-btn"
                           @click="show.nickName=true"></el-button>
            </div>
            <div id="info-div">
                <span class="info" v-if="show.email">
                    <span class="title">Email: </span>
                    {{this.$store.state.user.email}}
                    <el-button type="text" icon="el-icon-edit" class="edit-btn"
                    @click="show.email=false"></el-button>
                </span>
                <div class="edit-div" v-else>
                    <el-input v-model="info.email"></el-input>
                    <el-button type="success" circle icon="el-icon-check" class="dec-btn"
                    @click="emailEdit"></el-button>
                    <el-button type="danger" circle icon="el-icon-delete" class="dec-btn"
                    @click="show.email=true"></el-button>
                </div>
            </div>
        </el-card>
    </div>
</template>

<script>
export default {
    name: "Profile",
    data() {
        return {
            leftStyle: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
                // height: '100%'
            },
            rightStyle: {},
            show: {
                nickName: true,
                email: true,
            },
            info: {
                nickName: '',
                email: '',
            }
        }
    },
    methods: {
        emailEdit() {
            if(this.info.email.indexOf('@') < 0) {
                this.$message.error('邮箱格式不正确！');
            } else {
                // submit
                this.show.email = true;
            }
        },
        nickNameEdit() {
            if(this.info.nickName.length === 0) {
                this.$message.error('昵称不能为空！');
            } else {
                // submit
                this.show.nickName = true;
            }
        },
    }
}
</script>

<style scoped>
    #container {
        display: flex;
        padding: 20px 0;
        justify-content: center;
    }

    #left-card {
        padding: 1% 5%;
    }

    #nickname {
        font-size: xx-large;
        font-weight: bold;
        color: rebeccapurple;
        /*margin: 5px;*/
    }

    #info-div {
        display: flex;
        flex-direction: column;
        align-items: flex-end;
        /*padding: 5px;*/
    }
    .info {
        font-size: large;
        margin: 5px;
    }
    .title {
        font-size: larger;
        font-weight: bold;
    }
    .edit-btn {
        margin-left: 5px;
        font-size: 20px;
    }
    .edit-div {
        margin: 5px;
        display: flex;
        align-items: center;
    }
    .dec-btn {
        margin-left: 5px;
    }
</style>