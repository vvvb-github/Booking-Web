<template>
    <el-card :body-style="bodyStyle" shadow="hover" class="card-container">
        <img :src="pictureUrl" class="card-pic">
        <span class="card-title">{{hotelName}}</span>
        <span class="card-price">最低价：{{minPrice}}￥</span>
        <div class="rate-div">
            <i class="el-icon-star-on" style="color: orange; font-size: large">{{stars}}</i>
            <span style="font-size: small; margin-left: 20px; color: grey">{{commentNumber}}人次</span>
        </div>
    </el-card>
</template>

<script>
    export default {
        name: "HotelCard",
        props: {
            uuid: Number,
            hotelName: String,
            introduction: String,
            location: String,
            roomList: String,
            pictureUrl: String,
            minPrice: Number,
            stars: Number,
            commentNumber: Number,
        },
        data() {
            return {
                bodyStyle: {
                    paddingTop: '0px',
                    paddingLeft: '0px',
                    paddingRight: '0px',
                    paddingBottom: '10px',
                    width: '100%',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'flex-start',
                }
            }
        }
    }
</script>

<style scoped>
    .card-container {
        cursor: pointer;
    }
    .card-pic {
        width: 300px;
        height: 300px;
        object-fit: cover;
    }
    .card-title {
        font-size: larger;
        color: blue;
        margin-left: 20px;
        margin-top: 10px;
        font-weight: bold;
    }
    .card-price {
        font-size: large;
        margin-left: 20px;
        margin-top: 10px;
    }
    .rate-div {
        display: flex;
        margin-left: 20px;
        margin-top: 10px;
    }
</style>