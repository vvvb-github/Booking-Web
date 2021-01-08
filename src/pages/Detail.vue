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
                        <el-select v-model="choosedOption" placeholder="请选择房型" @change="changeOption">
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
                        <el-button round type="primary" icon="el-icon-check" 
                            v-bind:disabled="!validPrice"
                            @click="dialogFormVisible = true">
                            预定房间
                        </el-button>
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
                        <div style="display:flex;flex-direction:row-reverse;width:100%;margin:20px">
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
                    <el-collapse v-model="activeNames" @change="handleChange" style="border-radius:30px">
                        <div 
                            v-for="(room,i) in hotel.roomList"
                            :key="i">
                            <el-card>
                                <el-collapse-item    
                                    :title="room.roomName" 
                                    :name="i" 
                                    class="room-item">
                                    <template slot="title">
                                        <div class="twoSideBlock">
                                            <div>
                                                <span>{{room.roomName}}</span>
                                                <span :style="{color: pColor}">    {{room.roomPrice}} ¥</span>
                                            </div>
                                            <div>
                                                <span>可入住人数：</span>
                                                <i class="header-icon el-icon-user"></i>
                                                <span> {{room.roomCapacity}}</span>
                                            </div>
                                        </div>
                                    </template>
                                    <div class="room-Picture-Title-Block">
                                        <el-image
                                                :src="room.roomPic"
                                                fit="cover"
                                                class="room-Picture"
                                                style="padding:0px;border-radius:5px"
                                                :preview-src-list="[room.roomPic]"
                                                >
                                        </el-image>
                                        <div class="room-Title-Block">
                                            <p style="white-space: pre-wrap" :style="{color: Colors.text}">{{room.roomIntro}}
                                            </p>
                                        </div>
                                    </div>
                                </el-collapse-item>
                            </el-card>
                        </div>
                    </el-collapse>
                </el-main>
            </el-container>
            <el-aside :style="{width: pageSideMargin}"></el-aside>
        </el-container>
        <!-- Table -->
        <el-dialog title="住客信息" :visible.sync="dialogFormVisible" >
            <el-form label-width=100px 
                labelPosition="left"
                v-for="i in people"
                :key="i">
                <el-card style="margin-bottom:5px">
                <span style="margin-bottom:40px;margin-left:5px">客人{{i}}:</span>
                <div style="margin:5px">
                    <el-form-item label="客人姓名 ">
                        <el-input v-model="dag.a"></el-input>
                    </el-form-item>
                    <el-form-item label="客人身份证">
                        <el-input v-model="dag.b"></el-input>
                    </el-form-item>
                    <el-form-item label="备注信息 ">
                        <el-input v-model="dag.c"></el-input>
                    </el-form-item>
                </div>
                </el-card>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submit">确 定</el-button>
            </div>
        </el-dialog>

    </div>
</template>

<script>
import axios from 'axios';
    export default {
        name: "Detail",

        data(){
            return{
                dag:{
                    a:'',
                    b:'',
                    c:'',
                },
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
                dialogTableVisible:false,
                dialogFormVisible:false,
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
                pColor:'',
                Rooms:[

                ],
                choosedOption:0,
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
            submit(){
                let data ={
                    token:this.$store.state.user.token,
                    hotelId:this.query.uuid,
                    roomId:this.hotel.roomList[parseInt(this.choosedOption)].roomUUID,
                    price:this.totalPrice,
                    startTime:this.query.startTime.Format('yyyy-MM-dd'),
                    endTime:this.query.endTime.Format('yyyy-MM-dd'),
                    customerNumber:this.people
                }
                axios.get(this.SERVER_PATH+'/reserve',{params:data})
                    .then(res=>{
                            if(res.data.status === 200){
                                this.$message.success('预定成功！');
                            } else {
                                this.$message.error('登录失效，请重新登录！');
                                this.$router.push('/login')
                            }
                            this.dialogFormVisible = false
                    }).catch(err=>{
                        console.log(err);
                        this.$message.error('服务器错误');
                    })
            },
            changeOption(){
                this.maxPeople=this.hotel.roomList[this.choosedOption].roomCapacity;
                if(this.maxPeople<this.people){
                    this.people=this.maxPeople;
                }
            },  
            handleChange(val){
                console.log(val);
            },
            getDetails(){  
                let data = {
                    hotelId :this.$route.params.uuid
                }
                console.log(data)
                axios.get(this.SERVER_PATH+'/hotel',{params:data})
                .then(res=>{
                        if(res.data.status === 200) {
                            console.log(res.data);
                            this.hotel=res.data;
                        } else {
                            this.$message.error(res.data.msg)
                        }
                })
                .catch(err=>{
                    console.log(err)
                    this.$message.error('服务器错误！')
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
                return this.totalPrice > 0 ;
            }
        },
        created:function(){
            this.getDetails()
            this.tmpColor1=this.Colors.element2;
            this.tmpColor2=this.Colors.plain;
            this.pColor=this.Colors.element0;
            this.query=this.$route.params;
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
        font-size: 18px;
    }
    .enableEnter{
        white-space: pre-wrap;
    }
    .room-item{
        margin-bottom:5px;
        margin-left:5px;
    }
    .room-Picture{
        width:50%;
        padding:0px;
    }
    .room-Picture-Title-Block{
        margin:10px;
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
    }
    .room-Title-Block{
        margin-left:10px;
        width:50%;
        display:flex;
        flex-direction:column;
        align-items: flex-start;
    }
</style>