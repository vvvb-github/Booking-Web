<template>
    <div id="container">
        <el-carousel id="top-carousel" 
                     indicator-position="outside" 
                     type="card"
                     interval="4000"
                     height="300px"
                    >
            <el-carousel-item v-for="data in roomPictures" 
                            :key="data.id"
                            style="display:flex;justify-content:center">
                <img :src="data.pictureUrl"
                     class="carouselPicture"
                     >
            </el-carousel-item>
        </el-carousel>
        <el-container id="detail-container">
            <el-aside width="560px" id="side-date" :style="{backgroundColor: this.colorCard.color5}">
                <el-card :body-style="{ width:asideWidth,padding: '0px',display:'flex',flexDirection:'column',alignItems:'center'}"
                class="date-picker">
                    <div class="twoSideBlock" >
                        <span class="select-font" >入住日期</span>
                        <el-date-picker  
                            class="selector"
                            v-model="startDate"
                            align=“middle”
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                    <div class="twoSideBlock" >
                        <span class="select-font">退房日期</span>
                        <el-date-picker
                            class="selector"
                            v-model="endDate"
                            align=“middle”
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                        </el-date-picker >
                    </div>
                    <div class="twoSideBlock" >
                        <span class="select-font">房客人数</span>
                      <el-input-number v-model="people" :min="minPeople" :max="maxPeople" style="margin-left:0px">
                        </el-input-number >
                    </div>
                    <div class="twoSideBlock" >
                        <span class="select-font">选择房型</span>
                        <el-select v-model="choosedOption" placeholder="请选择房型">
                            <el-option
                            v-for="item in options"
                            :key="item.id"
                            :label="item.label"
                            :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="centerBlock">
                        <el-button round type="primary" icon="el-icon-check">预定房间</el-button>
                    </div>
                </el-card>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="mainPassage">
                        <span class="hotelTitle">
                            这里是酒店标题qwq {{ hotelTitle }}
                        </span>
                        <el-divider></el-divider>
                        <span class="hotelIntro">
                            这里是简介 {{hotelIntro}}
                        </span>
                    </div>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script>
    export default {
        name: "Detail",
        data(){
            return{
                asideWidth:'500px',
                startDate:'',
                endDate:'',
                minPeople:1,
                maxPeople:3,
                customerCount:1,
                hotelTitle:'姬哥酒店 -某宋总的姬唧小',
                hotelIntro:'qwqwqqwqwqwqwqqwqwqwqwqqwqwq',
                choosedOption:'',
                options:[
                    {
                        label:'双床间',
                        id:1
                    },
                    {
                        label:'双人床',
                        id:2
                    },
                    {
                        label:'家庭房',
                        id:3
                    },

                ],
                roomPictures: [
                    {
                        id:1,
                        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2339646227,2088146489&fm=26&gp=0.jpg',
                    },
                    {
                        id:2,
                        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2339646227,2088146489&fm=26&gp=0.jpg',
                    },                    
                    {
                        id:3,
                        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2339646227,2088146489&fm=26&gp=0.jpg',
                    },
                    {
                        id:4,
                        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2339646227,2088146489&fm=26&gp=0.jpg',
                    },
                    {
                        id:5,
                        pictureUrl: 'https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=2339646227,2088146489&fm=26&gp=0.jpg',
                    },
                ],
            }
        }
    }
</script>

<style scoped>
    .centerBlock{
        margin:20px;
        display: flex;
        flex-direction: row;
        align-items:center;
        flex-wrap: nowrap;
        justify-content: center;
        width: 80%;
    }
    .twoSideBlock{
        margin:20px;
        display: flex;
        flex-direction: row;
        align-items:center;
        flex-wrap: nowrap;
        justify-content: space-between;
        width: 80%;
    }
    .select-date-font{
        font-size:20px;
    }
    .selector{
        margin-left:0px;
    }
    #top-Carousel {
        font-size: 1px;
        opacity: 0.75;
        line-height: 300px;
        margin: 0;
    }
    .date-picker{
        margin: 10px;
    }
    .carouselPicture  {
        color: #475669;
        font-size: 18px;
        line-height: 300px;
        margin: 0;
  }

  #side-date{
    margin:10px;
    width:800px;
  }



</style>