<template>
    <div id="container" :style="{backgroundColor: this.Colors.bk1}">
        <el-carousel id="top-carousel" 
                     indicator-position="outside" 
                     type="card"
                     :interval="4000"
                     height="400px"
                    >
            <el-carousel-item v-for="(data,i) in hotel.pictureList" 
                            :key="i"
                            style="display:flex;justify-content:center">
                <el-image :src="data"
                     class="carouselPicture"
                     fit="cover"
                     >
                </el-image>
            </el-carousel-item>
        </el-carousel>
        <el-container id="detail-container">
            <el-aside :style="{width: pageSideMargin}"></el-aside>
            <el-aside width="32%" id="side-date" :style="{backgroundColor: this.Colors.bk1}">
                <el-card :body-style="{backgroundColor:this.Colors.bk2, width:'100%',padding: '0px',display:'flex',flexDirection:'column',alignItems:'center'}"
                class="date-picker">
                    <div class="twoSideBlock" >
                        <span  class="select-font" >入住日期</span>
                        <el-date-picker  
                            id="st"
                            ref="st"
                            class="selector"
                            v-model="query.startTime"
                            align=“middle”
                            type="date"
                            placeholder="选择日期"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                    <div class="twoSideBlock" >
                        <span class="select-font">退房日期</span>
                        <el-date-picker
                            id="et"
                            ref="et"
                            class="selector"
                            v-model="query.endTime"
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
                            v-for="(room,i) in hotel.roomList"
                            :key="i"
                            :label="room.roomName"
                            :value="i">
                            </el-option>
                        </el-select>
                    </div>
                    <div class="twoSideBlock">
                        <span class="select-font" >预估价格：</span>
                        <span v-if="validPrice" 
                            style="font-size:45px" :style="{color: this.Colors.element0}">
                            {{totalPrice}}
                        </span>
                         <span style="font-size:35px">¥</span>                       
                    </div>
                    <div class="centerBlock">
                        <el-button round type="primary" icon="el-icon-check">预定房间</el-button>
                    </div>
                </el-card>
            </el-aside>
            <el-container>
                <el-main>
                    <div class="mainPassage">
                        <span class="hotelTitle"
                            :style="{color: this.Colors.plain}">
                            {{ hotel.hotelName }}
                        </span>
                        <el-divider></el-divider>
                        <span class="hotelIntro enableEnter"
                            :style="{color: this.Colors.text}">
                            {{ hotel.hotelIntro}}
                        </span>
                        <div style="display:flex;flex-direction:row-reverse;width=100%;margin:20px">
                            <el-rate 
                                margin=20px
                                v-model="hotel.rate"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                        </div>
                    </div>
                    <el-divider></el-divider>
                    <div class="icon-list">
                        <div class="icon-list-item"  v-for="(data,i) in Bonus"
                            :key="i"
                            >
                            <div >
                                <i v-bind:class="data.icon" :style="{color: tmpColor1}"></i>
                                <span :style="{marginLeft:'25px',color: tmpColor2}">{{data.title}}</span>
                            </div>
                        </div>
                    </div>
                    <el-collapse v-model="activeNames" @change="handleChange" border-radius=30px>
                        <div 
                            v-for="(room,i) in hotel.roomList"
                            :key="i">
                            <el-collapse-item 
                                border-radius=30px
                                :title="room.roomName" 
                                :name="i" 
                                class="room-item">
                                <span>这是第{{i}}个房间</span>
                            </el-collapse-item>
                        </div>
                    </el-collapse>
                </el-main>
            </el-container>
            <el-aside :style="{width: pageSideMargin}"></el-aside>
        </el-container>
    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: "Detail",

        data(){
            return{
                query:{
                    uuid:0,
                    startTime:'',
                    endTime:'',
                    customerNumber:''
                },
                pickerOptions:{
                    disabledDate(time) {
                        return time.getTime() < Date.now()-3600*24*1000;
                    },
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                        picker.$emit('pick', new Date());
                        }
                    }]
                },
                activeNames:['0'],
                pageSideMargin:'10%',
                asideWidth:'35%',
                people:1,
                minPeople:1,
                maxPeople:3,
                customerCount:1,
                hotel:{
                    hotelName:'',
                    telNumber:'',
                    hotelIntro:'',
                    location:'',
                    locationDetail:'',
                    rate:3.7,
                    pictureList:[],
                    roomList:[],
                    features:[]
                },
                tmpColor1:'',
                tmpColor2:'',
                Rooms:[

                ],
                choosedOption:'0',
                Bonus:[
                    {
                        title:"提供早餐",
                        icon:"el-icon-knife-fork"
                    },
                    {
                        title:"接机服务",
                        icon:"el-icon-truck"
                    },
                    {
                        title:"前台叫早",
                        icon:"el-icon-message-solid"
                    },
                    {
                        title:"快速入住",
                        icon:"el-icon-finished"
                    }
                ],
            }
        },            
        methods:{
            handleChange(val){
                console.log(val);
            },
            getDetails(){  
                let data = {
                    HotelID :this.$route.query.uuid
                }
                axios.get(this.SERVER_PATH+'/hotel',{params:data})
                .then(res=>{
                        if(res.data.status === 200) {
                            console.log("ok")
                            this.hotel=res.data.hotel;
                        } else {
                            this.$message.error(res.data.msg)
                        }
                })
                .catch(err=>{
                    console.log(err)
                    this.$message.error('服务器错误！')
                    this.hotel.hotelName='【揽海苑】180°一线海景一居室 解放路亿恒夜市附近 五星级酒店备品';
                    this.hotel.hotelIntro="\u3000\u3000屋子位于三亚市市区（天涯区）解放路与水城路交汇的温泉丽景公寓 50平大一室. \n\u3000\u3000房间正对三亚湾海岸线,超大阳台落地窗 180°一线海景 2*2.4超大床\n\u3000\u3000可做饭可洗衣晾衣开放式厨房\n\u3000\u3000靠近三亚湾 椰梦长廊 红树林\n\u3000\u3000希尔顿床品卫浴 日本马油洗发水沐浴露 空调 空气净化器 抽湿机 冰箱洗衣机 电视 微波炉 风扇 热水器 无线Wifi 一应俱全\n\u3000\u3000公寓楼下有收费停车场，交通便利步行至海边约15分钟 步行至亿恒夜市约3分钟。附近超市菜市场配套齐全，生活方便，公交直达三亚周边各大景点，交通便利。\n\u3000\u3000房间20年初装修后空置一整年，房间很新无甲醛。";
                    this.hotel.location="三亚·天涯区";
                    this.hotel.locationDetail="屋子位于三亚市市区（天涯区）解放路与水城路交汇的温泉丽景公寓,房间正对三亚湾海岸线";
                    this.hotel.rate=4.3;
                    this.hotel.pictureList=[
                        "https://z1.muscache.cn/im/pictures/428b8d9d-9918-4ebb-a10c-38de3346e4b1.jpg?aki_policy=xx_large",
                        "https://z1.muscache.cn/im/pictures/11336d39-8f6c-481e-982c-c70397150976.jpg?aki_policy=x_large",
                        "https://z1.muscache.cn/im/pictures/b786cada-ea8d-496c-8751-338936bbdda5.jpg?aki_policy=x_large"
                    ]
                    this.hotel.roomList=[
                        {
                            roomPic:"https://z1.muscache.cn/im/pictures/4b7e54c6-434d-4674-8045-16a4865144e6.jpg?aki_policy=xx_large",
                            roomName:'工业风大床房',
                            roomIntro:'\u3000\u3000当阳光、海滩、冲浪以绚烂的街头涂鸦形式呈现在裸露的砖墙水泥之上，热情与酷拽彼此碰撞，最年轻的、专属于三亚的活力与态度在此间跃然而出。\n\u3000\u3000这是三亚首家Loft工业怀旧风格的客栈，拥有【初见】、【记忆】、【流年】、【年华】、【如初】、【时光】等6种独立房型，可满足单身放空、闺蜜逛吃、基友浪嗨、情侣蜜月、亲子时光等多种住宿需求。',
                            roomPrice:351,
                            roomCapacity:3,
                            roomUUID:1122
                        },
                        {
                            roomPic:"https://z1.muscache.cn/im/pictures/4b7e54c6-434d-4674-8045-16a4865144e6.jpg?aki_policy=xx_large",
                            roomName:'工业风双人间',
                            roomIntro:'\u3000\u3000当阳光、海滩、冲浪以绚烂的街头涂鸦形式呈现在裸露的砖墙水泥之上，热情与酷拽彼此碰撞，最年轻的、专属于三亚的活力与态度在此间跃然而出。\n\u3000\u3000这是三亚首家Loft工业怀旧风格的客栈，拥有【初见】、【记忆】、【流年】、【年华】、【如初】、【时光】等6种独立房型，可满足单身放空、闺蜜逛吃、基友浪嗨、情侣蜜月、亲子时光等多种住宿需求。',
                            roomPrice:352,
                            roomCapacity:2,
                            roomUUID:1123
                        }
                    ]
                })
            }
        },
        computed:{
            totalPrice:function(){
                console.log(this.query.endTime);
                var tmp1 = new Date(this.query.startTime);
                var tmp2 = new Date(this.query.endTime);
                return this.hotel.roomList[parseInt(this.choosedOption)].roomPrice*(tmp2-tmp1)/(1*24*60*60*1000);
            },
            validPrice:function(){
                return this.totalPrice > 0;
            }
        },
        created:function(){

        },
        mounted:function(){
            this.getDetails()
            this.tmpColor1=this.Colors.element2;
            this.tmpColor2=this.Colors.plain;
            // this.query.startTime=(this.$route.query.startTime);
            // this.query.endTime=(this.$route.query.endTime);
            this.query=this.$route.query;
            //this.$refs.st.$emit('pick',new Date(this.$route.query.startTime));
            //this.$refs.et.$emit('pick', new Date());
        }
    }
</script>

<style scoped>    
    #side-date{
        margin:40px;
      
    }
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
        margin: 20px;
    }
    .carouselPicture  {
        color: #475669;
        font-size: 18px;
        line-height: 300px;
        margin: 0;
    }
    .hotelTitle{
        font-size: 40px;
    }
    .hotelIntro{
        font-size:12px;
    }
    .icon-list{
        width:100%;
        font-size:18px;
        display: flex;
        flex-direction: row;
        align-items:center;
        justify-content: space-between;
        margin-top: 10px;
        margin-bottom: 10px;
    }
    .icon-list-item{
        font-size:18;
    }
    .enableEnter{
        white-space: pre-wrap;
    }
    .room-item{
        margin-top:40px;
        margin-left:5px;

    }
</style>