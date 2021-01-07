<template>
    <div id="container">
        <el-card :body-style="bodyStyle" id="register-form">
            <el-form label-position="left" label-width="100px" :model="form" :rules="rules" ref="register-form">
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="repeat">
                    <el-input v-model="form.repeat" show-password></el-input>
                </el-form-item>
                <el-form-item label="昵称" prop="nickName">
                    <el-input v-model="form.nickName"></el-input>
                </el-form-item>
                <el-form-item label="验证码" prop="code">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" @click="verify" :disabled="inCD">发送验证邮件</el-button>
                    <el-button type="text" disabled v-if="inCD">{{cd}}秒后重新发送</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="register">注册</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" disabled>已有帐号？</el-button>
                    <el-button type="text" @click="login">点击登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <verify-code :show="verifyCodeShow" @success="success" @close="close"></verify-code>
    </div>
</template>

<script>
import verifyCode from 'vue-puzzle-vcode';
import axios from 'axios';

export default {
    name: "Register",
    components: {
        verifyCode
    },
    data() {
        return {
            inCD: false,
            cd: 60,
            bodyStyle: {
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100%',
                margin: 0,
                padding: '50px'
            },
            form: {
                email: '',
                password: '',
                repeat: '',
                nickName: '',
                code: '',
            },
            rules: {
                email: [
                    {validator: (rule, value, callback)=>{
                        if(value.indexOf('@') < 0) callback(new Error('请输入正确的邮箱格式'));
                        callback();
                        }, trigger: 'blur'},
                    {required: true, message: '邮箱不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {min: 6, max: 20, message: '密码长度必须为6-20位', trigger: 'blur'}
                ],
                repeat: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {validator: (rule,value, callback)=>{
                        if(value !== this.form.password) callback(new Error('密码不一致'));
                        callback();
                        }, trigger: 'blur'}
                ],
                nickName: [
                    {required: true, message: '昵称不能为空', trigger: 'blur'}
                ],
                code: [
                    {validator: (rule, value, callback)=>{
                            if(value !== this.rawCode) callback(new Error('验证码不正确'));
                            callback();
                        }, trigger: 'blur'},
                    {required: true, message: '验证码不能为空', trigger: 'blur'}
                ]
            },
            verifyCodeShow: false,
            rawCode: '',
        }
    },
    methods: {
        success() {
            this.verifyCodeShow = false;
            this.rawCode = '';
            for(let i=0;i<6;++i) {
                this.rawCode += Math.floor(Math.random()*10).toString();
            }
            // this.$message.info(this.rawCode);
            this.cd = ''
            this.inCD = true;
            let data={
                email:this.form.email,
                code:this.rawCode
            }
            axios.get(this.SERVER_PATH+'/code',{params:data})
                .then(res=>{
                    if(res.data.status === 200) {
                        this.cd = 60
                        this.timer = setInterval(()=>{
                            this.cd -= 1
                            if(this.cd === 0) {
                                clearInterval(this.timer);
                                this.inCD = false
                                this.rawCode = ''
                            }
                        },1000)
                    }
                    else {
                        this.$message.error(res.data.msg);
                        this.inCD = false
                    }
                })
                .catch(err=>{
                    console.log(err);
                    this.$message.error('服务器错误！');
                    this.inCD = false
                })
        },
        close() {
            this.verifyCodeShow = false;
        },
        register() {
            this.$refs['register-form'].validate(valid=>{
                if(valid) {
                    let data = {
                        userName: this.form.nickName,
                        password: this.form.password,
                        email: this.form.email
                    }
                    axios.get(this.SERVER_PATH+'/register',{params:data})
                        .then(res=>{
                            if(res.data.status === 200) {
                                this.$message.success('注册成功！')
                                this.$router.push('/login')
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
            })
        },
        login() {
            this.$router.push('/login');
        },
        reset() {
            this.$refs['register-form'].resetFields();
        },
        verify() {
            this.$refs['register-form'].validateField('email', (msg)=>{
                if(msg === '') {
                    this.verifyCodeShow = true;
                }
            })
        }
    }
}
</script>

<style scoped>
    #container {
        display: flex;
        justify-content: center;
        align-items: center;
    }
    #register-form {
        width: 600px;
        margin-top: 20px;
    }
</style>