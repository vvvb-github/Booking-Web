<template>
    <div>
<!--        <el-button id="dock-btn" icon="el-icon-caret-right"-->
<!--                   :style="{backgroundColor: this.colorCard.color1, color: this.colorCard.textColor}"-->
<!--                   @click="dockVisible=true"></el-button>-->
        <el-drawer
                direction="ltr"
                :visible.sync="dockVisible"
                :with-header="false"
                title="Title"
                id="dock">
            <el-menu
                    id="dock-nav"
                    :default-active="'1'"
                    class="el-menu-demo"
                    @select="dockSelect"
                    :background-color="this.colorCard.color1"
                    :text-color="this.colorCard.color5"
                    :active-text-color="this.colorCard.textColor">
                <el-menu-item index="1" class="el-menu-item">全部</el-menu-item>
                <el-menu-item index="2" class="el-menu-item">类别</el-menu-item>
            </el-menu>
        </el-drawer>
        <div id="container">
            <div id="top-div" :style="{backgroundColor: this.colorCard.color4}">
                <div id="search-div">
                    <div class="tab-div">
                        <span type="info" class="tag-info">搜索酒店</span>
                        <el-input v-model="searchContext" placeholder="请输入搜索内容..." style="width: 200px"></el-input>
                    </div>
                    <div class="tab-div">
                        <span type="info" class="tag-info">入住时间</span>
                        <el-date-picker
                            v-model="startTime"
                            type="date"
                            placeholder="选择时间"
                            align="right"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                    <div class="tab-div">
                        <span type="info" class="tag-info">退房时间</span>
                        <el-date-picker
                            v-model="endTime"
                            type="date"
                            placeholder="选择时间"
                            align="right"
                            :picker-options="pickerOptions">
                        </el-date-picker>
                    </div>
                    <div class="tab-div">
                        <span type="info" class="tag-info">选择人数</span>
                        <el-input-number :min="1" v-model="people"></el-input-number>
                    </div>
                    <el-button type="primary" icon="el-icon-search" @click="onSearch">搜索</el-button>
                </div>
                <div class="select-div" v-for="(data,i) in selector" :key="data.title">
                    <span class="select-title">{{data.title}}</span>
                    <span v-for="(item,index) in data.items" :key="item"
                          :class="'select-item'+(index==data.chosen? '-chosen':'')"
                            @click="onSelect(i,index)">{{item}}</span>
                </div>
            </div>
            <div id="body-div" :style="{backgroundColor: this.colorCard.color5}">
                <hotel-card v-for="(card,i) in hotels" :key="i"
                            v-bind="{
                        uuid: card.uuid,
                        hotelName: card.hotelName,
                        introduction: card.introduction,
                        location: card.location,
                        roomList: card.roomList,
                        pictureUrl: card.pictureUrl,
                        minPrice: card.minPrice,
                        stars: card.stars,
                        commentNumber: card.commentNumber,
                        startTime: startTime,
                        endTime: endTime,
                        people: people
                            }"
                class="hotel-card"></hotel-card>
                <div v-if="hotels.length===0" style="margin-top: 100px;font-size: 25px">
                    没有符合条件的酒店=……=
                </div>
            </div>
            <div id="bottom-div" :style="{backgroundColor: this.colorCard.color1}">
                <img src="../assets/logo.png" id="bottom-logo">
                <div id="dev-div">
                    <span style="font-size: 25px;font-weight: bold;color: white;">
                        开发团队<span style="margin-left: 5px;font-size: 27px;font-weight: bold;color: yellow">摸鱼大队</span>
                    </span>
                    <div id="dever">
                        <div class="developer" v-for="(dev,i) in developer" :key="i">
                            <el-avatar :size="100" fit="fill" :src="dev.icon" shape="square"></el-avatar>
                            <div class="dev-info">
                                <span style="font-weight: bold;color: yellow;font-size: 23px">@{{dev.nick}}</span>
                                <span style="color: white;font-size: 20px">{{dev.name}}</span>
                                <span style="color: white;font-size: 20px">{{dev.id}}</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import HotelCard from "@/components/HotelCard";
    import axios from 'axios'

    export default {
        name: "Home",
        components: {HotelCard},
        data() {
            return {
                dockVisible: false,
                searchContext: '',
                startTime: '',
                endTime: '',
                people: 1,
                pickerOptions: {
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
                selector: [
                    {
                        title: '类别',
                        items: ['全部','民宿','酒店','轰趴'],
                        chosen: 0
                    },
                    {
                        title: '地区',
                        items: ['全部','江苏','上海','北京'],
                        chosen: 0
                    }
                ],
                hotels: [],
                developer: [
                    {
                        name: '高圣沂',
                        id: '09018133',
                        icon: 'http://www.kxhome.xyz:8094/images/vvvb.png',
                        nick: 'vvvb',
                    },
                    {
                        name: '薛江天',
                        id: '09018138',
                        icon: 'http://www.kxhome.xyz:8094/images/xjt.png',
                        nick: 'CrescentRose',
                    },
                    {
                        name: '陈曦',
                        id: '09018124',
                        icon: 'http://www.kxhome.xyz:8094/images/cdd.png',
                        nick: 'stupid_cdd',
                    },
                    {
                        name: '宋一凡',
                        id: '09018116',
                        icon: 'http://www.kxhome.xyz:8094/images/syf.png',
                        nick: 'syfufo',
                    },
                ],
            }
        },
        methods: {
            dockSelect(index) {
                console.log(index)
            },
            onSearch() {
                let data = {
                    parameter: this.searchContext,
                    startTime: this.startTime,
                    endTime: this.endTime,
                    customerNumber: this.people,
                    type: this.selector[0].items[this.selector[0].chosen],
                    location: this.selector[1].items[this.selector[1].chosen],
                }
                if(data.location === '全部') data.location = '';
                axios.get(this.SERVER_PATH+'/search',{params:data})
                .then(res=>{
                    let data = res.data
                    console.log(data)
                    if(data.status === 200) {
                        this.hotels = data.hotelList
                    }
                    else {
                        this.$message.error(data.msg);
                    }
                })
                .catch(err=>{
                    console.log(err)
                    this.$message.error('服务器错误！')
                })
            },
            onSelect(i, j) {
                this.selector[i].chosen = j
                this.onSearch()
            }
        },
        mounted() {
            this.onSearch();
        }
    }
</script>

<style scoped>
#dock-btn {
    position: fixed;
    left: 0;
    top: 40%;
    width: 20px;
    height: 100px;
    z-index: 1;
    padding: 0;
}
#container {
}
#dock {
    width: 1000px;
}
#dock-nav {
    width: 100%;
    height: 100%;
}
#top-div {
    padding: 10px;
}
#search-div {
    display: flex;
    align-items: flex-end;
    justify-content: center;
    padding: 20px;
}
.tab-div {
    display: flex;
    flex-direction: column;
}
.tag-info {
    font-size: large;
    padding: 5px;
    font-weight: bold;
}
.select-div {
    display: flex;
    align-items: center;
    margin: 10px;
}
.select-title {
    font-size: larger;
    font-weight: bold;
    margin-left: 20%;
}
.select-item {
    font-size: large;
    margin-left: 20px;
    cursor: pointer;
}
.select-item-chosen {
    font-size: large;
    margin-left: 20px;
    cursor: pointer;
    color: blue;
}
#body-div {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    padding-left: 10%;
    padding-right: 10%;
    padding-bottom: 50px;
}
.hotel-card {
    width: 300px;
    margin: 20px;
}
#bottom-div {
    width: 100%;
    display: flex;
    align-items: center;
    padding: 20px 10%;
}
#bottom-logo {
    width: 200px;
    height: 120px;
    object-fit: cover;
}
    #dev-div {
        margin-left: 50px;
    }
    #dever {
        display: flex;
        justify-content: space-around;
        margin-top: 15px;
    }
    .developer {
        display: flex;
        /*width: 250px;*/
        justify-content: space-around;
    }
    .dev-info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        margin-right: 25px;
        margin-left: 5px;
    }

</style>