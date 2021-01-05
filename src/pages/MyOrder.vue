<template>
    <div id="container">
        <div id="order-list">
            <order-card v-for="(order,index) in orders" :key="index"
                        v-bind="order" class="order-card"></order-card>
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
                orders: [
                    {
                        orderID: 0,
                        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2339646227,2088146489&fm=26&gp=0.jpg',
                        hotelName: '姬哥酒店',
                        startTime: new Date(),
                        endTime: new Date(),
                        customerNumber: 1,
                        price: 648,
                        title: '大床房',
                        state: 0,
                        star: 0,
                        hotelId: 0,
                        roomId: 0,
                    },
                    {
                        orderID: 0,
                        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2339646227,2088146489&fm=26&gp=0.jpg',
                        hotelName: '姬哥酒店',
                        startTime: new Date(),
                        endTime: new Date(),
                        customerNumber: 1,
                        price: 648,
                        title: '大床房',
                        state: 1,
                        star: 4.6,
                        hotelId: 0,
                        roomId: 0,
                    },
                ],
            }
        },
        methods: {
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
        },
        mounted() {
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