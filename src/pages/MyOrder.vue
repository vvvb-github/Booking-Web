<template>
    <div id="container">
        <div id="order-list">
            <order-card v-for="(order,index) in orders" :key="index"
                        v-bind="order" class="order-card"></order-card>
            <div v-if="orders.length===0" style="margin-top: 100px;font-size: 25px">您尚无订单，快去预定吧！</div>
        </div>
    </div>
</template>

<script>
    import OrderCard from "@/components/OrderCard";
    import axios from "axios";
    export default {
        name: "MyOrder",
        components: {OrderCard},
        data() {
            return {
                orders: [],
            }
        },
        methods: {
        },
        created() {
            axios.get(this.SERVER_PATH+'/token',{params:{token:this.$store.state.user.token}})
                .then(res=>{
                    console.log(res.data)
                    if(res.data.status === 500) {
                        if(!res.data.state) {
                            this.$message.info('您尚未登录，请先登录！')
                            this.$router.push('/login')
                        }
                    }
                    else if(res.data.status === 200){
                        axios.get(this.SERVER_PATH+'/orders', {params:{token:this.$store.state.user.token}})
                            .then(res=>{
                                if(res.data.status === 200) {
                                    this.orders = res.data.orderList
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
                .catch(err=>{
                    console.log(err)
                    this.$message.error('服务器错误！')
                })
        },
    }
</script>

<style scoped>
    #container {
        display: flex;
        justify-content: center;
    }
    #order-list {
        display: flex;
        flex-direction: column;
        align-items: center;
    }
    .order-card {
        margin-top: 25px;
        width: 1000px;
    }
</style>