<template>
    <div id="container">
        <el-card :body-style="bodyStyle" id="login-form">
            <el-form label-position="left" label-width="100px" :model="form" :rules="rules" ref="login-form">
                <el-form-item label="电子邮箱" prop="email">
                    <el-input v-model="form.email"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="form.password" show-password></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="success" @click="submit">登录</el-button>
                    <el-button @click="reset">重置</el-button>
                </el-form-item>
                <el-form-item style="margin-bottom: 0">
                    <el-button type="text" disabled>还没有帐号？</el-button>
                    <el-button type="text" @click="register">注册帐号</el-button>
                </el-form-item>
                <el-form-item>
                    <el-button type="text" disabled>忘记密码？</el-button>
                    <el-button type="text" @click="forget">点击重设</el-button>
                </el-form-item>
            </el-form>
        </el-card>
    </div>
</template>

<script>
    import axios from 'axios';

export default {
    name: "Login",
    data() {
        return {
            bodyStyle: {
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                margin: 0,
                height: '100%',
                paddingTop: '50px'
            },
            form: {
                email: '',
                password: '',
            },
            rules: {
                email: [
                    {required: true, message: '邮箱不能为空', trigger: 'blur'},
                    {validator: (rule, value, callback)=>{
                        if(value.indexOf('@') < 0) callback(new Error('请输入正确的邮箱格式'));
                        callback();
                        }, trigger: 'blur'},
                ],
                password: [
                    {required: true, message: '密码不能为空', trigger: 'blur'},
                    {min: 6, max: 20, message: '密码长度必须为6-20位', trigger: 'blur'}
                ]
            }
        }
    },
    methods: {
        submit() {
            this.$refs['login-form'].validate(valid=>{
                if(valid) {
                    axios.get(this.SERVER_PATH+'/login', {params:this.form})
                    .then(res=>{
                        let data = res.data
                        if(data.status === 200) {
                            this.$store.commit('user/setToken', data.token)
                            this.$store.commit('user/setNickName', data.user.nickName)
                            this.$store.commit('user/setEmail', data.user.email)
                            this.$store.commit('user/setRealName', data.user.realName)
                            this.$store.commit('user/setPhone', data.user.phoneNumber)
                            this.$store.commit('user/setIdNumber', data.user.idCardNumber)
                            this.$store.commit('user/setIcon', data.user.iconUrl)
                            this.$router.push('/home')
                        }
                        else {
                            this.$message.error(data.msg)
                        }
                    })
                    .catch(err=>{
                        console.log(err)
                        this.$message.error('服务器错误！')
                    })
                } else {
                    this.$message.error('请输入正确的邮箱和密码！')
                }
            })
        },
        reset() {
            this.$refs['login-form'].resetFields();
        },
        register() {
            this.$router.push('/register')
        },
        forget() {
            this.$router.push('/forget')
        }
    },
    created() {
        this.$store.commit('user/setToken', '');
    }
}
</script>

<style scoped>
    #container {
        display: flex;
        justify-content: center;
        align-items: center;
    }

    #login-form {
        width: 600px;
        margin-top: 100px;
    }
</style>