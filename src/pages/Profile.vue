<template>
    <div id="container">
        <el-card :body-style="leftStyle" id="left-card">
            <el-avatar :size="300" :src="this.$store.state.user.icon" shape="square"></el-avatar>
            <div v-if="editAvatar">
                <el-upload :action="this.SERVER_PATH+'/icon-edit'" list-type="text" :auto-upload="false" :limit="1"
                           :data="{token:this.$store.state.user.token}"
                           :on-exceed="handleExceed" ref="upload-avatar" :before-upload="handleBefore" :on-success="handleSuccess"
                           :on-error="handleError">
                    <el-button size="small" type="text">点击上传</el-button>
                    <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500KB</div>
                </el-upload>
                <div style="display: flex;justify-content: space-around;align-items: center;margin-top: 20px">
                    <el-button icon="el-icon-check" type="success" circle @click="upload"></el-button>
                    <el-button icon="el-icon-delete" type="danger" circle @click="editAvatar=false"></el-button>
                </div>
            </div>
            <el-button v-else size="small" style="margin-top: 5px; margin-bottom: 50px;" type="text" @click="editAvatar=true">更换头像</el-button>
            <span style="font-weight: bolder;font-size: 50px;color: purple">{{this.$store.state.user.nickName}}</span>
        </el-card>
        <el-card :body-style="rightStyle" id="right-card">
            <div class="edit-item">
                <span class="edit-title">昵称</span>
                <span v-if="show.nickName" class="edit-content">{{this.$store.state.user.nickName}}</span>
                <el-button v-if="show.nickName" class="edit-btn" type="text" icon="el-icon-edit" @click="show.nickName=false"></el-button>
                <el-input v-if="!show.nickName" v-model="info.nickName" class="edit-input"></el-input>
                <el-button v-if="!show.nickName" icon="el-icon-check" circle type="success" class="edit-btn" @click="submit(0)"></el-button>
                <el-button v-if="!show.nickName" icon="el-icon-delete" circle type="danger" @click="show.nickName=true"></el-button>
            </div>
            <div class="edit-item">
                <span class="edit-title">邮箱</span>
                <span v-if="show.email" class="edit-content">{{this.$store.state.user.email}}</span>
                <el-button v-if="show.email" class="edit-btn" type="text" icon="el-icon-edit" @click="show.email=false"></el-button>
                <el-input v-if="!show.email" v-model="info.email" class="edit-input"></el-input>
                <el-button v-if="!show.email" icon="el-icon-check" circle type="success" class="edit-btn" @click="submit(1)"></el-button>
                <el-button v-if="!show.email" icon="el-icon-delete" circle type="danger" @click="show.email=true"></el-button>
            </div>
            <div class="edit-item">
                <span class="edit-title">手机号</span>
                <span v-if="show.phone" class="edit-content">{{this.$store.state.user.phone}}</span>
                <el-button v-if="show.phone" class="edit-btn" type="text" icon="el-icon-edit" @click="show.phone=false"></el-button>
                <el-input v-if="!show.phone" v-model="info.phone" class="edit-input"></el-input>
                <el-button v-if="!show.phone" icon="el-icon-check" circle type="success" class="edit-btn" @click="submit(2)"></el-button>
                <el-button v-if="!show.phone" icon="el-icon-delete" circle type="danger" @click="show.phone=true"></el-button>
            </div>
            <div class="edit-item">
                <span class="edit-title">真实姓名</span>
                <span v-if="show.realName" class="edit-content">{{this.$store.state.user.realName}}</span>
                <el-button v-if="show.realName" class="edit-btn" type="text" icon="el-icon-edit" @click="show.realName=false"></el-button>
                <el-input v-if="!show.realName" v-model="info.realName" class="edit-input"></el-input>
                <el-button v-if="!show.realName" icon="el-icon-check" circle type="success" class="edit-btn" @click="submit(3)"></el-button>
                <el-button v-if="!show.realName" icon="el-icon-delete" circle type="danger" @click="show.realName=true"></el-button>
            </div>
            <div class="edit-item">
                <span class="edit-title">身份证号</span>
                <span v-if="show.idNumber" class="edit-content">{{this.$store.state.user.idNumber}}</span>
                <el-button v-if="show.idNumber" class="edit-btn" type="text" icon="el-icon-edit" @click="show.idNumber=false"></el-button>
                <el-input v-if="!show.idNumber" v-model="info.idNumber" class="edit-input"></el-input>
                <el-button v-if="!show.idNumber" icon="el-icon-check" circle type="success" class="edit-btn" @click="submit(4)"></el-button>
                <el-button v-if="!show.idNumber" icon="el-icon-delete" circle type="danger" @click="show.idNumber=true"></el-button>
            </div>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';

export default {
    name: "Profile",
    data() {
        return {
            editAvatar: false,
            leftStyle: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '20px',
            },
            rightStyle: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'flex-start',
                padding: '20px',
            },
            show: {
                nickName: true,
                email: true,
                phone: true,
                idNumber: true,
                realName: true
            },
            info: {
                nickName: '',
                email: '',
                phone: '',
                idNumber: '',
                realName: '',
            }
        }
    },
    methods: {
        submit(id) {
            let data = {
                token: this.$store.state.user.token,
                nickName: this.$store.state.user.nickName,
                email: this.$store.state.user.email,
                phoneNumber: this.$store.state.user.phone,
                realName: this.$store.state.user.realName,
                idCardNumber: this.$store.state.user.idNumber
            }
            switch (id) {
                case 0: //nickName
                    if(this.info.nickName.length === 0) {
                        this.$message.error('用户昵称不能为空！')
                        return
                    }
                    data.nickName = this.info.nickName
                    break;
                case 1: //email
                    if(this.info.email.indexOf('@') < 0) {
                        this.$message.error('邮箱格式不正确！')
                        return
                    }
                    data.email = this.info.email
                    break;
                case 2: //phone
                    if(this.info.phone.length < 8 || this.info.phone.length > 12) {
                        this.$message.error('请输入正确的手机号！')
                        return
                    }
                    data.phoneNumber = this.info.phone
                    break;
                case 3: //realName
                    if(this.info.realName.length === 0) {
                        this.$message.error('请输入正确的真实姓名！')
                        return
                    }
                    data.realName = this.info.realName
                    break;
                case 4: //idNumber
                    if(this.info.idNumber.length != 18) {
                        this.$message.error('请输入正确的身份证号！')
                        return
                    }
                    data.idCardNumber = this.info.idNumber
                    break;
            }
            axios.get(this.SERVER_PATH+'/edit',{params:data})
            .then(res=>{
                if(res.data.status === 200) {
                    this.$store.commit('user/setNickName', data.nickName)
                    this.$store.commit('user/setEmail', data.email)
                    this.$store.commit('user/setRealName', data.realName)
                    this.$store.commit('user/setPhone', data.phoneNumber)
                    this.$store.commit('user/setIdNumber', data.idCardNumber)
                    this.$message.success('修改成功！')
                }
                else {
                    this.$message.error(res.data.msg)
                }
            })
            .catch(err=>{
                console.log(err)
                this.$message.error('服务器错误！')
            })
        },
        upload() {
            if(this.$refs['upload-avatar'].$children[0].fileList.length==0){
                this.$message.error('请上传头像！')
            }else{
                this.$refs['upload-avatar'].submit()
            }
        },
        handleExceed() {
            this.$message.error('只能上传1张图片！')
        },
        handleBefore(file) {
            let extend = file.name.substring(file.name.lastIndexOf('.')+1)
            let fileSize = file.size/1024
            if(extend!='jpg' && extend!='png'){
                this.$message.error('请上传jpg或png格式图片！')
                return false
            }
            if(fileSize>500){
                this.$message.error('图片超过500KB！')
                return false
            }
        },
        handleSuccess(res){
            if(res.status === 1){
                this.$message.success('图片上传成功!')
                this.$store.commit('user/setIcon', res.url)
            }else{
                this.$message.error(res.msg)
            }
        },
        handleError(err){
            console.log(err)
            this.$message.error('图片上传出错！')
        },
    },
    created() {
        axios.get(this.SERVER_PATH+'/token',{params:{token:this.$store.state.user.token}})
        .then(res=>{
            if(res.data.status === 200) {
                if(!res.data.state) {
                    this.$message.info('您尚未登录，请先登录！')
                    this.$router.push('/login')
                }
            }
            else {
                this.$message.error(res.data.msg)
            }
        })
        .catch(err=>{
            console.log(err)
            this.$message.error('服务器错误！')
        })
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
        padding: 50px 5%;
        width: 20%;
    }

    #right-card {
        padding: 50px 5%;
        width: 40%;
        margin-left: 1%;
    }

    .edit-item {
        display: flex;
        align-items: center;
        margin-bottom: 10px;
    }

    .edit-title {
        font-size: 25px;
        font-weight: bold;
        white-space: nowrap;
    }

    .edit-content {
        font-size: 20px;
        /*font-weight: bold;*/
        margin-left: 50px;
    }

    .edit-btn {
        margin-left: 50px;
    }

    .edit-input {
        margin-left: 50px;
    }
</style>