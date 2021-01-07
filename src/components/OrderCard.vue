<template>
    <el-card id="container" :body-style="bodyStyle" shadow="hover" >
        <img :src="pictureUrl" class="pic" @click="go">
        <div class="info" style="width: 200px">
            <span class="title" @click="go">{{hotelName}}</span>
            <span class="price">{{price}}￥</span>
            <span class="type">{{title}}</span>
        </div>
        <div class="info">
            <span class="time">入住：{{startTime.getFullYear()}}.{{startTime.getMonth()+1}}.{{startTime.getDay()}}</span>
            <span class="time">退房：{{endTime.getFullYear()}}.{{endTime.getMonth()+1}}.{{endTime.getDay()}}</span>
            <span class="time">房客数量：{{customerNumber}}人</span>
        </div>
        <div class="info" style="width: 250px">
            <span :style="{color: stateColor(state)}" class="state">{{orderState(state)}}</span>
            <el-button v-if="state===0" size="small" type="primary" @click="quit"
                       style="width: 100px">退订</el-button>
            <el-button v-if="state===1" size="small" type="warning" @click="rateBox=true"
                style="width: 100px">点击评分</el-button>
            <el-rate v-if="state===2" disabled show-score v-model="star" text-color="#ff9900"></el-rate>
        </div>
        <el-dialog title="用户评分" :visible.sync="rateBox">
            <el-rate v-model="rates" show-text style="margin-left: 30px"
                     :texts="['不好','较差','一般','很好','非常好']"></el-rate>
            <el-button type="success" style="position: relative;left: 80%;margin-top: 30px"
                @click="submit" :disabled="rates===0">提交评分</el-button>
        </el-dialog>
    </el-card>
</template>

<script>
    import axios from 'axios'

export default {
    name: "OrderCard",
    props: {
        orderID: Number,
        pictureUrl: String,
        hotelName: String,
        startTime: Date,
        endTime: Date,
        customerNumber: Number,
        price: Number,
        title: String,
        state: Number,
        star: Number,
        hotelId: Number,
        roomId: Number,
    },
    data() {
        return {
            bodyStyle: {
                display: 'flex',
                alignItems: 'center',
                paddingLeft: '0'
            },
            rateBox: false,
            rates: 0,
        }
    },
    methods: {
        orderState(state) {
            switch (state) {
                case 0:
                    return '等待入住'
                case 1:
                    return '待评价'
                case 2:
                    return '已评价'
                case 3:
                    return '已取消'
            }
            return '订单错误'
        },
        stateColor(state) {
            switch (state) {
                case 0:
                    return 'dimgrey'
                case 1:
                    return 'green'
                case 2:
                    return 'orange'
                case 3:
                    return 'grey'
            }
            return 'red'
        },
        submit() {
            let data = {
                token: this.$store.state.user.token,
                star: this.rates,
                orderID: this.orderID
            }
            axios.get(this.SERVER_PATH+'/rate', {params:data})
                .then(res=>{
                    if(res.data.status === 200) {
                        this.$message.success('评分提交成功！')
                        this.state = 2
                        this.rateBox = false
                        this.star = this.rates
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
        go() {
            this.$router.push({
                name: 'detail',
                params: {
                    uuid: this.hotelId,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    customerNumber: this.customerNumber
                }
            })
        },
        quit() {
            let data = {
                token: this.$store.state.user.token,
                orderID: this.orderID
            }
            axios.get(this.SERVER_PATH+'/cancel', {params:data})
                .then(res=>{
                    if(res.data.status === 200) {
                        this.$message.success('退订成功！')
                        this.state = 3
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
}
</script>

<style scoped>
    #container {
        cursor: default;
    }
    .pic {
        width: 150px;
        height: 150px;
        object-fit: fill;
        cursor: pointer;
    }
    .info {
        display: flex;
        flex-direction: column;
        margin-left: 50px;
        height: 100%;
        justify-content: space-around;
    }
    .title {
        font-size: 30px;
        font-weight: bold;
        color: blue;
        cursor: pointer;
    }
    .time {
        font-size: 20px;
    }
    .price {
        font-size: 30px;
        font-weight: bold;
        color: red;
    }
    .type {
        font-size: 20px;
        color: dimgrey;
    }
    .state {
        font-size: 25px;
        font-weight: bold;
    }
</style>