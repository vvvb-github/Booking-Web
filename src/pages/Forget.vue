<template>
    <div id="container">
        <el-card id="reset-form" :body-style="bodyStyle">
            <el-form label-position="left" label-width="100px" v-if="!inSet"
                     :model="form" ref="reset-form" :rules="rules">
                <el-form-item prop="email" label="电子邮箱">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item prop="code" label="验证码">
                    <el-input v-model="form.code"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" @click="verify" :disabled="inCD">发送验证邮件</el-button>
                    <el-button type="text" disabled v-if="inCD">{{cd}}秒后重新发送</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="next">继续</el-button>
                    <el-button @click="login" type="text" style="margin-left: 20px">返回登录</el-button>
                </el-form-item>
            </el-form>
            <el-form label-width="100px" label-position="left" v-else
                     :model="passForm" ref="pass-form" :rules="rules">
                <el-form-item prop="password" label="新密码">
                    <el-input v-model="passForm.password" show-password></el-input>
                </el-form-item>
                <el-form-item prop="repeat" label="确认密码">
                    <el-input v-model="passForm.repeat" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="confirm">确认</el-button>
                    <el-button @click="login" type="text" style="margin-left: 20px">返回登录</el-button>
                </el-form-item>
            </el-form>
        </el-card>
        <verify-code :show="codeShow" @success="success" @close="close"></verify-code>
    </div>
</template>

<script>
import verifyCode from 'vue-puzzle-vcode';
import axios from 'axios';

export default {
    name: "Forget",
    components: {
        verifyCode
    },
    data() {
        return {
            inCD: false,
            cd: 60,
            timer: null,
            bodyStyle: {
                margin: 0,
                padding: '50px',
                // height: '100%',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
            },
            form: {
                email: '',
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
                code: [
                    {validator: (rule, value, callback)=>{
                        if(value !== this.rawCode) callback(new Error('验证码不正确'));
                        callback();
                        }, trigger: 'blur'},
                    {required: true, message: '验证码不能为空', trigger: 'blur'}
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {min: 6, max: 20, message: '密码长度必须为6-20位', trigger: 'blur'}
                ],
                repeat: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {validator: (rule,value, callback)=>{
                            if(value !== this.passForm.password) callback(new Error('密码不一致'));
                            callback();
                        }, trigger: 'blur'}
                ]
            },
            rawCode: '',
            codeShow: false,
            inSet: false,
            passForm: {
                password: '',
                repeat: ''
            },
        }
    },
    methods: {
        success() {
            this.codeShow = false;
            this.rawCode = '';
            for(let i=0;i<6;++i) {
                this.rawCode += Math.floor(Math.random()*10).toString();
            }
            // this.$message.info(this.rawCode);
            this.cd = ''
            this.inCD = true
            let data = {
                email: this.form.email,
                code: this.rawCode
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
            this.codeShow = false;
        },
        verify() {
            this.$refs['reset-form'].validateField('email', (msg)=>{
                if(msg === '') {
                    this.codeShow = true;
                }
            })
        },
        next() {
            this.$refs['reset-form'].validateField('code', (msg)=>{
                if(msg === '') {
                    this.inSet = true;
                }
            })
        },
        login() {
            this.$router.push('/login');
        },
        confirm() {
            this.$refs['pass-form'].validate(valid=>{
                if(valid) {
                    let data = {
                        email: this.form.email,
                        password: this.passForm.password
                    }
                    axios.get(this.SERVER_PATH+'/reset', {params:data})
                    .then(res=>{
                        if(res.data.status === 200) {
                            this.$message.success('密码重设成功！')
                            this.login()
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
        }
    }
}
</script>

<style scoped>
    #container {
        display: flex;
        justify-content: center;
    }
    #reset-form {
        margin-top: 100px;
        width: 600px;
        /*height: 400px;*/
    }
</style>