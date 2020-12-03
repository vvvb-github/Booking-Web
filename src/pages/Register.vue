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

export default {
    name: "Register",
    components: {
        verifyCode
    },
    data() {
        return {
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
                ]
            },
            verifyCodeShow: false,
        }
    },
    methods: {
        success(msg) {
            console.log(msg);
            this.verifyCodeShow = false;
            // submit
        },
        close() {
            this.verifyCodeShow = false;
        },
        register() {
            this.$refs['register-form'].validate(valid=>{
                console.log(valid);
                if(valid) this.verifyCodeShow = true;
                else this.$message({
                    showClose: true,
                    message: '请输入正确的注册信息！',
                    type: 'error'
                });
            })
        },
        login() {
            this.$router.push('/login');
        },
        reset() {
            this.$refs['register-form'].resetFields();
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
        margin-top: 100px;
    }
</style>